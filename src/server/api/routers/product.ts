import { z } from "zod";
import { createTRPCRouter, publicProcedure, userProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


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
        for (let i = 0; i < input.length; i++) {
          const result = await ctx.prisma.product.findFirst({
            where: {
              id: input[i],
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
});
