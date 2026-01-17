import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    let appointments

    if (user.role === "patient") {
      const patient = await prisma.patient.findUnique({
        where: { user_id: user.id },
      })

      if (!patient) {
        return Response.json({ appointments: [] })
      }

      const rawAppointments = await prisma.appointment.findMany({
        where: { patient_id: patient.id },
        include: {
          doctor: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { appointment_date: "desc" },
      })

      appointments = rawAppointments.map((a) => ({
        ...a,
        first_name: a.doctor.user.first_name,
        last_name: a.doctor.user.last_name,
        specialization: a.doctor.specialization,
      }))
    } else if (user.role === "doctor") {
      const doctor = await prisma.doctor.findUnique({
        where: { user_id: user.id },
      })

      if (!doctor) {
        return Response.json({ appointments: [] })
      }

      const rawAppointments = await prisma.appointment.findMany({
        where: { doctor_id: doctor.id },
        include: {
          patient: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { appointment_date: "desc" },
      })

      appointments = rawAppointments.map((a) => ({
        ...a,
        first_name: a.patient.user.first_name,
        last_name: a.patient.user.last_name,
      }))
    } else {
      appointments = []
    }

    return Response.json({ appointments })
  } catch (error) {
    console.error("[v0] Get appointments error:", error)
    return Response.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}
