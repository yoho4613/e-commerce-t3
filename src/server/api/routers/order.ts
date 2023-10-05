import { z } from "zod";
import { createTRPCRouter, publicProcedure, userProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { OrderStatus } from "@prisma/client";

export const orderRouter = createTRPCRouter({
  createOrder: publicProcedure
    .input(
      z.object({
        product: z.array(z.any()),
        // product: z.array(
        //   z.object({
        //     id: z.string(),
        //     title: z.string(),
        //     type: z.string(),
        //     description: z.string(),
        //     rrp: z.string(),
        //     price: z.string(),
        //     imgUrl: z.array(z.string()),
        //     url: z.array(z.string()),
        //     attributes: z.record(z.string()),
        //     delivery: z.number().optional(),
        //     stock: z.number(),
        //     categoryId: z.string(),
        //     subcategoryId: z.string().optional(),
        //     order: z.array(z.any()),
        //     saleId: z.string().optional(),
        //     review: z.array(z.any()),
        //     quantity: z.number(),
        //     checked: z.boolean(),
        //   }),
        // ),
        paymentId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, paymentId, product } = input;
      const order = await ctx.prisma.order.create({
        data: {
          userId,
          paymentId,
          products: product,
        },
      });

      if (!order) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "failed to create order",
        });
      }

      return order;
    }),
  findOrder: publicProcedure
    .input(z.object({ paymentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { paymentId } = input;
      const order = await ctx.prisma.order.findFirst({
        where: {
          paymentId,
        },
      });

      return order;
    }),
  updateStatus: publicProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, status } = input;
      const order = await ctx.prisma.order.update({
        where: { id },
        data: {
          status: status as OrderStatus,
        },
      });

      return order;
    }),
});
