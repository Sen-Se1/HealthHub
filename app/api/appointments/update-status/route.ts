import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"

export async function PUT(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== "doctor") {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { appointmentId, status } = await request.json()

    if (!appointmentId || !status) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["pending", "approved", "rejected", "completed", "cancelled"].includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 })
    }

    try {
      const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status },
      })

      return Response.json({
        message: "Appointment updated successfully",
        appointment,
      })
    } catch (error) {
      return Response.json({ error: "Appointment not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("[v0] Update appointment error:", error)
    return Response.json({ error: "Failed to update appointment" }, { status: 500 })
  }
}
