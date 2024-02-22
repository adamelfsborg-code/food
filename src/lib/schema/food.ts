import { z } from "zod";
import { ZodCustomDate } from "./types";

export const FoodCreateDtoSchema = z.object({
  name: z.string().min(1),
  foodtype: z.string().uuid(),
  brand: z.string().uuid(),
  kcal: z.coerce.number(),
  protein: z.coerce.number(),
  carbs: z.coerce.number(),
  fat: z.coerce.number(),
  saturated: z.coerce.number(),
  unsaturated: z.coerce.number(),
  fiber: z.coerce.number(),
  sugars: z.coerce.number()
});

export type TFoodCreateDtoSchema = z.infer<typeof FoodCreateDtoSchema>;

export const FoodSearchParamDtoSchema = z.object({
  id: z.string().uuid()
});

export type TFoodSearchParamDtoSchema = z.infer<typeof FoodSearchParamDtoSchema>;

export const FoodEditDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  foodtype: z.string().uuid(),
  brand: z.string().uuid(),
  kcal: z.coerce.number(),
  protein: z.coerce.number(),
  carbs: z.coerce.number(),
  fat: z.coerce.number(),
  saturated: z.coerce.number(),
  unsaturated: z.coerce.number(),
  fiber: z.coerce.number(),
  sugars: z.coerce.number()
});

export type TFoodEditDtoSchema = z.infer<typeof FoodEditDtoSchema>;

export const FoodDeleteDtoSchema = z.object({
  id: z.string().uuid()
});

export type TFoodDeleteDtoSchema = z.infer<typeof FoodDeleteDtoSchema>;

export const FoodTableSchema = z.object({
  id: z.string().uuid(),
  timestamp: ZodCustomDate,
  user: z.string().uuid(),
  foodtype: z.string().uuid(),
  brand: z.string().uuid(),
  name: z.string().min(1),
  kcal: z.coerce.number(),
  protein: z.coerce.number(),
  carbs: z.coerce.number(),
  fat: z.coerce.number(),
  saturated: z.coerce.number(),
  unsaturated: z.coerce.number(),
  fiber: z.coerce.number(),
  sugars: z.coerce.number()
})

export type TFoodTableSchema = z.infer<typeof FoodTableSchema>;

export const FoodGetResponseSchema = z.array(FoodTableSchema)

export type TFoodGetResponseSchema = z.infer<typeof FoodGetResponseSchema>;

export const FoodFilterDtoSchema = z.object({
  id: z.string().uuid()
})

export type TFoodFilterDtoSchema = z.infer<typeof FoodFilterDtoSchema>;

export const FoodAddResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TFoodAddResponseSchema = z.infer<typeof FoodAddResponseSchema>;

export const FoodEditResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TFoodEditResponseSchema = z.infer<typeof FoodEditResponseSchema>;

export const FoodDeleteResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TFoodDeleteResponseSchema = z.infer<typeof FoodDeleteResponseSchema>;


