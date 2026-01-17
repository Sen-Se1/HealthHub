import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== "patient") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { doctorId, appointmentDate, reasonForVisit } = await request.json()

    if (!doctorId || !appointmentDate) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

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
    console.error("[v0] Appointment creation error:", error)
    return Response.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
