"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Star, Briefcase, X, CalendarCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Doctor {
  id: number
  first_name: string
  last_name: string
  specialization: string
  experience_years: number
  bio: string
  profile_picture_url?: string
}

export default function FindDoctorsContent() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [appointmentDate, setAppointmentDate] = useState("")
  const [reason, setReason] = useState("")
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors/list")
        const data = await res.json()
        setDoctors(data.doctors || [])
        setFilteredDoctors(data.doctors || [])
      } catch (err) {
        console.error("[v0] Error fetching doctors:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        doctor.first_name.toLowerCase().includes(searchLower) ||
        doctor.last_name.toLowerCase().includes(searchLower) ||
        doctor.specialization.toLowerCase().includes(searchLower)
      )
    })
    setFilteredDoctors(filtered)
  }, [searchTerm, doctors])

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !appointmentDate) {
      alert("Please fill in all required fields")
      return
    }

    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/auth/login")
      return
    }

    setBookingLoading(true)
    try {
      const res = await fetch("/api/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          appointmentDate,
          reasonForVisit: reason,
        }),
      })

      if (res.ok) {
        alert("Appointment booked successfully!")
        setSelectedDoctor(null)
        setAppointmentDate("")
        setReason("")
        router.push("/patient/appointments")
      } else {
        alert("Failed to book appointment")
      }
    } catch (err) {
      console.error("[v0] Error booking appointment:", err)
      alert("Error booking appointment")
    } finally {
      setBookingLoading(false)
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-5 w-96" />
            </div>
            <div className="relative mb-8">
               <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
                ))}
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Find Doctors</h1>
        <p className="text-muted-foreground">Search and book appointments with specialists</p>
      </motion.div>

      {/* Search */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8"
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-card/50 backdrop-blur-sm border-border text-foreground shadow-sm focus-visible:ring-primary"
        />
      </motion.div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
        {filteredDoctors.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16"
          >
            <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No doctors found matching your search.</p>
          </motion.div>
        ) : (
          filteredDoctors.map((doctor, idx) => (
            <motion.div
                key={doctor.id}
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: idx * 0.05 }}
                layout
            >
                <Card
                className={`bg-card glass-card border-border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 group h-full ${
                    selectedDoctor?.id === doctor.id ? "border-primary ring-1 ring-primary" : ""
                }`}
                onClick={() => setSelectedDoctor(doctor)}
                >
                <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-md transform group-hover:scale-105 transition-transform">
                        <span className="text-primary-foreground font-bold text-xl">
                        {doctor.first_name[0]}
                        {doctor.last_name[0]}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                        <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                        Dr. {doctor.first_name} {doctor.last_name}
                        </h3>
                        <p className="text-primary font-medium text-sm">{doctor.specialization}</p>
                    </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground bg-secondary/30 p-2 rounded-lg">
                        <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4 text-primary/70" />
                            {doctor.experience_years || 0} years
                        </span>
                        <div className="w-px h-4 bg-border" />
                        <span className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            4.8
                        </span>
                    </div>

                    <div className="flex-grow">
                        {doctor.bio ? (
                            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                {doctor.bio}
                            </p>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">No bio available.</p>
                        )}
                    </div>

                    <Button
                    className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 opacity-90 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                        e.stopPropagation()
                        setSelectedDoctor(doctor)
                    }}
                    >
                     <CalendarCheck className="h-4 w-4 mr-2" /> Book Appointment
                    </Button>
                </CardContent>
                </Card>
            </motion.div>
          ))
        )}
        </AnimatePresence>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
      {selectedDoctor && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div 
             initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.9, opacity: 0, y: 20 }}
             className="w-full max-w-lg"
          >
            <Card className="bg-card border-border shadow-2xl glass-card">
                <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Book Appointment</h2>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-secondary"
                    onClick={() => {
                        setSelectedDoctor(null)
                        setAppointmentDate("")
                        setReason("")
                    }}
                    >
                    <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex items-center gap-4 mb-8 p-4 bg-secondary/50 rounded-2xl border border-border/50">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">
                        {selectedDoctor.first_name[0]}
                        {selectedDoctor.last_name[0]}
                    </span>
                    </div>
                    <div>
                    <p className="font-bold text-lg text-foreground">
                        Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
                    </p>
                    <p className="text-sm text-primary font-medium">{selectedDoctor.specialization}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                    <Label className="text-foreground font-medium">Date & Time</Label>
                    <Input
                        type="datetime-local"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="bg-background/50 border-border text-foreground h-11"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label className="text-foreground font-medium">Reason for Visit</Label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Describe your symptoms or reason..."
                        className="w-full bg-background/50 border border-border text-foreground px-4 py-3 rounded-xl min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    </div>

                    <div className="flex gap-4 pt-2">
                    <Button
                        variant="outline"
                        className="flex-1 h-12"
                        onClick={() => {
                        setSelectedDoctor(null)
                        setAppointmentDate("")
                        setReason("")
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleBookAppointment}
                        disabled={bookingLoading || !appointmentDate}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 shadow-lg shadow-primary/20"
                    >
                        {bookingLoading ? (
                            <>Loading...</>
                        ) : (
                            <>Confirm Booking</>
                        )}
                    </Button>
                    </div>
                </div>
                </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}
