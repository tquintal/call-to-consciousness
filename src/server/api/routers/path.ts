import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const PathItem = z.object({
  id: z.number(),
  date: z.string().nullable(),
  title: z.string().nullable(),
  subTitle: z.string().nullable(),
  content: z.array(z.string()),
  pathId: z.number().nullable(),
});

const PathSchema = z.object({
  id: z.number(),
  pathTitle: z.string(),
  items: z.array(PathItem),
});

export const pathRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.path.findMany({
      include: {
        items: true,
      },
    });
  }),
});
