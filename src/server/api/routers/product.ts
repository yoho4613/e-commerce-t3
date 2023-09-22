import { z } from "zod";
import { createTRPCRouter, publicProcedure, userProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Product } from "~/config/type";

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
      console.log(categoryCheck, subcategoryCheck, searchCheck)

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

      console.log(searchInput)
      if (!searchCheck) {
       return products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchInput) ||
            product.type.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput),
        );
      }
      console.log(products.length)

      return products;
    }),
});
