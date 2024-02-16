import { z } from "zod";
import { UserTableSchema } from "./user";
import { ZodCustomDate } from "./types";

export const SessionSchema = z.object({
  user: UserTableSchema,
  expires: ZodCustomDate,
  iat: z.number(),
  exp: z.number(),
});

export type TSessionSchema = z.infer<typeof SessionSchema>;
