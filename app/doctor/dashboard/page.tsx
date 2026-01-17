import { Suspense } from "react"
import DoctorDashboardContent from "./dashboard-content"

export default function DoctorDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <DoctorDashboardContent />
    </Suspense>
  )
}
