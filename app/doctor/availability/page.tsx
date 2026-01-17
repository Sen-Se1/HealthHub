import { Suspense } from "react"
import AvailabilityContent from "./availability-content"

export default function AvailabilityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <AvailabilityContent />
    </Suspense>
  )
}
