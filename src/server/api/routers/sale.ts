import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const saleRouter = createTRPCRouter({
  getAllSales: publicProcedure.query(async ({ ctx }) => {
    const sales = await ctx.prisma.sale.findMany({
      include: {
        products: true
      }
    });
    return sales;
  })
  
});
