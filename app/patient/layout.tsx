import type React from "react"
import { Suspense } from "react"
import { PatientNavbar } from "@/components/patient-navbar"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <PatientNavbar />
      </Suspense>
      <main>{children}</main>
    </div>
  )
}
