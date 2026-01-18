import { type NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"
import { sendEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { name, email, role, subject, message } = result.data

    // Email to Support
    await sendEmail(
      process.env.SMTP_SUPPORT_MAIL!,
      `New Support Inquiry: ${subject}`,
      `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #1E88E5;">HealthHub Support Inquiry</h2>
        <p><strong>From:</strong> ${name} (${role})</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
      </div>
      `
    )

    return NextResponse.json({ success: true, message: "Message sent successfully" })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
