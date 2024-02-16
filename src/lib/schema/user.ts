import { z } from "zod";

export const UserCreateSchema = z.object({
  name: z.string(),
  password: z.string().min(10)
});

export type TUserCreateSchema = z.infer<typeof UserCreateSchema>;

export const UserTableSchema = z.object({
  id: z.string().uuid(),
  timestamp: z.date(),
  name: z.string()
})

export type TUserTableSchema = z.infer<typeof UserTableSchema>;