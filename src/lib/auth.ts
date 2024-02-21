import { cookies } from "next/headers";
import { PingUserAPI } from "@/actions/user";

export async function logout() {
  cookies().set("X-USER-ID", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("X-USER-ID")?.value;
  if (!session) return;

  const user = await PingUserAPI({token: session});
  if (!user.success) return;

  return user.user
}
