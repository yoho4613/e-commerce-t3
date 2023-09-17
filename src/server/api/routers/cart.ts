import { z } from "zod";
import { createTRPCRouter, publicProcedure, userProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const cartRouter = createTRPCRouter({
  updateCart: userProcedure
    .input(z.object({ userId: z.string(), productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, productId } = input;

      const user = await ctx.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot find User",
        });
      }

      if (user.cart.includes(productId)) {
        const userUpdate = await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            cart: user.watchlist.filter((id) => id !== productId),
          },
        });

        return userUpdate;
      } else {
        const userUpdate = await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            cart: {
              push: productId,
            },
          },
        });
        return userUpdate;
      }
    }),
});
