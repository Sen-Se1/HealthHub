import { prisma } from "@/lib/db"
import { verifyPassword, createSession } from "@/lib/auth"
import { loginSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return Response.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { email, password } = result.data

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
