import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
  userProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { s3 } from "~/lib/s3";
import { MAX_FILE_SIZE } from "~/constant/config";
import crypto from "crypto";
import { getImgUrl } from "~/lib/helper";
import { Product } from "@prisma/client";

export const productRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany();

    const productsWithUrls = await Promise.all(
      products.map((product) => {
        const withUrls = product.imgUrl.map(async (url) =>
          !url.includes("unsplash")
            ? await s3.getSignedUrlPromise("getObject", {
                Bucket: "e-market-jiho",
                Key: url,
              })
            : url,
        );
        return { ...product, imgUrl: withUrls };
      }),
    );

    return productsWithUrls;
  }),
  getRandomProducts: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        take: input,
        orderBy: {
          id: "desc",
        },
        include: {
          Sale: true,
        },
      });

      return products;
    }),
  findProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      if (!id) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "id is Missing",
        });
      }
      const product = await ctx.prisma.product.findFirst({
        where: {
          id,
        },
        include: {
          category: true,
          subcategory: true,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot find product",
        });
      }

      const withUrls = await getImgUrl(product);

      return withUrls;
    }),
  findRelatedProducts: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      if (!id) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "id is Missing",
        });
      }
      const product = await ctx.prisma.product.findFirst({ where: { id } });
      if (!product) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot find product",
        });
      }

      let category;
      if (product.subcategoryId) {
        category = await ctx.prisma.subcategory.findFirst({
          where: { id: product.subcategoryId },
          select: {
            Product: true,
          },
        });
      } else {
        category = await ctx.prisma.category.findFirst({
          where: { id: product?.categoryId },
          select: {
            Product: true,
          },
        });
      }

      if (!category) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot find Category",
        });
      }

      return category.Product;
    }),
  findProducts: userProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      const products = [];

      if (input.length) {
        for (const id of input) {
          const result = await ctx.prisma.product.findFirst({
            where: {
              id,
            },
            include: {
              Sale: true,
            },
          });
          if (result) products.push(result);
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "no product in list",
        });
      }

      return products;
    }),
  findByFilter: publicProcedure
    .input(
      z.object({
        category: z.string(),
        subcategory: z.string(),
        search: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { category, subcategory, search } = input;
      let products: Product[];

      const categoryCheck = category === "all";
      const subcategoryCheck = subcategory === "all";
      const searchCheck = search === "all";
      const searchInput = search.toLowerCase();
      console.log(categoryCheck, subcategoryCheck, searchCheck);

      if (categoryCheck && subcategoryCheck) {
        products = await ctx.prisma.product.findMany();
      } else if (categoryCheck) {
        products = await ctx.prisma.product.findMany({
          where: {
            subcategoryId: subcategory,
          },
        });
      } else if (category) {
        products = await ctx.prisma.product.findMany({
          where: {
            categoryId: category,
          },
        });
      } else {
        products = await ctx.prisma.product.findMany({
          where: {
            categoryId: category,
            subcategoryId: subcategory,
          },
        });
      }

      if (!searchCheck) {
        return products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchInput) ||
            product.type.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput),
        );
      }

      const productsWithUrls: Product[] = [];

      for (const product of products) {
        const withUrl = await getImgUrl(product);
        productsWithUrls.push(withUrl);
      }

      return productsWithUrls;
    }),
  addProduct: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        type: z.string(),
        rrp: z.string(),
        price: z.string(),
        stock: z.number(),
        categoryId: z.string(),
        subcategoryId: z.string(),
        saleId: z.string(),
        delivery: z.number(),
        imgUrl: z.array(z.string()),
        attributes: z.array(
          z.object({ title: z.string(), options: z.array(z.string()) }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        title,
        description,
        type,
        rrp,
        price,
        stock,
        categoryId,
        subcategoryId,
        saleId,
        delivery,
        imgUrl,
        attributes,
      } = input;

      /* eslint-disable-next-line */
      const attData: {
        [key: string]: string[];
      } = {};

      if (attributes.length) {
        attributes.forEach((att) => {
          const { title, options } = att;
          attData[title] = options;
        });
      }

      const product = await ctx.prisma.product.create({
        data: {
          title,
          description,
          type,
          rrp,
          price,
          stock,
          categoryId,
          subcategoryId: subcategoryId.length ? subcategoryId : null,
          saleId: saleId.length ? saleId : null,
          delivery,
          imgUrl,
          attributes: attributes.length ? attData : undefined,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create Product.",
        });
      }

      return product;
    }),
  createPresignedUrl: adminProcedure
    .input(z.object({ fileType: z.string() }))
    .mutation(({ input }) => {
      const id = crypto.randomUUID();
      const ex = input.fileType.split("/")[1] ?? "";
      const key = `${id}.${ex}`;

      const { url, fields } = s3.createPresignedPost({
        Bucket: "e-market-jiho",
        Fields: { key },
        Expires: 60,
        Conditions: [
          ["content-length-range", 0, MAX_FILE_SIZE],
          ["starts-with", "$Content-Type", "image/"],
        ],
        /* eslint-disable-next-line */
      }) as any as { url: string; fields: string[] };

      console.log({ url, fields, key });
      return { url, fields, key };
    }),
});
