import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { ServicesPortfolioFormSchema } from "@/types/Services";

export const servicesRouter = createTRPCRouter({
  getServices: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.services.findMany({ orderBy: { id: "asc" } });
  }),

  getPortfolio: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.portfolio.findMany({ orderBy: { id: "asc" } });
  }),

  update: protectedProcedure.input(ServicesPortfolioFormSchema).mutation(async ({ ctx, input }) => {
    const { portfolios, services } = input;

    try {
      const [existingServices, existingPortfolio] = await Promise.all([ctx.db.services.findMany(), ctx.db.portfolio.findMany()]);

      // ! SIMULATE A SLOW DB CALL
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await ctx.db.$transaction(async (db) => {
        const portfolioPromises = portfolios.map(async (portfolio) => {
          const { id, title, link, image } = portfolio;

          return id
            ? db.portfolio.update({
                where: { id },
                data: { title, image, link },
              })
            : db.portfolio.create({
                data: { title, image, link },
              });
        });

        const servicePromises = services.map(async (service) => {
          const { id, title, content, image, link, subTitle } = service;

          return id
            ? db.services.update({
                where: { id },
                data: { title, content, image, link, subTitle },
              })
            : db.services.create({
                data: { title, content, image, link, subTitle },
              });
        });

        const servicesToDelete = existingServices.filter((service) => !services.some((s) => s.id === service.id));
        const deleteServicePromises = servicesToDelete.map(async (service) => {
          await db.services.delete({ where: { id: service.id } });
        });

        const portfolioToDelete = existingPortfolio.filter((portfolio) => !portfolios.some((p) => p.id === portfolio.id));
        const deletePortfolioPromises = portfolioToDelete.map(async (portfolio) => {
          await db.portfolio.delete({ where: { id: portfolio.id } });
        });

        await Promise.all([...portfolioPromises, ...servicePromises, ...deleteServicePromises, ...deletePortfolioPromises]);

        return { success: true };
      });
    } catch (error) {
      const strError = `Ocorreu um erro durante a atualização dos serviços/portfolio: ${error}`;
      console.error(strError);
      throw new Error(strError);
    }
  }),
});
