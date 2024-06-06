import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";

const AboutSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  content: z.string(),
});

export const aboutRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.about.findFirst();
  }),

  update: protectedProcedure.input(AboutSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.about.update({
      where: {
        id: 1,
      },
      data: {
        ...input,
      },
    });
  }),
});
