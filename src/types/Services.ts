import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.number().nullish(),
  title: z.string(),
  subTitle: z.string().nullish(),
  content: z.string(),
  link: z.string().nullish(),
  image: z.any(),
});

export const PortfolioSchema = z.object({
  id: z.number().nullish(),
  title: z.string(),
  link: z.string().nullish(),
  image: z.any(),
});

export const ServicesPortfolioFormSchema = z.object({
  services: z.array(ServiceSchema),
  portfolios: z.array(PortfolioSchema),
});

export type ServiceType = z.infer<typeof ServiceSchema>;
export type PortfolioType = z.infer<typeof PortfolioSchema>;
export type ServicesPortfolioFormType = z.infer<typeof ServicesPortfolioFormSchema>;
