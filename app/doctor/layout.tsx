import type React from "react"
import { Suspense } from "react"
import { DoctorNavbar } from "@/components/doctor-navbar"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <DoctorNavbar />
      </Suspense>
      <main>{children}</main>
    </div>
  )
}
