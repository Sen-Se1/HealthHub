import { prisma } from "@/lib/db"
import { createPasswordResetToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // We return success to prevent email enumeration
      return Response.json({ message: "If an account exists with this email, a reset link has been sent." })
    }

    const token = await createPasswordResetToken(user.id)

    // In a real app, send email here
    console.log("================================----------")
    console.log(`[v0] Password Reset Token for ${email}: ${token}`)
    console.log(`[v0] Reset Link: http://localhost:3000/auth/reset-password?token=${token}`)
    console.log("================================----------")

    return Response.json({ message: "If an account exists with this email, a reset link has been sent." })
  } catch (error) {
    console.error("[v0] Forgot password error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
