import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    let conversations

    if (role === "doctor") {
      // Get conversations for doctor
      const rawConversations = await prisma.chatConversation.findMany({
        where: {
          doctor: {
            user_id: user.id,
          },
        },
        include: {
          patient: {
            include: {
              user: true,
            },
          },
          messages: {
            orderBy: { created_at: "desc" },
            take: 1,
          },
        },
        orderBy: { updated_at: "desc" },
      })

      conversations = rawConversations.map((c) => ({
        id: c.id,
        patient_id: c.patient_id,
        updated_at: c.updated_at,
        patient_name: `${c.patient.user.first_name} ${c.patient.user.last_name}`,
        last_message: c.messages[0]?.content,
      }))
    } else {
      // Get conversations for patient
      const rawConversations = await prisma.chatConversation.findMany({
        where: {
            patient: {
                user_id: user.id
            }
        },
        include: {
          doctor: {
            include: {
              user: true,
            },
          },
          messages: {
            orderBy: { created_at: "desc" },
            take: 1,
          },
        },
        orderBy: { updated_at: "desc" },
      })

      conversations = rawConversations.map((c) => ({
        id: c.id,
        doctor_id: c.doctor_id,
        updated_at: c.updated_at,
        doctor_name: `Dr. ${c.doctor.user.first_name} ${c.doctor.user.last_name}`,
        specialization: c.doctor.specialization,
        last_message: c.messages[0]?.content,
      }))
    }

    return Response.json({ conversations })
  } catch (error) {
    console.error("[API] Conversations error:", error)
    return Response.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}
