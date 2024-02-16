import { z } from "zod";

const envSchema = z.object({
  DB_ADDR: z.string().min(30),
  SECRET_KEY: z.string().min(20)
})

export const parsedEnv = envSchema.parse(process.env);