"use server"

import { hashPassword, matchPassword, login, logout } from "@/lib/auth";
import sql from "@/lib/db"
import { TUserDtoSchema, TUserTableSchema, UserDtoSchema, UserTableSchema, UserTableWithPasswordSchema } from "@/lib/schema/user";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export const RegisterUserAction = async (props: unknown) => {

  const validatedUserRegisterSchema = UserDtoSchema.safeParse(props);

  if (!validatedUserRegisterSchema.success) {
    return {
      success: false,
      error: validatedUserRegisterSchema.error,
    }
  }

  try {

    const exists = await sql`SELECT 1 FROM app_user au WHERE au."name" = ${validatedUserRegisterSchema.data.name}`
    if (exists.length > 0) {
      throw new ZodError<TUserDtoSchema>([{ path: ['name'], message: 'Name is taken', code: 'custom' }]);
    }

    const response = await sql`
      INSERT INTO app_user 
      (
        name, password
      )
      VALUES
      (
        ${validatedUserRegisterSchema.data.name}, ${await hashPassword(validatedUserRegisterSchema.data.password)}
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

export const LoginUserAction = async (props: unknown) => {

  const validatedUserLoginSchema = UserDtoSchema.safeParse(props);

  if (!validatedUserLoginSchema.success) {
    return {
      success: false,
      error: validatedUserLoginSchema.error,
    }
  }
  try {
    const unkownUser = await sql`SELECT au.* FROM app_user au WHERE au."name" = ${validatedUserLoginSchema.data.name}`
    const validateUserTableWithPasswordSchema = UserTableWithPasswordSchema.safeParse(unkownUser[0])
    if (!validateUserTableWithPasswordSchema.success) {
      return {
        success: false,
        error: validateUserTableWithPasswordSchema.error,
      }
    }
    const passwordMatch = await matchPassword(validateUserTableWithPasswordSchema.data.password, validatedUserLoginSchema.data.password)
    if (!passwordMatch) {
      throw new ZodError<TUserTableSchema>([{ path: ['name'], message: 'Name or password is incorrect.', code: 'custom' }]);
    }
  
    const validUser = await sql`SELECT au.* FROM app_user au WHERE au."name" = ${validateUserTableWithPasswordSchema.data.name}`
    const validateValidUserTableSchema = UserTableSchema.safeParse(validUser[0]);
    if (!validateValidUserTableSchema.success) {
      return {
        success: false,
        error: validateValidUserTableSchema.error,
      }
    }

    await login(validateValidUserTableSchema.data)

    revalidatePath('/', 'layout')
    
  } catch (e) {
    const error = e as ZodError
    return {
      success: false,
      error: error.issues,
    };
  }
}

export const LogoutUserAction = async () => {
  await logout()
  revalidatePath('/', 'layout')

  return {
    success: true,
    message: 'You have been loged out'
  }
}
