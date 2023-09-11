import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bannerRouter = createTRPCRouter({
  getAllBanners: publicProcedure.query(
    async ({ ctx }) => await ctx.prisma.banner.findMany(),
  ),
  getTopBanners: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.banner.findMany({ where: { position: "homeTop" } }),
  ),
  getHeroBanner: publicProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.banner.findFirst({
        where: {
          position: "heroAlone",
        },
      }),
  ),
  getNewBanners: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const banners = await ctx.prisma.banner.findMany({
        take: input,
        orderBy: {
          id: "desc",
        },
      });

      return banners;
    }),
});
