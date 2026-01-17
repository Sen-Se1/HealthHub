import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify session and get user with profile
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            patient: true,
            doctor: true,
          },
        },
      },
    })

    if (!session || session.expires_at < new Date()) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const user = session.user

    // Get role-specific info
    if (user.role === "patient" && user.patient) {
      return NextResponse.json({
        user: { ...user, ...user.patient },
      })
    } else if (user.role === "doctor" && user.doctor) {
      return NextResponse.json({
        user: { ...user, ...user.doctor },
      })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("[v0] Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: true,
      },
    })

    if (!session || session.expires_at < new Date()) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const userId = session.user_id
    const userRole = session.user.role
    const body = await request.json()
    const { firstName, lastName, phone, dateOfBirth, gender, address, medicalHistory, profilePictureUrl } = body

    // Update user basic info and profile
    await prisma.user.update({
      where: { id: userId },
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        profile_picture_url: profilePictureUrl,
        patient:
          userRole === "patient"
            ? {
                update: {
                  date_of_birth: dateOfBirth || null,
                  gender: gender || null,
                  address: address || null,
                  medical_history: medicalHistory || null,
                },
              }
            : undefined,
        // Add doctor update if needed in future
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
