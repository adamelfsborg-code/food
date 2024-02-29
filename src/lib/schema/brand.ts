import { z } from "zod";
import { ZodCustomDate } from "./types";

export const BrandCreateDtoSchema = z.object({
  name: z.string().min(1)
});

export type TBrandCreateDtoSchema = z.infer<typeof BrandCreateDtoSchema>;

export const BrandSearchParamDtoSchema = z.object({
  id: z.string().uuid()
});

export type TBrandSearchParamDtoSchema = z.infer<typeof BrandSearchParamDtoSchema>;

export const BrandPaginationDtoSchema = z.object({
  pageIndex: z.coerce.number().default(0),
  pageSize: z.coerce.number().default(20)
});

export type TBrandPaginationDtoSchema = z.infer<typeof BrandPaginationDtoSchema>;

export const BrandEditDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1)
});

export type TBrandEditDtoSchema = z.infer<typeof BrandEditDtoSchema>;

export const BrandDeleteDtoSchema = z.object({
  id: z.string().uuid()
});

export type TBrandDeleteDtoSchema = z.infer<typeof BrandDeleteDtoSchema>;

export const BrandTableSchema = z.object({
  id: z.string().uuid(),
  user: z.string().uuid(),
  timestamp: ZodCustomDate,
  name: z.string()
})

export type TBrandTableSchema = z.infer<typeof BrandTableSchema>;

export const BrandGetResponseSchema = z.array(BrandTableSchema).nullable();

export type TBrandGetResponseSchema = z.infer<typeof BrandGetResponseSchema>;

export const BrandExtendedResponseSchema = z.object({
  rows: z.array(BrandTableSchema).nullable(),
  pagination: z.object({
    pageIndex: z.coerce.number(),
    pageSize: z.coerce.number(),
    pageCount: z.coerce.number()
  })
}) 

export type TBrandExtendedResponseSchema = z.infer<typeof BrandExtendedResponseSchema>;


export const BrandFilterDtoSchema = z.object({
  id: z.string().uuid()
})

export type TBrandFilterDtoSchema = z.infer<typeof BrandFilterDtoSchema>;

export const BrandAddResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TBrandAddResponseSchema = z.infer<typeof BrandAddResponseSchema>;

export const BrandEditResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TBrandEditResponseSchema = z.infer<typeof BrandEditResponseSchema>;

export const BrandDeleteResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TBrandDeleteResponseSchema = z.infer<typeof BrandDeleteResponseSchema>;


