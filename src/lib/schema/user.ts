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

export const RegisterResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TRegisterResponseSchema = z.infer<typeof RegisterResponseSchema>;

export const LoginResponseSchema = z.object({
  token: z.string().describe('User access token'),
})

export type TLoginResponseSchema = z.infer<typeof LoginResponseSchema>;

export const PingUserSchema = z.object({
  token: z.string().describe('User access token'),
}) 

export type TPingUserSchema = z.infer<typeof PingUserSchema>;
