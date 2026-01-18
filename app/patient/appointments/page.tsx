"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Clock, Stethoscope, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface Appointment {
  id: number
  appointment_date: string
  status: string
  reason_for_visit: string
  first_name: string
  last_name: string
  specialization: string
}

function AppointmentsContent() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      // Token is now handled via HttpOnly cookie
      try {
        const res = await fetch("/api/appointments/list")

        if (res.ok) {
          const data = await res.json()
          setAppointments(data.appointments || [])
        }
      } catch (err) {
        console.error("Error fetching appointments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-primary/10 text-primary border-primary/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (loading) {
     return (
        <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
        </div>
     )
  }

  return (
    <motion.div 
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {appointments.length === 0 ? (
        <motion.div variants={fadeIn}>
            <Card className="bg-card glass-card border-border/50">
            <CardContent className="py-16 text-center">
                <div className="h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Stethoscope className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No appointments yet</h3>
                <p className="text-muted-foreground mb-8 text-lg">Book your first appointment with a top specialist</p>
                <Link href="/patient/find-doctors">
                <Button size="lg" className="shadow-lg shadow-primary/20">Find a Doctor</Button>
                </Link>
            </CardContent>
            </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <motion.div
                key={apt.id}
                variants={fadeIn}
            >
                <Card className="bg-card glass-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md group">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg shadow-primary/10">
                            <span className="text-primary-foreground font-bold text-xl">
                                {apt.first_name[0]}
                                {apt.last_name[0]}
                            </span>
                        </div>
                        <div>
                        <h3 className="font-bold text-xl text-foreground mb-1">
                            Dr. {apt.first_name} {apt.last_name}
                        </h3>
                        <p className="text-primary font-medium">{apt.specialization}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                                <CalendarDays className="h-4 w-4 text-primary" />
                                {new Date(apt.appointment_date).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                                <Clock className="h-4 w-4 text-primary" />
                                {new Date(apt.appointment_date).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>

                        {apt.reason_for_visit && (
                            <p className="text-sm text-muted-foreground mt-3 pl-3 border-l-2 border-primary/20 italic">
                                "{apt.reason_for_visit}"
                            </p>
                        )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-border/50">
                        <Badge className={`${getStatusColor(apt.status)} px-4 py-1.5 text-sm capitalize`}>
                            {apt.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                             <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </Button>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function AppointmentsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Your Appointments</h1>
                <p className="text-muted-foreground">View and manage all your scheduled visits</p>
            </div>
            <Suspense fallback={
                <div className="space-y-4">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                </div>
            }>
                <AppointmentsContent />
            </Suspense>
        </div>
    )
}
