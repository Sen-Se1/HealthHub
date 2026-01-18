import { prisma } from "@/lib/db"
import { hashPassword } from "@/lib/auth"
import { registerSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = registerSchema.safeParse(body)

    if (!result.success) {
      return Response.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { email, password, role, firstName, lastName, phone } = result.data

    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      return Response.json({ error: "Email already registered" }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password_hash: passwordHash,
        role,
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        patient: role === "patient" ? { create: {} } : undefined,
        doctor: role === "doctor" ? { create: { specialization: "" } } : undefined,
      },
      select: {
        id: true,
        email: true,
        role: true,
        first_name: true,
        last_name: true,
      },
    })

    return Response.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json({ error: "Registration failed" }, { status: 500 })
  }
}
