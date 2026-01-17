import { prisma } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password, role, firstName, lastName, phone } = await request.json()

    if (!email || !password || !role || !firstName || !lastName) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

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
