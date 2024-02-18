import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const user = cookies().get('X-USER-ID')
  console.log(user);
}