import { prisma } from "@/lib/db"
import { verifyAuth } from "@/lib/middleware"
import { pusherServer } from "@/lib/pusher-server"

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { conversationId, messageText } = await request.json()

    if (!conversationId || !messageText) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const message = await prisma.chatMessage.create({
      data: {
        conversation_id: Number(conversationId),
        sender_id: user.id,
        content: messageText,
      },
    })

    // Broadcast via Pusher
    await pusherServer.trigger(`chat-${conversationId}`, "message", {
      id: message.id,
      senderId: message.sender_id,
      senderName: `${user.first_name} ${user.last_name}`,
      messageText: message.content,
      createdAt: message.created_at,
    })

    return Response.json(
      {
        message: "Message sent",
        data: {
          id: message.id,
          sender_id: message.sender_id,
          message_text: message.content,
          created_at: message.created_at,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[API] Send message error:", error)
    return Response.json({ error: "Failed to send message" }, { status: 500 })
  }
}
