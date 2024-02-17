import { z } from "zod";
import { ZodCustomDate } from "./types";

export const UserDtoSchema = z.object({
  name: z.string(),
  password: z.string().min(10)
});

export type TUserDtoSchema = z.infer<typeof UserDtoSchema>;

export const UserTableSchema = z.object({
  id: z.string().uuid(),
  timestamp: ZodCustomDate,
  name: z.string()
})

export type TUserTableSchema = z.infer<typeof UserTableSchema>;

export const UserTableWithPasswordSchema = z.object({
  id: z.string().uuid(),
  timestamp: ZodCustomDate,
  name: z.string(),
  password: z.string()
})

export type TUserTableWithPasswordSchema = z.infer<typeof UserTableWithPasswordSchema>;

export const UserLoginSchema = z.object({
  name: z.string(),
  password: z.string().min(10)
})

export type TUserLoginSchema = z.infer<typeof UserLoginSchema>;

export const RegisterResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TRegisterResponseSchema = z.infer<typeof RegisterResponseSchema>;

