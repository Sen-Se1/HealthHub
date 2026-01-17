import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { appointmentId, otherUserId } = await request.json()

    if (!appointmentId) {
      return Response.json({ error: "Missing appointment ID" }, { status: 400 })
    }

    let patientId, doctorId

    if (user.role === "patient") {
      const patient = await prisma.patient.findUnique({
        where: { user_id: user.id },
      })
      if (!patient) {
        return Response.json({ error: "Patient profile not found" }, { status: 404 })
      }
      patientId = patient.id

      const doctor = await prisma.doctor.findUnique({
        where: { user_id: otherUserId },
      })
      if (!doctor) {
        return Response.json({ error: "Doctor profile not found" }, { status: 404 })
      }
      doctorId = doctor.id
    } else if (user.role === "doctor") {
      const doctor = await prisma.doctor.findUnique({
        where: { user_id: user.id },
      })
      if (!doctor) {
        return Response.json({ error: "Doctor profile not found" }, { status: 404 })
      }
      doctorId = doctor.id

      const patient = await prisma.patient.findUnique({
        where: { user_id: otherUserId },
      })
      if (!patient) {
        return Response.json({ error: "Patient profile not found" }, { status: 404 })
      }
      patientId = patient.id
    } else {
        return Response.json({ error: "Invalid role" }, { status: 400 })
    }

    // Check if conversation already exists
    const existingConversation = await prisma.chatConversation.findFirst({
      where: {
        appointment_id: Number(appointmentId), // Ensure number
        patient_id: patientId,
        doctor_id: doctorId,
      },
    })

    if (existingConversation) {
      return Response.json({ conversation: existingConversation })
    }

    // Create new conversation
    const conversation = await prisma.chatConversation.create({
      data: {
        appointment_id: Number(appointmentId),
        patient_id: patientId,
        doctor_id: doctorId,
      },
    })

    return Response.json({ conversation }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create conversation error:", error)
    return Response.json({ error: "Failed to create conversation" }, { status: 500 })
  }
}
