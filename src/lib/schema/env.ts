import { z } from "zod";

const EnvDtoSchema = z.object({
  DB_ADDR: z.string().min(30),
  API_USER_ADDR: z.string().url(),
  API_CULINARY_ADDR: z.string().url(),
  SECRET_KEY: z.string().min(20),
  SESSION_EXPIRES: z.coerce.number()
})

export const parsedEnv = EnvDtoSchema.parse(process.env);