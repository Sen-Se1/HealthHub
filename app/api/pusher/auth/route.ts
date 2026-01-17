import { pusherServer } from "@/lib/pusher-server"

export async function POST(request: Request) {
  const body = await request.text()
  const [socket_id, channel_name] = body.split("&").map((pair) => pair.split("=").pop())

  const auth = pusherServer.authenticate(socket_id!, channel_name!)

  return Response.json(auth)
}
