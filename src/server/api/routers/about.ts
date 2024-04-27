import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const AboutSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  content: z.string(),
});

export const aboutRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.about.findFirst();
  }),

  update: publicProcedure.input(AboutSchema).mutation(async ({ ctx, input }) => {
    // ! simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
