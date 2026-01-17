import { getSessionUser } from "./auth"

export async function verifyAuth(request: Request) {
  const token = request.headers.get("authorization")?.split(" ")[1]

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
