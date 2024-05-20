import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const PathItem = z.object({
  date: z.string().nullable(),
  title: z.string().nullable(),
  subTitle: z.string().nullable(),
  content: z.string(),
});

export const PathSchema = z.object({
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

  add: publicProcedure.input(PathSchema).mutation(async ({ ctx, input }) => {
    const { pathTitle, items } = input;
    const newPath = await ctx.db.path.create({
      data: {
        pathTitle,
        items: {
          create: items,
        },
      },
    });
    return newPath;
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: PathSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const { pathTitle, items } = data;
      const updatedPath = await ctx.db.path.update({
        where: { id },
        data: {
          pathTitle,
          items: {
            deleteMany: {},
            create: items,
          },
        },
      });
      return updatedPath;
    }),

  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
    const { id } = input;
    await ctx.db.path.delete({
      where: { id },
    });
    return { success: true };
  }),

  deletePathItem: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
    const { id } = input;
    await ctx.db.pathItem.delete({
      where: { id },
    });
    return { success: true };
  }),
});
