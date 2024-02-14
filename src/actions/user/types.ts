import { UUID } from "crypto";
import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  password: z.string().min(10)
});

export type UserZodType = z.infer<typeof UserSchema>;

export type UserDto = {
  name: string
  password: string
}

export type UserTable = {
  id: UUID,
  timestamp: Date
  name: string
}