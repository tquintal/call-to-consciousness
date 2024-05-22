import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { PathFormSchema } from "@/types/Path";

export const pathRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.path.findMany({
      include: {
        items: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return data;
  }),

  update: publicProcedure.input(PathFormSchema).mutation(async ({ ctx, input }) => {
    const { paths } = input;

    try {
      const existingPaths = await ctx.db.path.findMany();

      await ctx.db.$transaction(async (db) => {
        await Promise.all(
          paths.map(async (path) => {
            const { id, pathTitle, items } = path;
            const itemsWithoutIds = items.map(({ id, pathId, ...rest }) => rest);

            if (id) {
              return db.path.update({
                where: { id },
                data: {
                  pathTitle,
                  items: {
                    deleteMany: {},
                    create: itemsWithoutIds,
                  },
                },
              });
            } else {
              return db.path.create({
                data: {
                  pathTitle,
                  items: { create: itemsWithoutIds },
                },
              });
            }
          })
        );

        const pathsToDelete = existingPaths.filter((path) => !paths.some((p) => p.id === path.id));

        await Promise.all(
          pathsToDelete.map(async (path) => {
            await db.pathItem.deleteMany({ where: { pathId: path.id } });
            await db.path.delete({ where: { id: path.id } });
          })
        );

        return { success: true };
      });
    } catch (error) {
      const strError = `Ocorreu um erro durante a atualização dos caminhos: ${error}`;
      console.error(strError);
      throw new Error(strError);
    }
  }),
});
