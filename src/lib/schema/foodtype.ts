import { z } from "zod";
import { ZodCustomDate } from "./types";
import { UserTableSchema } from "./user";
import { CategoryTableSchema } from "./category";

export const FoodTypeCreateDtoSchema = z.object({
  name: z.string().min(1),
  category: z.string().uuid()
});

export type TFoodTypeCreateDtoSchema = z.infer<typeof FoodTypeCreateDtoSchema>;

export const FoodTypeSearchParamDtoSchema = z.object({
  id: z.string().uuid()
});

export type TFoodTypeSearchParamDtoSchema = z.infer<typeof FoodTypeSearchParamDtoSchema>;

export const FoodTypePaginationDtoSchema = z.object({
  pageIndex: z.coerce.number().default(0),
  pageSize: z.coerce.number().default(20)
});

export type TFoodTypePaginationDtoSchema = z.infer<typeof FoodTypePaginationDtoSchema>;


export const FoodTypeEditDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  category: z.string().uuid()
});

export type TFoodTypeEditDtoSchema = z.infer<typeof FoodTypeEditDtoSchema>;

export const FoodTypeDeleteDtoSchema = z.object({
  id: z.string().uuid()
});

export type TFoodTypeDeleteDtoSchema = z.infer<typeof FoodTypeDeleteDtoSchema>;

export const FoodTypeTableSchema = z.object({
  id: z.string().uuid(),
  user: z.string().uuid(),
  timestamp: ZodCustomDate,
  category: z.string().uuid(),
  name: z.string()
})

export type TFoodTypeTableSchema = z.infer<typeof FoodTypeTableSchema>;

export const FoodTypeGetResponseSchema = z.array(FoodTypeTableSchema).nullable();

export type TFoodTypeGetResponseSchema = z.infer<typeof FoodTypeGetResponseSchema>;

export const FoodTypeTableExtendedSchema = z.object({
  id: z.string().uuid(),
  user: UserTableSchema,
  timestamp: ZodCustomDate,
  category: CategoryTableSchema,
  name: z.string()
})

export type TFoodTypeTableExtendedSchema = z.infer<typeof FoodTypeTableExtendedSchema>;

export const FoodTypeExtendedResponseSchema = z.object({
  rows: z.array(FoodTypeTableExtendedSchema).nullable(),
  pagination: z.object({
    pageIndex: z.coerce.number(),
    pageSize: z.coerce.number(),
    pageCount: z.coerce.number()
  })
}) 

export type TFoodTypeExtendedResponseSchema = z.infer<typeof FoodTypeExtendedResponseSchema>;


export const FoodTypeFilterDtoSchema = z.object({
  id: z.string().uuid()
})

export type TFoodTypeFilterDtoSchema = z.infer<typeof FoodTypeFilterDtoSchema>;

export const FoodTypeAddResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TFoodTypeAddResponseSchema = z.infer<typeof FoodTypeAddResponseSchema>;

export const FoodTypeEditResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TFoodTypeEditResponseSchema = z.infer<typeof FoodTypeEditResponseSchema>;

export const FoodTypeDeleteResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TFoodTypeDeleteResponseSchema = z.infer<typeof FoodTypeDeleteResponseSchema>;


