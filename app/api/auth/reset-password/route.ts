import { prisma } from "@/lib/db"
import { verifyPasswordResetToken, hashPassword } from "@/lib/auth"
import { resetPasswordSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = resetPasswordSchema.safeParse(body)

    if (!result.success) {
      return Response.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { token, password } = result.data

    const resetToken = await verifyPasswordResetToken(token)

    if (!resetToken) {
      return Response.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    await prisma.user.update({
      where: { id: resetToken.user_id },
      data: { password_hash: passwordHash },
    })

    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    })

    return Response.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("[AUTH] Reset password error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
