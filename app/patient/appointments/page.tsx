"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const AppointmentsContent = dynamic(
  () => import("./appointments-content"),
  {
    ssr: false,
    loading: () => <AppointmentsSkeletonLoading />
  }
)

function AppointmentsSkeletonLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div className="h-12 w-64 rounded-xl bg-muted animate-pulse" />
        <div className="h-10 w-32 rounded-xl bg-muted animate-pulse" />
      </div>
      <div className="grid gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-48 w-full rounded-3xl bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen pb-32 md:pb-8">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">My Appointments</h1>
            <p className="text-muted-foreground text-lg font-medium max-w-xl">
              Manage your upcoming visits, consult your medical history, and stay connected with your healthcare team.
            </p>
          </div>
          <Link href="/patient/find-doctors" className="hidden md:block">
            <Button size="lg" className="rounded-2xl font-black shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 px-8 py-7 group">
              <Plus className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              BOOK NEW VISIT
            </Button>
          </Link>
        </div>
      </header>

      <Suspense fallback={<AppointmentsSkeletonLoading />}>
        <AppointmentsContent />
      </Suspense>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-6 right-6 left-6 z-50 md:hidden">
        <Link href="/patient/find-doctors">
          <Button className="w-full h-16 rounded-2xl font-black shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 text-lg">
            <Plus className="h-6 w-6 mr-3" /> BOOK APPOINTMENT
          </Button>
        </Link>
      </div>
    </div>
  )
}
