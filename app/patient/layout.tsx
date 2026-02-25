import type React from "react"
import { Suspense } from "react"
import { PatientNavbar } from "@/components/patient-navbar"
import { Skeleton } from "@/components/ui/skeleton"

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements - Softened per prompt */}
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

      <PatientNavbar />
      <main className="flex-1 relative z-10 pb-20">
        <Suspense fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-64 rounded-xl" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-32 rounded-2xl" />
                <Skeleton className="h-32 rounded-2xl" />
                <Skeleton className="h-32 rounded-2xl" />
              </div>
              <Skeleton className="h-[400px] w-full rounded-3xl" />
            </div>
          </div>
        }>
          {children}
        </Suspense>
      </main>
    </div>
  )
}
