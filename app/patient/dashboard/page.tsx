import { Suspense } from "react"
import PatientDashboardContent from "./dashboard-content"
import { Skeleton } from "@/components/ui/skeleton"

export default function PatientDashboard() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-[150px] w-full rounded-xl" />
                <Skeleton className="h-[150px] w-full rounded-xl" />
            </div>
            <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      }
    >
      <PatientDashboardContent />
    </Suspense>
  )
}
