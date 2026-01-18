import { cookies } from "next/headers"
import { getSessionUser } from "./auth"

export async function verifyAuth(request: Request) {
  // First try to get token from Authorization header
  let token = request.headers.get("authorization")?.split(" ")[1]

  // If no header, try to get from cookie
  if (!token) {
    const cookieStore = await cookies()
    token = cookieStore.get("auth_token")?.value
  }

  if (!token) {
    return null
  }

  return await getSessionUser(token)
}

export async function verifyToken(token: string) {
  if (!token) {
    return null
  }
  return await getSessionUser(token)
}
