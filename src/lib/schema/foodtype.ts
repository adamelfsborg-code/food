import { z } from "zod";
import { ZodCustomDate } from "./types";

export const FoodTypeCreateDtoSchema = z.object({
  name: z.string().min(1),
  category: z.string().uuid()
});

export type TFoodTypeCreateDtoSchema = z.infer<typeof FoodTypeCreateDtoSchema>;

export const FoodTypeSearchParamDtoSchema = z.object({
  id: z.string().uuid()
});

export type TFoodTypeSearchParamDtoSchema = z.infer<typeof FoodTypeSearchParamDtoSchema>;

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


