import { Suspense } from "react"
import DoctorChatContent from "./chat-content"

export default function DoctorChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <DoctorChatContent />
    </Suspense>
  )
}
