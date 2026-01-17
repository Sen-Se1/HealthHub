export async function GET() {
  return Response.json({
    key: process.env.PUSHER_KEY,
    cluster: process.env.PUSHER_CLUSTER || "mt1",
  })
}
