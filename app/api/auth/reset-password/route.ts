import { prisma } from "@/lib/db"
import { verifyPasswordResetToken, hashPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return Response.json({ error: "Token and password required" }, { status: 400 })
    }

    const resetToken = await verifyPasswordResetToken(token)

    if (!resetToken) {
      return Response.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    // Update password
    await prisma.user.update({
      where: { id: resetToken.user_id },
      data: { password_hash: passwordHash },
    })

    // Consume token
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    })

    return Response.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("[v0] Reset password error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
