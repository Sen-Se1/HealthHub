"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Clock, CheckCircle, XCircle, User, AlertCircle, FileText } from "lucide-react"
import { motion } from "framer-motion"

interface Appointment {
  id: number
  patient_name: string
  appointment_date: string
  appointment_time: string
  status: string
  reason: string
}

export default function DoctorAppointmentsContent() {
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="h-12 w-full max-w-md rounded-lg" />
        <div className="space-y-4">
             {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 w-full rounded-xl" />
             ))}
        </div>
      </div>
    )
  }

  const pending = appointments.filter((a) => a.status === "pending")
  const approved = appointments.filter((a) => a.status === "approved")
  const rejected = appointments.filter((a) => a.status === "rejected")

  const AppointmentCard = ({ apt, showActions = false }: { apt: Appointment; showActions?: boolean }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card bg-background/40 hover:bg-background/60 rounded-xl p-6 border border-border/50 transition-all flex flex-col md:flex-row gap-6"
    >
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-lg">{apt.patient_name}</h4>
              <div className="flex items-center gap-2 mt-1">
                 <Badge
                    variant="outline"
                    className={
                        apt.status === "approved"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : apt.status === "rejected"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-900"
                    }
                    >
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2 text-sm text-foreground/80">
                <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <p>{apt.reason || "No reason provided."}</p>
            </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-md">
            <CalendarDays className="h-4 w-4" />
            {new Date(apt.appointment_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-md">
            <Clock className="h-4 w-4" />
            {apt.appointment_time}
            </span>
        </div>
      </div>
      
      {showActions && (
        <div className="flex md:flex-col gap-2 md:w-32 justify-center border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6">
          <Button size="sm" className="w-full shadow-sm" onClick={() => handleUpdateStatus(apt.id, "approved")}>
            <CheckCircle className="h-4 w-4 mr-2" /> Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="w-full shadow-sm"
            onClick={() => handleUpdateStatus(apt.id, "rejected")}
          >
            <XCircle className="h-4 w-4 mr-2" /> Reject
          </Button>
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div variants={fadeIn} initial="initial" animate="animate" className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
        <p className="text-muted-foreground mt-1">Manage your patient appointments</p>
      </motion.div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1 h-auto rounded-xl">
          <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm py-2 px-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            Pending ({pending.length})
        </TabsTrigger>
          <TabsTrigger value="approved" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm py-2 px-4">
             <CheckCircle className="h-4 w-4 mr-2" />
            Approved ({approved.length})
        </TabsTrigger>
          <TabsTrigger value="rejected" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm py-2 px-4">
            <XCircle className="h-4 w-4 mr-2" />
            Rejected ({rejected.length})
        </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="outline-none">
            <motion.div variants={fadeIn} initial="initial" animate="animate">
                {pending.length === 0 ? (
                    <Card className="glass-card border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
                        <div className="h-16 w-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No pending requests</h3>
                        <p className="text-muted-foreground mt-1">You're all caught up!</p>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                    {pending.map((apt) => (
                        <AppointmentCard key={apt.id} apt={apt} showActions />
                    ))}
                    </div>
                )}
            </motion.div>
        </TabsContent>

        <TabsContent value="approved" className="outline-none">
            <motion.div variants={fadeIn} initial="initial" animate="animate">
              {approved.length === 0 ? (
                <Card className="glass-card border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
                     <div className="h-16 w-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                        <CalendarDays className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No approved appointments</h3>
                    <p className="text-muted-foreground mt-1">Your upcoming schedule will appear here</p>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {approved.map((apt) => (
                    <AppointmentCard key={apt.id} apt={apt} />
                  ))}
                </div>
              )}
            </motion.div>
        </TabsContent>

        <TabsContent value="rejected" className="outline-none">
             <motion.div variants={fadeIn} initial="initial" animate="animate">
              {rejected.length === 0 ? (
                <Card className="glass-card border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
                     <div className="h-16 w-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                        <XCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No rejected appointments</h3>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {rejected.map((apt) => (
                    <AppointmentCard key={apt.id} apt={apt} />
                  ))}
                </div>
              )}
            </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
