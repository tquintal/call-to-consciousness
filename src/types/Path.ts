import { z } from "zod";

export const PathItemSchema = z.object({
  id: z.number().nullish(),
  date: z.string().nullish(),
  title: z.string().nullish(),
  titleLink: z.string().nullish(),
  subTitle: z.string().nullish(),
  subTitleLink: z.string().nullish(),
  content: z.string(),
  pathId: z.number().nullish(),
});

export const PathSchema = z.object({
  id: z.number().nullish(),
  pathTitle: z.string(),
  items: z.array(PathItemSchema),
});

export const PathFormSchema = z.object({
  paths: z.array(PathSchema),
});

export type PathItemSchemaType = z.infer<typeof PathItemSchema>;
export type PathSchemaType = z.infer<typeof PathSchema>;
export type PathFormSchemaType = z.infer<typeof PathFormSchema>;
