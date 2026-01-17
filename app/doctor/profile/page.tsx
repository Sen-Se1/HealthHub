import { Suspense } from "react"
import DoctorProfileContent from "./profile-content"

export default function DoctorProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <DoctorProfileContent />
    </Suspense>
  )
}
