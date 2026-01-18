import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"
import { appointmentSchema } from "@/lib/validations"

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== "patient") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const result = appointmentSchema.safeParse(body)

    if (!result.success) {
      return Response.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { doctorId, appointmentDate, reasonForVisit } = result.data

    const patient = await prisma.patient.findUnique({
      where: { user_id: user.id },
    })

    if (!patient) {
      return Response.json({ error: "Patient profile not found" }, { status: 404 })
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patient_id: patient.id,
        doctor_id: doctorId,
        appointment_date: appointmentDate,
        reason_for_visit: reasonForVisit || null,
        status: "pending",
      },
    })

    return Response.json(
      {
        message: "Appointment created successfully",
        appointment,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Appointment creation error:", error)
    return Response.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
