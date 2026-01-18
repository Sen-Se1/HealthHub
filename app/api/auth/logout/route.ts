import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    let token = request.headers.get("authorization")?.split(" ")[1]

    if (!token) {
      // Check cookies for token
      const cookieHeader = request.headers.get("cookie")
      token = cookieHeader?.split(";").find(c => c.trim().startsWith("auth_token="))?.split("=")[1]
    }

    if (token) {
      try {
        await prisma.session.delete({
          where: { token },
        })
      } catch (error) {
      }
    }

    const response = Response.json({ message: "Logged out successfully" })
    response.headers.set("Set-Cookie", "auth_token=; Path=/; HttpOnly; Max-Age=0")
    return response
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return Response.json({ error: "Logout failed" }, { status: 500 })
  }
}
