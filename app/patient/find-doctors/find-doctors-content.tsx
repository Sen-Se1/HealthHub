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
  // Advanced Filters State
  const [searchFields, setSearchFields] = useState<string[]>(["name", "specialization", "qualification", "bio"])
  const [experienceRange, setExperienceRange] = useState<number[]>([0, 50])
  const [sortBy, setSortBy] = useState("relevance")
  
  const [loading, setLoading] = useState(true)
  
  // Doctor currently being viewed in the details modal
  const [viewingDoctor, setViewingDoctor] = useState<Doctor | null>(null)
  
  // State for booking modal (can be triggered from details modal)
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null)
  
  const [appointmentDate, setAppointmentDate] = useState("")
  const [reason, setReason] = useState("")
  const [bookingLoading, setBookingLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Toggle search field selection
  const toggleSearchField = (field: string) => {
      setSearchFields(prev => 
        prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
      )
  }

  const fetchDoctors = useCallback(async () => {
    setLoading(true)
    
    // Cancel previous request if exists
    if (abortControllerRef.current) {
        abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      
      // Append multiple searchFields params
      searchFields.forEach(field => params.append("searchFields", field))

      // Experience Range
      params.append("minExperience", experienceRange[0].toString())
      params.append("maxExperience", experienceRange[1].toString())

      // Sorting
      if (sortBy) params.append("sortBy", sortBy)
      
      const res = await fetch(`/api/doctors/list?${params.toString()}`, {
          signal: abortControllerRef.current.signal
      })
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setDoctors(data.doctors || [])
    } catch (err: any) {
      if (err.name !== 'AbortError') {
          console.error("[API] Error fetching doctors:", err)
      }
    } finally {
        if (!abortControllerRef.current?.signal.aborted) {
            setLoading(false)
        }
    }
  }, [searchTerm, searchFields, experienceRange, sortBy])

  // Debounced fetch for slider/input changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDoctors()
    }, 500)

    return () => clearTimeout(timer)
  }, [fetchDoctors])

  const handleBookAppointment = async () => {
    if (!bookingDoctor || !appointmentDate) {
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
          doctorId: bookingDoctor.id,
          appointmentDate,
          reasonForVisit: reason,
        }),
      })

      if (res.ok) {
        alert("Appointment booked successfully!")
        setBookingDoctor(null)
        setAppointmentDate("")
        setReason("")
        router.push("/patient/appointments")
      } else {
        alert("Failed to book appointment")
      }
    } catch (err) {
      console.error("[API] Error booking appointment:", err)
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


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Find Doctors</h1>
        <p className="text-muted-foreground">Search and book appointments with specialists</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        
        {/* Left Sidebar Filters */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="bg-card glass-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
                <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-foreground">
                    <SlidersHorizontal className="h-5 w-5" /> Filters
                </div>

                {/* Experience Range Filter */}
                <div className="mb-8">
                    <Label className="text-base font-medium mb-4 block">Experience Range</Label>
                    <div className="px-2">
                        <Slider
                            defaultValue={[0, 50]}
                            value={experienceRange}
                            max={50}
                            step={1}
                            onValueChange={setExperienceRange}
                            className="mb-4"
                        />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground font-medium">
                        <span>{experienceRange[0]} years</span>
                        <span>{experienceRange[1]} years</span>
                    </div>
                </div>

                <div className="h-px bg-border my-6" />

                {/* Search Fields Checkboxes */}
                <div>
                    <Label className="text-base font-medium mb-4 block">Search In</Label>
                    <div className="space-y-3">
                        {SEARCH_FIELDS.map((field) => (
                            <div key={field.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`field-${field.id}`} 
                                    checked={searchFields.includes(field.id)}
                                    onCheckedChange={() => toggleSearchField(field.id)}
                                />
                                <label
                                    htmlFor={`field-${field.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {field.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reset Filters */}
                <Button 
                    variant="outline" 
                    className="w-full mt-8 border-dashed"
                    onClick={() => {
                        setSearchFields(["name", "specialization", "qualification", "bio"])
                        setExperienceRange([0, 50])
                        setSearchTerm("")
                    }}
                >
                    Reset Filters
                </Button>
            </div>
        </motion.div>

        {/* Right Content Area */}
        <div>
            {/* Top Bar: Search & Sort */}
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row gap-4 mb-6 sticky top-0 z-30 bg-background/80 backdrop-blur-md py-2 items-center"
            >
                <div className="relative flex-1 flex gap-2 w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 h-12 bg-card/80 backdrop-blur-sm border-border text-foreground shadow-sm focus-visible:ring-primary"
                        />
                    </div>

                </div>

                <div className="w-full md:w-[220px]">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="h-12 bg-card/80 backdrop-blur-sm border-border font-medium shadow-sm text-foreground focus:ring-primary">
                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground font-normal mr-1">Sort by:</span>
                                <SelectValue />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Relevance</SelectItem>
                            <SelectItem value="experience_desc">Experience (High to Low)</SelectItem>
                            <SelectItem value="experience_asc">Experience (Low to High)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </motion.div>
            


            {/* Doctor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="wait">
                {loading ? (
                    // Loading Skeletons
                    Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={`skeleton-${i}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Skeleton className="h-[300px] w-full rounded-xl" />
                        </motion.div>
                    ))
                ) : doctors.length === 0 ? (
                <motion.div 
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full text-center py-16 bg-card/30 rounded-xl border border-dashed border-border"
                >
                    <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-1">No doctors found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                    <Button 
                        variant="link" 
                        onClick={() => {
                            setSearchFields(["name", "specialization", "qualification", "bio"])
                            setExperienceRange([0, 50])
                            setSearchTerm("")
                        }}
                        className="mt-2 text-primary"
                    >
                        Clear all filters
                    </Button>
                </motion.div>
                ) : (
                doctors.map((doctor, idx) => (
                    <motion.div
                        key={doctor.id}
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: idx * 0.05 }}
                        layout
                    >
                        <Card
                        className={`bg-card glass-card border-border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 group h-full rounded-2xl overflow-hidden`}
                        onClick={() => setViewingDoctor(doctor)}
                        >
                        <CardContent className="p-5 flex flex-col h-full">
                            <div className="flex items-start gap-4 mb-3">
                            <Avatar className="h-14 w-14 rounded-full border-2 border-primary/10 shadow-sm shrink-0">
                                <AvatarImage src={doctor.profile_picture_url} alt={`${doctor.first_name} ${doctor.last_name}`} className="object-cover" />
                                <AvatarFallback className="bg-linear-to-br from-primary/80 to-accent text-primary-foreground font-bold text-lg">
                                    {doctor.first_name[0]}{doctor.last_name[0]}
                                </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0 pt-0.5">
                                <h3 className="font-bold text-lg text-foreground truncate leading-tight group-hover:text-primary transition-colors">
                                Dr. {doctor.first_name} {doctor.last_name}
                                </h3>
                                <p className="text-primary font-medium text-sm truncate">{doctor.specialization}</p>
                            </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <Badge variant="secondary" className="bg-secondary/50 text-muted-foreground hover:bg-secondary/70 font-normal">
                                    <Clock className="h-3 w-3 mr-1" /> {doctor.experience_years || 0} Years
                                </Badge>
                                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-200/50 font-normal">
                                    <Star className="h-3 w-3 mr-1 fill-yellow-500" /> 4.8
                                </Badge>
                            </div>

                            <div className="grow mb-4">
                                {doctor.bio ? (
                                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed break-words">
                                        {doctor.bio}
                                    </p>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic opacity-70">No bio available.</p>
                                )}
                            </div>

                            <Button
                            className="w-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all rounded-xl h-10 font-medium"
                            onClick={(e) => {
                                e.stopPropagation()
                                setBookingDoctor(doctor)
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
        </div>
      </div>

      {/* Doctor Details Modal */}
      <AnimatePresence>
        {viewingDoctor && (
           <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
           onClick={() => setViewingDoctor(null)}
       >
         <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-3xl my-8"
            onClick={(e) => e.stopPropagation()}
         >
           <Card className="bg-card border-border shadow-2xl glass-card overflow-hidden">
               <div className="relative h-12 bg-linear-to-r from-primary/20 to-accent/20">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80 border border-border"
                        onClick={() => setViewingDoctor(null)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
               </div>
               
               <CardContent className="px-8 pb-8 -mt-16">
                   <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="shrink-0">
                            <Avatar className="h-32 w-32 rounded-full border-4 border-card shadow-xl">
                                <AvatarImage src={viewingDoctor.profile_picture_url} alt={`${viewingDoctor.first_name}`} className="object-cover" />
                                <AvatarFallback className="bg-linear-to-br from-primary to-accent text-primary-foreground font-bold text-4xl">
                                    {viewingDoctor.first_name[0]}{viewingDoctor.last_name[0]}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        
                        <div className="flex-1 pt-1 md:pt-16 space-y-2">
                            <h2 className="text-3xl font-bold text-foreground">Dr. {viewingDoctor.first_name} {viewingDoctor.last_name}</h2>
                            <p className="text-xl text-primary font-medium">{viewingDoctor.specialization}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" /> {viewingDoctor.experience_years} Years Experience
                                </span>
                                {viewingDoctor.phone && (
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="h-4 w-4" /> {viewingDoctor.phone}
                                    </span>
                                )}
                            </div>
                        </div>
                   </div>

                   <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <span className="text-muted-foreground text-sm font-medium">Specialization</span>
                                    <p className="text-foreground font-medium mt-0.5">{viewingDoctor.specialization}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <span className="text-muted-foreground text-sm font-medium">Qualification</span>
                                    <p className="text-foreground font-medium mt-0.5">{viewingDoctor.qualification || "Not specified"}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" /> About
                            </h3>
                            <div className="p-4 bg-secondary/30 rounded-lg max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                <p className="text-foreground leading-relaxed">
                                    {viewingDoctor.bio || "No biography available for this doctor."}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            {viewingDoctor.cv_url && (
                                <Button 
                                    variant="outline" 
                                    className="flex-1 h-12 border-primary/20 hover:bg-primary/5 hover:text-primary gap-2"
                                    onClick={() => window.open(viewingDoctor.cv_url, '_blank')}
                                >
                                    <FileText className="h-4 w-4" /> View CV
                                </Button>
                            )}
                            <Button 
                                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 gap-2"
                                onClick={() => {
                                    setBookingDoctor(viewingDoctor)
                                    setViewingDoctor(null)
                                }}
                            >
                                <CalendarCheck className="h-4 w-4" /> Book Appointment
                            </Button>
                        </div>
                   </div>
               </CardContent>
           </Card>
         </motion.div>
       </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
      {bookingDoctor && (
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
                        setBookingDoctor(null)
                        setAppointmentDate("")
                        setReason("")
                    }}
                    >
                    <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex items-center gap-4 mb-8 p-4 bg-secondary/50 rounded-2xl border border-border/50">
                    <Avatar className="h-16 w-16 rounded-full border border-primary/20">
                        <AvatarImage src={bookingDoctor.profile_picture_url} alt={bookingDoctor.first_name} />
                         <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                            {bookingDoctor.first_name[0]}{bookingDoctor.last_name[0]}
                        </AvatarFallback>
                    </Avatar>
                   
                    <div>
                    <p className="font-bold text-lg text-foreground">
                        Dr. {bookingDoctor.first_name} {bookingDoctor.last_name}
                    </p>
                    <p className="text-sm text-primary font-medium">{bookingDoctor.specialization}</p>
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
                        setBookingDoctor(null)
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
