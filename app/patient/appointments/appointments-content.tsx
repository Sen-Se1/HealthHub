"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Search, ArrowRight, Video, AlertCircle, XCircle, CheckCircle2, History, Calendar, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Appointment {
    id: number
    doctor_id: number
    appointment_date: string
    reason_for_visit: string
    status: string // 'approved', 'pending', 'completed', 'cancelled', 'rescheduled'
    first_name: string
    last_name: string
    specialization: string
    type: 'video' | 'in-person'
    profile_picture_url?: string
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, { color: string, icon: any, label: string }> = {
        approved: { color: "bg-blue-500/10 text-blue-600 border-blue-200", icon: CheckCircle2, label: "Upcoming" },
        pending: { color: "bg-amber-500/10 text-amber-600 border-amber-200", icon: Clock, label: "Pending" },
        completed: { color: "bg-green-500/10 text-green-600 border-green-200", icon: CheckCircle2, label: "Completed" },
        cancelled: { color: "bg-red-500/10 text-red-600 border-red-200", icon: XCircle, label: "Cancelled" },
        rescheduled: { color: "bg-purple-500/10 text-purple-600 border-purple-200", icon: AlertCircle, label: "Rescheduled" },
    }

    const { color, icon: Icon, label } = config[status] || { color: "bg-muted text-muted-foreground", icon: AlertCircle, label: status }

    return (
        <Badge variant="outline" className={cn(color, "rounded-full px-3 py-1 font-black text-[10px] uppercase tracking-widest border transition-all duration-300 shadow-xs flex items-center gap-1.5")}>
            <Icon className="h-3 w-3" />
            {label}
        </Badge>
    )
}

function VideoCallCTA({ appointmentDate }: { appointmentDate: string }) {
    const isNear = new Date(appointmentDate).getTime() - new Date().getTime() < 30 * 60 * 1000 && new Date(appointmentDate).getTime() - new Date().getTime() > -60 * 60 * 1000

    return (
        <div className="relative group w-full">
            {isNear && (
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -inset-1 bg-primary rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"
                />
            )}
            <Button className={cn(
                "w-full h-14 rounded-2xl font-black text-sm tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3",
                isNear ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/30" : "bg-secondary text-foreground hover:bg-secondary/80 shadow-none border border-border/50"
            )}>
                <Video className={cn("h-5 w-5", isNear && "animate-pulse")} />
                {isNear ? "JOIN VIDEO CALL" : "VIEW DETAILS"}
                {isNear && (
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-[10px] animate-pulse">LIVE</span>
                )}
            </Button>
        </div>
    )
}

export function AppointmentsSkeleton() {
    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div className="h-14 w-96 rounded-2xl bg-muted animate-pulse" />
                <div className="h-10 w-48 rounded-2xl bg-muted animate-pulse" />
            </div>
            <div className="space-y-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 w-full rounded-4xl bg-muted/40 shimmer border border-border/50 overflow-hidden relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-muted/50" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function AppointmentsContent() {
    const router = useRouter()
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch("/api/appointments/list")
                if (res.ok) {
                    const data = await res.json()
                    const appts = data.appointments || []

                    if (appts.length === 0) {
                        const now = new Date()
                        const mockData: Appointment[] = [
                            {
                                id: 101, doctor_id: 1, first_name: "Sarah", last_name: "Adams", specialization: "Cardiologist",
                                appointment_date: new Date(now.getTime() + 15 * 60 * 1000).toISOString(),
                                status: "approved", type: "video", reason_for_visit: "Monthly heart rate follow-up and prescription review."
                            },
                            {
                                id: 102, doctor_id: 2, first_name: "James", last_name: "Wilson", specialization: "General Physician",
                                appointment_date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                                status: "pending", type: "in-person", reason_for_visit: "Annual physical examination and blood work."
                            },
                            {
                                id: 103, doctor_id: 3, first_name: "Emily", last_name: "Chen", specialization: "Dermatologist",
                                appointment_date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                                status: "completed", type: "video", reason_for_visit: "Skin rash consultation and allergy test results."
                            },
                            {
                                id: 104, doctor_id: 4, first_name: "Michael", last_name: "Brown", specialization: "Orthopedic",
                                appointment_date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                                status: "cancelled", type: "in-person", reason_for_visit: "Knee pain assessment after sports injury."
                            }
                        ]
                        setAppointments(mockData)
                    } else {
                        setAppointments(appts.map((a: any) => ({ ...a, type: a.type || 'video' })))
                    }
                }
            } catch (err) {
                console.error("Error fetching appointments:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchAppointments()
    }, [router])

    const filteredAppointments = appointments.filter(apt => {
        if (filter === "all") return true
        if (filter === "upcoming") return apt.status === "approved" || apt.status === "pending" || apt.status === "rescheduled"
        if (filter === "past") return apt.status === "completed"
        if (filter === "cancelled") return apt.status === "cancelled"
        return true
    })

    if (loading) return <AppointmentsSkeleton />

    return (
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <TabsList className="bg-secondary/40 p-1.5 rounded-2xl border border-border/50 backdrop-blur-md overflow-x-auto max-w-full">
                    <TabsTrigger value="all" className="rounded-xl px-4 sm:px-10 py-2.5 font-black text-[10px] sm:text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all duration-300">All</TabsTrigger>
                    <TabsTrigger value="upcoming" className="rounded-xl px-4 sm:px-10 py-2.5 font-black text-[10px] sm:text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-blue-600 data-[state=active]:shadow-lg transition-all duration-300">Upcoming</TabsTrigger>
                    <TabsTrigger value="past" className="rounded-xl px-4 sm:px-10 py-2.5 font-black text-[10px] sm:text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-green-600 data-[state=active]:shadow-lg transition-all duration-300">Past</TabsTrigger>
                    <TabsTrigger value="cancelled" className="rounded-xl px-4 sm:px-10 py-2.5 font-black text-[10px] sm:text-xs uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-red-500 data-[state=active]:shadow-lg transition-all duration-300">Cancelled</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none rounded-2xl border-border/50 font-black text-xs uppercase tracking-widest bg-background/50 backdrop-blur-sm h-12">
                        <Search className="h-4 w-4 mr-2" /> Search
                    </Button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={filter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                >
                    {filteredAppointments.length === 0 ? (
                        <Card className="border-dashed border-2 py-32 text-center rounded-4xl bg-secondary/10 border-border/50 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
                            <div className="h-32 w-32 bg-background rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-border/50 relative">
                                <Calendar className="h-12 w-12 text-primary" />
                                <div className="absolute -top-2 -right-2 h-10 w-10 bg-accent rounded-full flex items-center justify-center border-4 border-background animate-bounce">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black mb-4 tracking-tight">You don't have any {filter !== 'all' ? filter : ''} appointments yet</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto mb-12 text-lg font-medium leading-relaxed italic">
                                Ready to take the next step in your health journey? Find the right specialist today.
                            </p>
                            <Link href="/patient/find-doctors">
                                <Button size="lg" className="rounded-2xl px-12 h-16 font-black shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 text-sm tracking-widest uppercase flex items-center gap-3 mx-auto">
                                    FIND A DOCTOR <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </Card>
                    ) : (
                        filteredAppointments.map((apt, i) => {
                            const date = new Date(apt.appointment_date)
                            const isUpcoming = apt.status === 'approved' || apt.status === 'pending' || apt.status === 'rescheduled'

                            return (
                                <motion.div
                                    key={apt.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                                >
                                    <Card className={cn(
                                        "glass-card border-border/50 hover:shadow-3xl transition-all duration-500 rounded-4xl overflow-hidden group relative",
                                        apt.status === 'cancelled' && "opacity-60 grayscale-[0.5]"
                                    )}>
                                        <div className={cn(
                                            "absolute left-0 top-0 bottom-0 w-1.5 z-20",
                                            apt.status === 'approved' && "bg-blue-500",
                                            apt.status === 'pending' && "bg-amber-500",
                                            apt.status === 'completed' && "bg-green-500",
                                            apt.status === 'cancelled' && "bg-red-500",
                                            apt.status === 'rescheduled' && "bg-purple-500"
                                        )} />

                                        <CardContent className="p-0">
                                            <div className="flex flex-col lg:flex-row">
                                                <div className={cn(
                                                    "lg:w-48 p-8 flex flex-col items-center justify-center text-primary-foreground relative overflow-hidden shrink-0",
                                                    apt.status === 'approved' ? "bg-linear-to-br from-blue-600 to-primary" :
                                                        apt.status === 'completed' ? "bg-linear-to-br from-green-600 to-emerald-500" :
                                                            apt.status === 'cancelled' ? "bg-linear-to-br from-red-600 to-red-400" :
                                                                "bg-linear-to-br from-slate-600 to-slate-400"
                                                )}>
                                                    <div className="absolute top-0 right-0 -m-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                                                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-3 drop-shadow-sm">
                                                        {date.toLocaleDateString(undefined, { month: 'long' })}
                                                    </span>
                                                    <span className="relative z-10 text-6xl font-black mb-1 tracking-tighter drop-shadow-xl group-hover:scale-110 transition-transform duration-500">
                                                        {date.getDate()}
                                                    </span>
                                                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-6">
                                                        {date.toLocaleDateString(undefined, { weekday: 'long' })}
                                                    </span>
                                                    <div className="relative z-10 px-4 py-2 bg-white/20 rounded-2xl text-[11px] font-black backdrop-blur-xl border border-white/20 shadow-inner flex items-center gap-2">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>

                                                <div className="flex-1 p-8 flex flex-col xl:flex-row justify-between gap-10">
                                                    <div className="space-y-8 flex-1">
                                                        <div className="flex items-start gap-6">
                                                            <div className="relative">
                                                                <div className="h-20 w-20 rounded-3xl bg-secondary flex items-center justify-center font-black text-2xl text-primary border-2 border-primary/10 shadow-lg group-hover:rotate-6 transition-transform duration-500 overflow-hidden">
                                                                    {apt.profile_picture_url ? (
                                                                        <img src={apt.profile_picture_url} alt={apt.last_name} className="h-full w-full object-cover" />
                                                                    ) : (
                                                                        <span>{apt.first_name[0]}{apt.last_name[0]}</span>
                                                                    )}
                                                                </div>
                                                                {apt.type === 'video' && (
                                                                    <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                                                                        <Video className="h-3.5 w-3.5 text-white" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                                    <StatusBadge status={apt.status} />
                                                                    {apt.type === 'video' && (
                                                                        <Badge variant="outline" className="bg-secondary/50 text-[9px] font-black uppercase tracking-widest rounded-full px-2 border-border/50">Video Visit</Badge>
                                                                    )}
                                                                </div>
                                                                <h3 className="text-3xl font-black text-foreground tracking-tight">Dr. {apt.first_name} {apt.last_name}</h3>
                                                                <p className="text-primary font-black text-xs tracking-[0.15em] uppercase">{apt.specialization}</p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                            <div className="flex items-center gap-4 group/item">
                                                                <div className="h-12 w-12 rounded-2xl bg-secondary group-hover/item:bg-primary/10 group-hover/item:scale-110 transition-all flex items-center justify-center">
                                                                    <Calendar className="h-6 w-6 text-muted-foreground group-hover/item:text-primary transition-colors" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest">Type</span>
                                                                    <span className="text-sm font-bold text-foreground capitalize">{apt.type.replace('-', ' ')}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4 group/item">
                                                                <div className="h-12 w-12 rounded-2xl bg-secondary group-hover/item:bg-primary/10 group-hover/item:scale-110 transition-all flex items-center justify-center">
                                                                    <MapPin className="h-6 w-6 text-muted-foreground group-hover/item:text-primary transition-colors" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest">Location</span>
                                                                    <span className="text-sm font-bold text-foreground">HealthHub Center, Suite 402</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="bg-secondary/30 p-6 rounded-3xl border border-border/40 backdrop-blur-xs relative group/reason">
                                                            <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                                                Consultation Note <div className="h-px flex-1 bg-border/50" />
                                                            </p>
                                                            <p className="text-sm text-foreground/80 font-semibold leading-relaxed italic">
                                                                "{apt.reason_for_visit}"
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-4 min-w-[220px] justify-center">
                                                        {isUpcoming ? (
                                                            <>
                                                                {apt.type === 'video' ? (
                                                                    <VideoCallCTA appointmentDate={apt.appointment_date} />
                                                                ) : (
                                                                    <Button className="h-14 rounded-2xl font-black text-sm tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95">
                                                                        DIRECTIONS
                                                                    </Button>
                                                                )}
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <Button variant="outline" className="rounded-2xl h-12 font-black text-[10px] tracking-widest uppercase border-border/50 hover:bg-secondary/80">
                                                                        RESCHEDULE
                                                                    </Button>
                                                                    <Button variant="ghost" className="rounded-2xl h-12 font-black text-[10px] tracking-widest uppercase text-destructive hover:bg-destructive/10">
                                                                        CANCEL
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <Button variant="secondary" className="h-14 rounded-2xl font-black text-sm tracking-widest shadow-lg hover:bg-secondary/80 transition-all flex items-center justify-center gap-3">
                                                                <History className="h-5 w-5" />
                                                                VIEW SUMMARY
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })
                    )}
                </motion.div>
            </AnimatePresence>
        </Tabs>
    )
}
