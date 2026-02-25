import { Suspense } from "react"
import PatientDashboardContent, { DashboardSkeleton } from "./dashboard-content"

export default function PatientDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <PatientDashboardContent />
    </Suspense>
  )
}
