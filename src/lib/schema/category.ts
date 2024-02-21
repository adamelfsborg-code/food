import { z } from "zod";
import { ZodCustomDate } from "./types";

export const CategoryCreateDtoSchema = z.object({
  name: z.string().min(1)
});

export type TCategoryCreateDtoSchema = z.infer<typeof CategoryCreateDtoSchema>;

export const CategorySearchParamDtoSchema = z.object({
  id: z.string().uuid()
});

export type TCategorySearchParamDtoSchema = z.infer<typeof CategorySearchParamDtoSchema>;

export const CategoryEditDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1)
});

export type TCategoryEditDtoSchema = z.infer<typeof CategoryEditDtoSchema>;

export const CategoryDeleteDtoSchema = z.object({
  id: z.string().uuid()
});

export type TCategoryDeleteDtoSchema = z.infer<typeof CategoryDeleteDtoSchema>;

export const CategoryTableSchema = z.object({
  id: z.string().uuid(),
  user: z.string().uuid(),
  timestamp: ZodCustomDate,
  name: z.string()
})

export type TCategoryTableSchema = z.infer<typeof CategoryTableSchema>;

export const CategoryGetResponseSchema = z.array(CategoryTableSchema).nullable();

export type TCategoryGetResponseSchema = z.infer<typeof CategoryGetResponseSchema>;

export const CategoryFilterDtoSchema = z.object({
  id: z.string().uuid()
})

export type TCategoryFilterDtoSchema = z.infer<typeof CategoryFilterDtoSchema>;


export const CategoryAddResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TCategoryAddResponseSchema = z.infer<typeof CategoryAddResponseSchema>;

export const CategoryEditResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TCategoryEditResponseSchema = z.infer<typeof CategoryEditResponseSchema>;

export const CategoryDeleteResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TCategoryDeleteResponseSchema = z.infer<typeof CategoryDeleteResponseSchema>;


