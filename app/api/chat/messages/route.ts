import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")

    if (!conversationId) {
      return Response.json({ error: "Missing conversation ID" }, { status: 400 })
    }

    const messagesRaw = await prisma.chatMessage.findMany({
      where: {
        conversation_id: parseInt(conversationId),
      },
      include: {
        sender: true,
      },
      orderBy: { created_at: "asc" },
    })

    const messages = messagesRaw.map((m) => ({
      id: m.id,
      sender_id: m.sender_id,
      message_text: m.content, // Map content to message_text
      created_at: m.created_at,
      first_name: m.sender.first_name,
      last_name: m.sender.last_name,
    }))

    return Response.json({ messages })
  } catch (error) {
    console.error("[API] Messages error:", error)
    return Response.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
