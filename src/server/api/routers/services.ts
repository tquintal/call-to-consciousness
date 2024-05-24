import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const servicesRouter = createTRPCRouter({
  getServices: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.services.findMany();
  }),
  getPortfolio: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.portfolio.findMany();
  }),
});
