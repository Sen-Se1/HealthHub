"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Clock, Users, CheckCircle, XCircle, AlertCircle, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

interface Appointment {
  id: number
  patient_name: string
  appointment_date: string
  appointment_time: string
  status: string
  reason: string
}

export default function DoctorDashboardContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [stats, setStats] = useState({ pending: 0, approved: 0, total: 0 })

  useEffect(() => {
    const fetchData = async () => {
      // Token is now handled via HttpOnly cookie
      try {
        const res = await fetch("/api/appointments/list")
        if (res.ok) {
          const data = await res.json()
          setAppointments(data.appointments || [])
          const pending = data.appointments?.filter((a: Appointment) => a.status === "pending").length || 0
          const approved = data.appointments?.filter((a: Appointment) => a.status === "approved").length || 0
          setStats({ pending, approved, total: data.appointments?.length || 0 })
        }
      } catch (err) {
        console.error("Error fetching appointments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleUpdateStatus = async (appointmentId: number, status: string) => {
    try {
      const res = await fetch("/api/appointments/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId, status }),
      })
      if (res.ok) {
        setAppointments((prev) => prev.map((a) => (a.id === appointmentId ? { ...a, status } : a)))
        const pending = appointments.filter((a) =>
          a.id === appointmentId ? status === "pending" : a.status === "pending",
        ).length
        const approved = appointments.filter((a) =>
          a.id === appointmentId ? status === "approved" : a.status === "approved",
        ).length
        setStats((prev) => ({ ...prev, pending, approved }))
      }
    } catch (err) {
      console.error("Error updating appointment:", err)
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
        <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    )
  }

  const pendingAppointments = appointments.filter((a) => a.status === "pending")
  const upcomingAppointments = appointments.filter((a) => a.status === "approved")

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={stagger}
      className="container mx-auto px-4 py-8 space-y-8"
    >
       <motion.div variants={fadeIn}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Doctor Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your appointments and patient requests.</p>
       </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-none relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertCircle className="h-24 w-24" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.pending}</div>
            <div className="text-xs text-muted-foreground mt-1">Awaiting approval</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle className="h-24 w-24" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.approved}</div>
             <div className="text-xs text-muted-foreground mt-1">Upcoming sessions</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="h-24 w-24" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
             <div className="text-xs text-muted-foreground mt-1">All time record</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Appointments */}
        <motion.div variants={fadeIn}>
            <Card className="glass-card border-border/50 h-full">
            <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Pending Requests
                </CardTitle>
                <CardDescription>Appointment requests awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent>
                {pendingAppointments.length === 0 ? (
                <div className="text-center py-12">
                     <div className="h-16 w-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No pending requests</p>
                    <p className="text-xs text-muted-foreground/60">You're all caught up!</p>
                </div>
                ) : (
                <div className="space-y-4">
                    {pendingAppointments.map((apt) => (
                    <div key={apt.id} className="bg-background/40 hover:bg-background/60 rounded-xl p-4 border border-border/50 transition-all">
                        <div className="flex justify-between items-start mb-3">
                        <div>
                            <h4 className="font-semibold text-foreground text-lg">{apt.patient_name}</h4>
                            <p className="text-sm text-muted-foreground">{apt.reason}</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-900">
                            Pending
                        </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {new Date(apt.appointment_date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                            <Clock className="h-3.5 w-3.5" />
                            {apt.appointment_time}
                        </span>
                        </div>
                        <div className="flex gap-2">
                        <Button size="sm" className="flex-1 shadow-sm" onClick={() => handleUpdateStatus(apt.id, "approved")}>
                            <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1 shadow-sm"
                            onClick={() => handleUpdateStatus(apt.id, "rejected")}
                        >
                            <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </CardContent>
            </Card>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div variants={fadeIn}>
            <Card className="glass-card border-border/50 h-full">
            <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Upcoming Appointments
                </CardTitle>
                <CardDescription>Your approved upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
                {upcomingAppointments.length === 0 ? (
                <div className="text-center py-12">
                    <div className="h-16 w-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarDays className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No upcoming appointments</p>
                </div>
                ) : (
                <div className="space-y-4">
                    {upcomingAppointments.slice(0, 5).map((apt) => (
                    <div key={apt.id} className="bg-background/40 hover:bg-background/60 rounded-xl p-4 border border-border/50 transition-all flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-foreground text-lg">{apt.patient_name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">{apt.reason}</p>
                        </div>
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">Approved</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {new Date(apt.appointment_date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                            <Clock className="h-3.5 w-3.5" />
                            {apt.appointment_time}
                        </span>
                        </div>
                    </div>
                    ))}
                    {upcomingAppointments.length > 5 && (
                        <Button variant="ghost" className="w-full mt-2" onClick={() => router.push('/doctor/appointments')}>
                            View all appointments <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
                )}
            </CardContent>
            </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
