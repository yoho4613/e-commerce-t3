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
});
