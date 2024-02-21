import { z } from "zod";
import { ZodCustomDate } from "./types";

export const UserDtoSchema = z.object({
  name: z.string().min(3).max(20),
  password: z.string().min(3).max(50)
});

export type TUserDtoSchema = z.infer<typeof UserDtoSchema>;

export const UserTableSchema = z.object({
  id: z.string().uuid(),
  timestamp: ZodCustomDate,
  name: z.string()
})

export type TUserTableSchema = z.infer<typeof UserTableSchema>;

export const UserRegisterResponseSchema = z.object({
  message: z.string().describe('Response from API'),
})

export type TUserRegisterResponseSchema = z.infer<typeof UserRegisterResponseSchema>;

export const UserLoginResponseSchema = z.object({
  token: z.string().describe('User access token'),
})

export type TUserLoginResponseSchema = z.infer<typeof UserLoginResponseSchema>;

export const UserPingResponseSchema = z.object({
  token: z.string().describe('User access token'),
}) 

export type TUserPingResponseSchema = z.infer<typeof UserPingResponseSchema>;
