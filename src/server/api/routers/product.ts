import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
          id: "desc"
        },
        include: {
          Sale: true
        }
      });

      return products
    }),
});
