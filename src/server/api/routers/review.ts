import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const reviewRouter = createTRPCRouter({
  findProductReview: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;


      const reviews = await ctx.prisma.review.findMany({
        where: {
          productId: id,
        },
        include: {
          author: true,
        },
      });

      return reviews ? reviews : [];
    }),
});
