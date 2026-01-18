import { prisma } from "@/lib/db"
import { createPasswordResetToken } from "@/lib/auth"
import { sendEmail } from "@/lib/email"

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
      return Response.json({ message: "If an account exists with this email, a reset link has been sent." })
    }

    const token = await createPasswordResetToken(user.id)

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`
    
    await sendEmail(
        email, 
        "Reset Your Password - HealthHub",
        `
        <h1>Password Reset Request</h1>
        <p>Hello ${user.first_name},</p>
        <p>You requested a password reset for your HealthHub account. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't ask for this, you can safely ignore this email.</p>
        `
    )

    return Response.json({ message: "If an account exists with this email, a reset link has been sent." })
  } catch (error) {
    console.error("[AUTH] Forgot password error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
