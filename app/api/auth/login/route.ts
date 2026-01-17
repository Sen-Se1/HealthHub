import { prisma } from "@/lib/db"
import { verifyPassword, createSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: "Email and password required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const passwordMatch = await verifyPassword(password, user.password_hash)

    if (!passwordMatch) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await createSession(user.id)

    const response = Response.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      token,
    })

    response.headers.set("Set-Cookie", `auth_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=2592000`)
    return response
  } catch (error) {
    console.error("Login error:", error)
    return Response.json({ error: "Login failed" }, { status: 500 })
  }
}
