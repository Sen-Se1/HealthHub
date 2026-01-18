import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== "doctor") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const doctor = await prisma.doctor.findUnique({
      where: { user_id: user.id },
    })

    if (!doctor) {
      return Response.json({ error: "Doctor not found" }, { status: 404 })
    }

    const availability = await prisma.doctorAvailability.findMany({
      where: { doctor_id: doctor.id },
      orderBy: { day_of_week: "asc" }, // Note: sorting by string day might not be correct order (Mon, Tue...) but matches SQL logic
    })

    return Response.json({ availability })
  } catch (error) {
    console.error("Get availability error:", error)
    return Response.json({ error: "Failed to fetch availability" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== "doctor") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { dayOfWeek, startTime, endTime, breakStart, breakEnd } = await request.json()

    if (!dayOfWeek || !startTime || !endTime) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const doctor = await prisma.doctor.findUnique({
      where: { user_id: user.id },
    })

    if (!doctor) {
      return Response.json({ error: "Doctor not found" }, { status: 404 })
    }

    const availability = await prisma.doctorAvailability.create({
      data: {
        doctor_id: doctor.id,
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
        break_start: breakStart || null,
        break_end: breakEnd || null,
      },
    })

    return Response.json(
      {
        message: "Availability added",
        availability,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Add availability error:", error)
    return Response.json({ error: "Failed to add availability" }, { status: 500 })
  }
}
