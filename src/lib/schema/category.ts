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

export const CategoryFilterDtoSchema = z.object({
  id: z.string().uuid()
})

export type TCategoryFilterDtoSchema = z.infer<typeof CategoryFilterDtoSchema>;

export const GetCategoryResponseSchema = z.array(CategoryTableSchema)

export type TGetCategoryResponseSchema = z.infer<typeof GetCategoryResponseSchema>;

export const AddCategoryResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TAddCategoryResponseSchema = z.infer<typeof AddCategoryResponseSchema>;

export const EditCategoryResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TEditCategoryResponseSchema = z.infer<typeof EditCategoryResponseSchema>;

export const DeleteCategoryResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TDeleteCategoryResponseSchema = z.infer<typeof DeleteCategoryResponseSchema>;


