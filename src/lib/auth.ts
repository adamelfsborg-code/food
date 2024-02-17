import { parsedEnv } from "@/lib/schema/env";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { TUserTableSchema } from "@/lib/schema/user";
import { SessionSchema } from "@/lib/schema/session";


const key = new TextEncoder().encode(parsedEnv.SECRET_KEY);

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function matchPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function login(user: TUserTableSchema) {
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return;

  const decrypted = await decrypt(session);
  const validSession = SessionSchema.safeParse(decrypted);
  if (!validSession.success) return

  return validSession.data
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const decrypted = await decrypt(session);
  const validSession = SessionSchema.safeParse(decrypted);
  if (!validSession.success) return

  validSession.data.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(validSession.data),
    httpOnly: true,
    expires: validSession.data.expires,
  });
  return res;
}