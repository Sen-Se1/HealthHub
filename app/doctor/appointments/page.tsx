import { Suspense } from "react"
import DoctorAppointmentsContent from "./appointments-content"

export default function DoctorAppointmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <DoctorAppointmentsContent />
    </Suspense>
  )
}
