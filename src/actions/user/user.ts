"use server"

import { logout } from "@/lib/auth";
import { parsedEnv } from "@/lib/schema/env";
import { LoginResponseSchema, PingUserSchema, RegisterResponseSchema, UserDtoSchema, UserTableSchema } from "@/lib/schema/user";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const RegisterAPI = async (props: unknown) => {
  const registerSchema = UserDtoSchema.safeParse(props);

  if (!registerSchema.success) return {
    success: false,
    error: registerSchema.error.message
  }

  const response = await fetch(`${parsedEnv.API_USER_ADDR}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: registerSchema.data.name, password: registerSchema.data.password }),
  });

  if (!response.ok) {
    const message = await response.text()
    return {
      success: false,
      error: message
    }
  }

  const result = await response.json();
  const responseSchema = RegisterResponseSchema.safeParse(result)

  if (!responseSchema.success) return {
    success: false,
    error: responseSchema.error.message
  }

  return {
    success: true,
    message: responseSchema.data.message
  }
}

export const LoginAPI = async (props: unknown) => {
  const loginSchema = UserDtoSchema.safeParse(props);

  if (!loginSchema.success) return {
    success: false,
    error: loginSchema.error.message
  }

  const response = await fetch(`${parsedEnv.API_USER_ADDR}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: loginSchema.data.name, password: loginSchema.data.password }),
  });

  if (!response.ok) {
    const message = await response.text()
    return {
      success: false,
      error: message
    }
  }

  const result = await response.json();
  const responseSchema = LoginResponseSchema.safeParse(result)

  if (!responseSchema.success) return {
    success: false,
    error: responseSchema.error.message
  }

  cookies().set("X-USER-ID", responseSchema.data.token, { httpOnly: true });

  revalidatePath('/', 'layout');

  return {
    success: true,
    message: 'You are logged in'
  }
}

export const PingUserAPI = async (props: unknown) => {
  const pingUserSchema = PingUserSchema.safeParse(props);

  if (!pingUserSchema.success) return {
    success: false,
    error: pingUserSchema.error.message
  }

  const response = await fetch(`${parsedEnv.API_USER_ADDR}/users/ping`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${pingUserSchema.data.token}`
    },
  });

  if (!response.ok) {
    const message = await response.text()
    return {
      success: false,
      error: message
    }
  }
  const result = await response.json();
  const responseSchema = UserTableSchema.safeParse(result)

  if (!responseSchema.success) return {
    success: false,
    error: responseSchema.error.message
  }

  return {
    success: true,
    user: responseSchema.data
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
