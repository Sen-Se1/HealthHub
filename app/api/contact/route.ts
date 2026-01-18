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

    const { firstName, lastName, email, subject, message } = result.data

    // Email to Support
    await sendEmail(
      process.env.SMTP_SUPPORT_MAIL!,
      `Support Inquiry: ${subject}`,
      `
      <h1>New Support Inquiry</h1>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      `
    )

    return NextResponse.json({ success: true, message: "Message sent successfully" })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
