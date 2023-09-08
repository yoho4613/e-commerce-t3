import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const imageRouter = createTRPCRouter({
  getRandomImage: publicProcedure
    .input(z.object({ page: z.number(), query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { page, query } = input;
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${process.env.IMAGE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const image = data.results[0].urls.regular

      return image
    }),
});
