"use server"

import sql from "@/lib/db"
import { UserSchema } from "./types";
import { revalidatePath } from "next/cache";

type AddUserActionProps = unknown

export const AddUserAction = async (props: AddUserActionProps) => {

  const validatedUserSchema = UserSchema.safeParse(props);

  if (!validatedUserSchema.success) {
    return {
      success: false,
      error: validatedUserSchema.error
    }
  }

  await sql`
    INSERT INTO app_user 
    (
      name, password
    )
    VALUES
    (
      ${validatedUserSchema.data.name}, ${validatedUserSchema.data.password} 
    )
    ON CONFLICT DO NOTHING
  `

  revalidatePath('/', 'layout')
};