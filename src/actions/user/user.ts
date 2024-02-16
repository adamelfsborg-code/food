"use server"

import sql from "@/lib/db"
import { TUserCreateSchema, TUserTableSchema, UserCreateSchema, UserTableSchema } from "@/lib/schema/user";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

type AddUserActionProps = unknown

export const AddUserAction = async (props: AddUserActionProps) => {

  const validatedUserCreateSchema = UserCreateSchema.safeParse(props);

  if (!validatedUserCreateSchema.success) {
    return {
      success: false,
      error: validatedUserCreateSchema.error,
    }
  }

  try {

    const exists = await sql`SELECT 1 FROM app_user au WHERE au."name" = ${validatedUserCreateSchema.data.name}`
    if (exists.length > 0) {
      throw new ZodError<TUserCreateSchema>([{ path: ['name'], message: 'Name is taken', code: 'custom' }]);
    }

    const response = await sql`
      INSERT INTO app_user 
      (
        name, password
      )
      VALUES
      (
        ${validatedUserCreateSchema.data.name}, ${validatedUserCreateSchema.data.password} 
      )
      RETURNING id, timestamp, name
    `
    if (response.length > 0) {
      const validatedUserTableSchema = UserTableSchema.safeParse(response[0])
      if (!validatedUserTableSchema.success) {
        return {
          success: false,
          error: validatedUserTableSchema.error
        }
      }
    } else {
      throw new ZodError<TUserTableSchema>([{ path: ['name'], message: 'User not created, please try again.', code: 'custom' }]);
    }
    
    revalidatePath('/', 'layout')
    
    return {
      success: true,
      message: 'Registerd!'
    }

  } catch (e) {
    const error = e as ZodError
    return {
      success: false,
      error: error.issues,
    };
  }
};