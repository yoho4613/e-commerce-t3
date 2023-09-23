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

export const productRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany();
    return products;
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

      return product;
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
      let products;

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

      return products;
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
      } = input;

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
    .mutation(async ({ input }) => {
      const id = crypto.randomUUID();
      const ex = input.fileType.split("/")[1] || "";
      const key = `${id}.${ex}`;

      const { url, fields } = (await new Promise((resolve, reject) => {
        s3.createPresignedPost(
          {
            Bucket: "e-market-jiho",
            Fields: { key },
            Expires: 60,
            Conditions: [
              ["content-length-range", 0, MAX_FILE_SIZE],
              ["starts-with", "$Content-Type", "image/"],
            ],
          },
          (err, data) => {
            console.log(data);
            if (err) return reject(err);
            resolve(data);
          },
        );
      })) as any as { url: string; fields: string[] };

      console.log({ url, fields, key });
      return { url, fields, key };
    }),

  // getMenuItems: publicProcedure.query(async ({ ctx }) => {
  //   const menuItems = await ctx.prisma.menuItem.findMany();
  //   // Each menu item only contains its AWS key. Extend all items with their actual img url
  //   const withUrls = await Promise.all(
  //     menuItems.map(async (menuItem) => ({
  //       ...menuItem,
  //       url: await s3.getSignedUrlPromise("getObject", {
  //         Bucket: "restaurant-booking-app",
  //         Key: menuItem.imageKey,
  //       }),
  //     }))
  //   );
  //   return withUrls;
  // }),
});
