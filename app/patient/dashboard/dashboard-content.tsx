"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, ArrowRight, Stethoscope, User, Activity, Bell, MessageSquare, ChevronRight, Plus, Sparkles } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface Appointment {
  id: number
  appointment_date: string
  status: string
  reason_for_visit: string
  first_name: string
  last_name: string
  specialization: string
  profile_picture_url?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

function StatCard({ label, value, icon: Icon, color, bg, delay }: any) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="glass-card border-border/50 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden group relative">
        <div className={cn("absolute top-0 right-0 -m-6 w-24 h-24 rounded-full blur-3xl opacity-20", bg)} />
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500", bg, color)}>
              <Icon className="h-7 w-7" />
            </div>
            <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + delay }}
              className="text-4xl font-black text-foreground tracking-tighter"
            >
              {value}
            </motion.p>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AppointmentCard({ apt, i }: { apt: Appointment, i: number }) {
  const date = new Date(apt.appointment_date)

  return (
    <motion.div variants={itemVariants}>
      <Card className="glass-card border-border/50 hover:shadow-2xl transition-all duration-500 rounded-4xl overflow-hidden group">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Date Block - Neutralized per prompt */}
            <div className="bg-secondary/30 dark:bg-slate-900/50 md:w-32 p-6 flex flex-col items-center justify-center text-foreground shrink-0 relative overflow-hidden border-r border-border/50">
              <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-primary mb-1">{date.toLocaleDateString(undefined, { month: 'short' })}</span>
              <span className="relative z-10 text-4xl font-black tracking-tighter">{date.getDate()}</span>
              <span className="relative z-10 text-[10px] font-bold text-muted-foreground/60 mt-1">{date.toLocaleDateString(undefined, { weekday: 'short' })}</span>
            </div>

            {/* Content Block */}
            <div className="flex-1 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 w-full sm:w-auto">
                <div className="h-16 w-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 border border-green-200 dark:border-green-800/20 shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  {apt.profile_picture_url ? (
                    <img src={apt.profile_picture_url} alt={apt.last_name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xl font-black text-green-600 dark:text-green-400">{apt.first_name[0]}{apt.last_name[0]}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-black text-lg tracking-tight">Dr. {apt.first_name} {apt.last_name}</h4>
                    <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-none text-[9px] font-black uppercase tracking-wider px-2">
                      {apt.status === 'approved' ? 'Confirmed' : apt.status}
                    </Badge>
                  </div>
                  <p className="text-primary font-bold text-xs uppercase tracking-wide mb-2">{apt.specialization}</p>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground/80">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-blue-500" /> Consultation</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button className="flex-1 sm:flex-none rounded-2xl font-black shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5">
                  JOIN CALL
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-border/50 hover:bg-secondary/50 transition-colors">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 animate-pulse">
      <div className="h-48 w-full rounded-4xl bg-muted/30 shimmer" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <div key={i} className="h-40 w-full rounded-3xl bg-muted/30 shimmer" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-8 w-64 rounded-full bg-muted/30" />
          {[1, 2].map(i => <div key={i} className="h-32 w-full rounded-4xl bg-muted/30 shimmer" />)}
        </div>
        <div className="space-y-6">
          <div className="h-64 w-full rounded-4xl bg-muted/30 shimmer" />
        </div>
      </div>
    </div>
  )
}

export default function PatientDashboardContent() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ first_name: string; last_name: string } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apptsRes, profileRes] = await Promise.all([
          fetch("/api/appointments/list"),
          fetch("/api/user/profile")
        ])

        if (apptsRes.ok) {
          const apptsData = await apptsRes.json()
          setAppointments(apptsData.appointments || [])
        }

        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setUser(profileData.user)
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const upcomingAppointments = useMemo(() => appointments
    .filter((apt) => new Date(apt.appointment_date) >= new Date() && (apt.status === "approved" || apt.status === "pending"))
    .sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())
    .slice(0, 3), [appointments])

  if (loading) return <DashboardSkeleton />

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8 max-w-7xl relative"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 mt-[-200px] mr-[-100px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10 mb-[-200px] ml-[-100px]" />

      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-black uppercase text-primary tracking-[0.3em]">Patient Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
              Good morning, <span className="text-primary">{user?.first_name || "John"}</span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium max-w-lg leading-relaxed">
              Welcome back to HealthHub. Here’s a summary of your personalized care program today.
            </p>
          </div>
            <Link href="/patient/find-doctors" className="hidden md:block">
              <Button size="lg" className="rounded-2xl font-black shadow-xl shadow-primary/20 hover:bg-primary/90 px-8 py-7 group">
                <Plus className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                BOOK VISIT
              </Button>
            </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        {/* Main Content: Appointments */}
        <div className="space-y-10">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-4">
              Upcoming Visits
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-black border border-primary/10">{upcomingAppointments.length}</span>
            </h2>
            <Link href="/patient/appointments" className="group flex items-center gap-2 text-sm font-black text-primary hover:opacity-80 transition-opacity">
              VIEW SCHEDULE <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="space-y-6">
            {upcomingAppointments.length === 0 ? (
              <motion.div variants={itemVariants}>
                <Card className="border-dashed border-2 py-24 text-center rounded-4xl bg-secondary/5 border-border/50">
                  <div className="h-24 w-24 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CalendarDays className="h-10 w-10 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">No pending visits</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto mb-10 font-medium">Ready to take the next step? Find the right specialist for your health needs.</p>
                  <Link href="/patient/find-doctors">
                    <Button variant="secondary" className="rounded-full px-12 h-12 font-black text-sm tracking-widest uppercase">DISCOVER DOCTORS</Button>
                  </Link>
                </Card>
              </motion.div>
            ) : (
              upcomingAppointments.map((apt, i) => (
                <AppointmentCard key={apt.id} apt={apt} i={i} />
              ))
            )}
          </div>

          {/* Quick Actions Panel */}
          <motion.div variants={itemVariants} className="bg-card/40 glass-card p-10 rounded-4xl border border-border/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Sparkles className="h-32 w-32 text-primary" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-2 tracking-tight">Need immediate assistance?</h2>
              <p className="text-muted-foreground font-medium mb-8 max-w-md italic">Quickly access our top services or speak with a specialist through secure chat.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/patient/find-doctors">
                  <Button className="w-full h-16 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white">FIND DOCTOR</Button>
                </Link>
                <Link href="/patient/chat">
                  <Button variant="outline" className="w-full h-16 rounded-2xl font-black text-xs tracking-widest border-2 border-primary/20 hover:bg-primary/5 text-primary">START CHAT</Button>
                </Link>
                <Button variant="outline" className="w-full h-16 rounded-2xl font-black text-xs tracking-widest border-2 hover:bg-background/80">REFILLS</Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar: Notifications */}
        <motion.div variants={itemVariants} className="space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
              Latest Feeds
              <div className="h-5 w-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">3</div>
            </h3>
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-secondary">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>

          <Card className="glass-card border-border/50 shadow-2xl rounded-4xl overflow-hidden divide-y divide-border/50 bg-card">
            {[
              { title: "Lab Results Ready", desc: "Biometric analysis from Jan 25th", time: "2h ago", icon: Activity, color: "text-green-600", bg: "bg-green-500/10" },
              { title: "Prescription Update", desc: "Dr. Adams added a new note", time: "5h ago", icon: Stethoscope, color: "text-blue-600", bg: "bg-blue-500/10" },
              { title: "Consultation Alert", desc: "Pending review for appointment #422", time: "Yesterday", icon: Bell, color: "text-amber-600", bg: "bg-amber-500/10" },
            ].map((note, i) => (
              <div key={i} className="p-6 hover:bg-primary/5 transition-all cursor-pointer group flex items-start gap-4">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500", note.bg, note.color)}>
                  <note.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-black text-foreground leading-tight uppercase tracking-tight">{note.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground/80 mb-2 line-clamp-1 font-semibold">{note.desc}</p>
                  <span className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">{note.time}</span>
                </div>
              </div>
            ))}
            <div className="p-4 bg-secondary/10 dark:bg-slate-900/40 text-center">
              <Button variant="ghost" className="text-[10px] font-black tracking-widest uppercase text-muted-foreground/60 hover:text-primary">MARK ALL AS READ</Button>
            </div>
          </Card>

          {/* Medical Profile Quick Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-linear-to-br from-green-100/50 to-white dark:from-green-950/20 dark:to-slate-950 p-8 rounded-4xl border border-border/50 shadow-xl relative group overflow-hidden"
          >
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-green-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="h-12 w-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:rotate-6 transition-transform border border-border/50">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-xl font-black mb-2 tracking-tight">Your Health Profile</h4>
              <p className="text-xs text-muted-foreground font-bold mb-6 leading-relaxed">Update your biometric data for more accurate health monitoring.</p>
              <Link href="/patient/profile">
                <Button variant="outline" className="w-full rounded-2xl font-black text-[10px] tracking-[0.2em] border-2 border-primary/10 uppercase py-6 hover:bg-primary/5 hover:text-primary transition-all">UPDATE INFO</Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
