"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Search, Star, Briefcase, X, CalendarCheck, Filter, FileText, User, Phone, Clock, GraduationCap, ArrowUpDown, SlidersHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Doctor {
    id: number
    first_name: string
    last_name: string
    specialization: string
    experience_years: number
    qualification?: string
    cv_url?: string
    bio: string
    profile_picture_url?: string
    phone?: string
}

const SEARCH_FIELDS = [
    { id: "name", label: "Name" },
    { id: "specialization", label: "Specialization" },
    { id: "qualification", label: "Qualification" },
    { id: "bio", label: "Bio" },
]

export default function FindDoctorsContent() {
    const router = useRouter()
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchFields, setSearchFields] = useState<string[]>(["name", "specialization", "qualification", "bio"])
    const [experienceRange, setExperienceRange] = useState<number[]>([0, 50])
    const [sortBy, setSortBy] = useState("relevance")
    const [loading, setLoading] = useState(true)
    const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null)
    const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null)
    const [appointmentDate, setAppointmentDate] = useState("")
    const [reason, setReason] = useState("")
    const [bookingLoading, setBookingLoading] = useState(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    const toggleSearchField = (field: string) => {
        setSearchFields(prev =>
            prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
        )
    }

    const fetchDoctors = useCallback(async () => {
        setLoading(true)
        if (abortControllerRef.current) abortControllerRef.current.abort()
        abortControllerRef.current = new AbortController()

        try {
            const params = new URLSearchParams()
            if (searchTerm) params.append("search", searchTerm)
            searchFields.forEach(field => params.append("searchFields", field))
            params.append("minExperience", experienceRange[0].toString())
            params.append("maxExperience", experienceRange[1].toString())
            if (sortBy) params.append("sortBy", sortBy)

            const res = await fetch(`/api/doctors/list?${params.toString()}`, {
                signal: abortControllerRef.current.signal
            })
            if (!res.ok) throw new Error("Failed to fetch")
            const data = await res.json()
            setDoctors(data.doctors || [])
        } catch (err: any) {
            if (err.name !== 'AbortError') console.error("[API] Error fetching doctors:", err)
        } finally {
            if (!abortControllerRef.current?.signal.aborted) setLoading(false)
        }
    }, [searchTerm, searchFields, experienceRange, sortBy])

    useEffect(() => {
        const timer = setTimeout(() => fetchDoctors(), 500)
        return () => clearTimeout(timer)
    }, [fetchDoctors])

    const handleBookAppointment = async () => {
        if (!bookingDoctor || !appointmentDate) return
        setBookingLoading(true)
        try {
            const res = await fetch("/api/appointments/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctorId: bookingDoctor.id,
                    appointmentDate,
                    reasonForVisit: reason,
                }),
            })

            if (res.ok) {
                setBookingDoctor(null)
                setAppointmentDate("")
                setReason("")
                router.push("/patient/appointments")
            }
        } catch (err) {
            console.error("[API] Error booking appointment:", err)
        } finally {
            setBookingLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-3">Find a Specialist</h1>
                <p className="text-muted-foreground text-lg">Connect with top-rated doctors across all medical fields.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="glass-card border border-border shadow-2xl rounded-4xl p-8 sticky top-24 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-8 text-xl font-bold text-foreground">
                            <SlidersHorizontal className="h-6 w-6 text-primary" /> Advanced Filters
                        </div>

                        <div className="mb-10">
                            <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 block">Experience Range</Label>
                            <div className="px-2">
                                <Slider
                                    defaultValue={[0, 50]}
                                    value={experienceRange}
                                    max={50}
                                    step={1}
                                    onValueChange={setExperienceRange}
                                    className="mb-6"
                                />
                            </div>
                            <div className="flex justify-between text-xs font-black text-primary">
                                <span className="bg-primary/10 px-3 py-1 rounded-full">{experienceRange[0]} YRS</span>
                                <span className="bg-primary/10 px-3 py-1 rounded-full">{experienceRange[1]} YRS</span>
                            </div>
                        </div>

                        <div className="h-px bg-border/50 my-8" />

                        <div className="mb-8">
                            <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 block">Search Parameters</Label>
                            <div className="space-y-4">
                                {SEARCH_FIELDS.map((field) => (
                                    <div key={field.id} className="flex items-center space-x-3 group">
                                        <Checkbox
                                            id={`field-${field.id}`}
                                            checked={searchFields.includes(field.id)}
                                            onCheckedChange={() => toggleSearchField(field.id)}
                                            className="border-primary/30 data-[state=checked]:bg-primary rounded-md"
                                        />
                                        <label htmlFor={`field-${field.id}`} className="text-sm font-bold text-foreground/80 cursor-pointer group-hover:text-primary transition-colors">
                                            {field.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button variant="outline" className="w-full mt-6 rounded-2xl py-6 font-bold border-border/50 hover:bg-secondary/50 group" onClick={() => { setSearchFields(["name", "specialization", "qualification", "bio"]); setExperienceRange([0, 50]); setSearchTerm(""); }}>
                            <X className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" /> Clear All Filters
                        </Button>
                    </div>
                </motion.div>

                <div>
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-4 mb-8 sticky top-0 z-30 bg-background/60 backdrop-blur-xl py-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                            <Input
                                placeholder="Search by name, specialization, or clinic..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-14 h-14 bg-card/50 backdrop-blur-md border-border/50 text-foreground shadow-2xl rounded-2xl focus-visible:ring-primary focus-visible:border-primary/50 text-lg font-medium"
                            />
                        </div>

                        <div className="w-full md:w-[260px]">
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="h-14 bg-card/50 backdrop-blur-md border-border/50 rounded-2xl font-bold shadow-2xl text-foreground px-6">
                                    <div className="flex items-center gap-3">
                                        <ArrowUpDown className="h-4 w-4 text-primary" />
                                        <SelectValue placeholder="Sort results" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="glass-card rounded-2xl border-border/50 overflow-hidden">
                                    <SelectItem value="relevance" className="py-3 font-medium cursor-pointer">Relevance</SelectItem>
                                    <SelectItem value="experience_desc" className="py-3 font-medium cursor-pointer">Experience: Expert First</SelectItem>
                                    <SelectItem value="experience_asc" className="py-3 font-medium cursor-pointer">Experience: Rising Stars</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                Array.from({ length: 6 }).map((_, i) => (
                                    <motion.div key={`sk-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <Skeleton className="h-[380px] w-full rounded-4xl" />
                                    </motion.div>
                                ))
                            ) : doctors.length === 0 ? (
                                <motion.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full text-center py-24 bg-linear-to-b from-secondary/20 to-transparent rounded-4xl border-2 border-dashed border-border/50">
                                    <Search className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
                                    <h3 className="text-2xl font-black text-foreground mb-3">No Specialists Found</h3>
                                    <p className="text-muted-foreground max-w-md mx-auto mb-8">Try broadening your search criteria or resetting the active filters.</p>
                                    <Button variant="outline" onClick={() => { setSearchFields(["name", "specialization", "qualification", "bio"]); setExperienceRange([0, 50]); setSearchTerm(""); }} className="rounded-full px-10 border-primary/20 text-primary font-bold">Show All Doctors</Button>
                                </motion.div>
                            ) : (
                                doctors.map((doctor, idx) => (
                                    <motion.div key={doctor.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} layout>
                                        <Card className="glass-card border-border/50 cursor-pointer hover:-translate-y-2 hover:shadow-3xl transition-all duration-500 rounded-4xl overflow-hidden group h-full shadow-xl" onClick={() => setViewingDoctor(doctor)}>
                                            <CardContent className="p-0 flex flex-col h-full">
                                                <div className="relative h-24 bg-linear-to-r from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors" />
                                                <div className="px-6 pb-8 -mt-12 flex-1 flex flex-col">
                                                    <div className="flex items-end gap-5 mb-6">
                                                        <Avatar className="h-24 w-24 rounded-3xl border-4 border-card shadow-2xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                            <AvatarImage src={doctor.profile_picture_url} alt={doctor.first_name} className="object-cover" />
                                                            <AvatarFallback className="bg-linear-to-br from-primary to-accent text-primary-foreground font-black text-3xl">
                                                                {doctor.first_name[0]}{doctor.last_name[0]}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="pb-1 min-w-0">
                                                            <h3 className="font-black text-2xl text-foreground truncate group-hover:text-primary transition-colors leading-tight">
                                                                Dr. {doctor.first_name} {doctor.last_name}
                                                            </h3>
                                                            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 font-black text-[10px] uppercase tracking-widest mt-1">
                                                                {doctor.specialization}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-xl font-bold text-xs text-muted-foreground">
                                                            <Clock className="h-3.5 w-3.5" /> {doctor.experience_years} YRS
                                                        </div>
                                                        <div className="flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1.5 rounded-xl font-bold text-xs text-yellow-600">
                                                            <Star className="h-3.5 w-3.5 fill-yellow-500" /> 4.9
                                                        </div>
                                                    </div>

                                                    <div className="grow mb-8">
                                                        <p className="text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed font-medium">
                                                            {doctor.bio || "No biography provided. This specialist is ready to provide exceptional care for your needs."}
                                                        </p>
                                                    </div>

                                                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 rounded-2xl h-14 font-black transition-all active:scale-95 group-hover:shadow-3xl" onClick={(e) => { e.stopPropagation(); setBookingDoctor(doctor); }}>
                                                        <CalendarCheck className="h-5 w-5 mr-3" /> Book Consultation
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {viewingDoctor && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 backdrop-blur-2xl z-50 flex items-center justify-center p-4" onClick={() => setViewingDoctor(null)}>
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <Card className="bg-card border-border/50 shadow-[0_50px_100px_rgba(0,0,0,0.1)] glass-card overflow-hidden rounded-4xl">
                                <div className="relative h-32 bg-linear-to-r from-primary/20 to-accent/20">
                                    <Button variant="ghost" size="icon" className="absolute top-6 right-6 rounded-full bg-background/50 hover:bg-background/80 border border-border/50 backdrop-blur-md" onClick={() => setViewingDoctor(null)}>
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>

                                <CardContent className="px-10 pb-12 -mt-16">
                                    <div className="flex flex-col md:flex-row gap-8 items-end mb-10">
                                        <Avatar className="h-40 w-40 rounded-4xl border-[6px] border-card shadow-3xl shrink-0">
                                            <AvatarImage src={viewingDoctor.profile_picture_url} alt={viewingDoctor.first_name} className="object-cover" />
                                            <AvatarFallback className="bg-linear-to-br from-primary to-accent text-primary-foreground font-black text-5xl">
                                                {viewingDoctor.first_name[0]}{viewingDoctor.last_name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="pb-2 space-y-3">
                                            <Badge className="bg-primary/10 text-primary border-primary/20 font-black px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">Portal Verified Specialist</Badge>
                                            <h2 className="text-4xl font-black text-foreground tracking-tight leading-none">Dr. {viewingDoctor.first_name} {viewingDoctor.last_name}</h2>
                                            <p className="text-xl text-primary font-bold tracking-wide">{viewingDoctor.specialization}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                        <div className="flex items-center gap-5 p-5 bg-secondary/30 rounded-3xl border border-border/50">
                                            <div className="h-12 w-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                                                <Clock className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-wider">Experience</span>
                                                <p className="text-foreground font-bold text-lg">{viewingDoctor.experience_years}+ Professional Years</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5 p-5 bg-secondary/30 rounded-3xl border border-border/50">
                                            <div className="h-12 w-12 rounded-2xl bg-white shadow-md flex items-center justify-center">
                                                <GraduationCap className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase font-black text-muted-foreground/60 tracking-wider">Qualification</span>
                                                <p className="text-foreground font-bold text-lg truncate">{viewingDoctor.qualification || "Highly Specialized"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-10">
                                        <h3 className="text-lg font-black flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-primary" /> Professional Biography
                                        </h3>
                                        <div className="p-8 bg-linear-to-b from-secondary/30 to-background/30 rounded-4xl border border-border/30">
                                            <p className="text-foreground/90 font-medium leading-relaxed text-lg italic">
                                                "{viewingDoctor.bio || "No biography available for this doctor. They are highly recommended for their patient-centric approach and clinical excellence."}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button className="flex-1 h-16 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 rounded-3xl font-black text-lg gap-3" onClick={() => { setBookingDoctor(viewingDoctor); setViewingDoctor(null); }}>
                                            <CalendarCheck className="h-6 w-6" /> Reserve Consultation
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {bookingDoctor && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="w-full max-w-xl">
                            <Card className="bg-card border-border shadow-[0_50px_100px_rgba(0,0,0,0.1)] glass-card rounded-4xl overflow-hidden p-8">
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-3xl font-black text-foreground tracking-tight">Schedule Visit</h2>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary" onClick={() => { setBookingDoctor(null); setAppointmentDate(""); setReason(""); }}>
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-5 mb-10 p-6 bg-linear-to-r from-primary/10 to-accent/10 rounded-3xl border border-primary/10">
                                    <Avatar className="h-20 w-20 rounded-2xl border-4 border-white shadow-xl">
                                        <AvatarImage src={bookingDoctor.profile_picture_url} />
                                        <AvatarFallback className="bg-primary text-primary-foreground font-black text-2xl uppercase">
                                            {bookingDoctor.first_name[0]}{bookingDoctor.last_name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-black text-2xl text-foreground">Dr. {bookingDoctor.first_name} {bookingDoctor.last_name}</p>
                                        <Badge className="bg-white/80 text-primary font-bold mt-1 shadow-sm border-none uppercase tracking-widest text-[9px]">{bookingDoctor.specialization}</Badge>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Select Date & Time</Label>
                                        <Input type="datetime-local" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="bg-background/50 border-border/50 text-foreground h-16 rounded-2xl px-6 text-lg font-bold shadow-sm focus:ring-primary" />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Reason for consultation</Label>
                                        <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Please detail your primary symptoms or health goals..." className="w-full bg-background/50 border border-border/50 text-foreground px-6 py-5 rounded-3xl min-h-[140px] focus:outline-none focus:ring-4 focus:ring-primary/10 text-lg font-medium shadow-sm" />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button variant="ghost" className="flex-1 h-16 rounded-3xl font-black text-muted-foreground hover:bg-secondary/50" onClick={() => { setBookingDoctor(null); setAppointmentDate(""); setReason(""); }}>Discard</Button>
                                        <Button onClick={handleBookAppointment} disabled={bookingLoading || !appointmentDate} className="flex-2 h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-3xl font-black text-xl shadow-2xl shadow-primary/30 transition-all active:scale-95">
                                            {bookingLoading ? "Processing..." : "Confirm Schedule"}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
