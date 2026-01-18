"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Clock, Search, ArrowRight, Stethoscope, User, Activity, Bell } from "lucide-react"
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

export default function PatientDashboardContent() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("Patient")

  useEffect(() => {
    // Token is now handled via HttpOnly cookie
    const fetchAppointments = async () => {
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

  const upcomingAppointments = appointments
    .filter((apt) => new Date(apt.appointment_date) >= new Date() && apt.status === "approved")
    .slice(0, 3)

  const pendingAppointments = appointments.filter((apt) => apt.status === "pending")

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
    )
  }

  return (
    <motion.div 
      variants={stagger}
      initial="initial"
      animate="animate"
      className="container mx-auto px-4 py-8"
    >
      {/* Branding / Identity Section */}
      <motion.div variants={fadeIn} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
             <span className="text-primary-foreground font-bold text-2xl">H</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">HealthHub</h1>
            <p className="text-muted-foreground">Patient Portal</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-full">
                <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
                <User className="h-5 w-5" />
            </Button>
        </div>
      </motion.div>

      {/* Welcome Message */}
      <motion.div variants={fadeIn} className="mb-8">
         <h2 className="text-2xl font-semibold mb-1">Welcome back</h2>
         <p className="text-muted-foreground">Here's what's happening with your health today.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Link href="/patient/find-doctors">
            <CardContent className="p-8 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-1">Find a Doctor</h3>
                  <p className="text-sm text-muted-foreground">Browse specialists & book now</p>
                </div>
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Link>
        </Card>

        <Card className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Link href="/patient/appointments">
            <CardContent className="p-8 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CalendarDays className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-foreground mb-1">My Appointments</h3>
                  <p className="text-sm text-muted-foreground">{appointments.length} total scheduled</p>
                </div>
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Link>
        </Card>
      </motion.div>

      {/* Upcoming Appointments */}
      <motion.div variants={fadeIn}>
        <Card className="glass-card border-border/50 mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Appointments
            </CardTitle>
            {upcomingAppointments.length > 0 && (
              <Link href="/patient/appointments">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                  View all
                </Button>
              </Link>
            )}
          </CardHeader>
          <CardContent className="pt-6">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                     <Stethoscope className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No upcoming visits</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">You don't have any approved appointments scheduled at the moment.</p>
                <Link href="/patient/find-doctors">
                  <Button className="shadow-lg shadow-primary/20">Book an Appointment</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-md">
                        <span className="text-primary-foreground font-bold text-lg">
                          {apt.first_name[0]}
                          {apt.last_name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-lg text-foreground">
                          Dr. {apt.first_name} {apt.last_name}
                        </p>
                        <p className="text-sm font-medium text-primary mb-1">{apt.specialization}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                           <CalendarDays className="h-3 w-3" />
                           {new Date(apt.appointment_date).toLocaleDateString("en-US", {
                             weekday: "short",
                             month: "short",
                             day: "numeric",
                           })}
                           <span className="mx-1">•</span>
                           <Clock className="h-3 w-3" />
                           {new Date(apt.appointment_date).toLocaleTimeString("en-US", {
                             hour: "2-digit",
                             minute: "2-digit",
                           })}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(apt.status)} variant="outline">{apt.status}</Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Pending Appointments */}
      {pendingAppointments.length > 0 && (
        <motion.div variants={fadeIn}>
            <Card className="glass-card border-yellow-500/20 bg-yellow-500/5">
            <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-yellow-500" />
                Pending Approval ({pendingAppointments.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                {pendingAppointments.slice(0, 3).map((apt) => (
                    <div
                    key={apt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-background/40 border border-yellow-500/10 gap-2"
                    >
                    <div>
                        <p className="font-semibold text-foreground">
                        Dr. {apt.first_name} {apt.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                        {new Date(apt.appointment_date).toLocaleDateString()}
                        </p>
                    </div>
                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 w-fit">Pending</Badge>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
