"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Plus, Trash2, Calendar } from "lucide-react"
import { motion } from "framer-motion"

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface Availability {
  id: number
  day_of_week: string
  start_time: string
  end_time: string
  break_start?: string
  break_end?: string
}

export default function AvailabilityContent() {
  const router = useRouter()
  const [availability, setAvailability] = useState<Availability[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [formData, setFormData] = useState({
    dayOfWeek: "Monday",
    startTime: "09:00",
    endTime: "17:00",
    breakStart: "12:00",
    breakEnd: "13:00",
  })

  useEffect(() => {
    const fetchAvailability = async () => {
      // Token is now handled via HttpOnly cookie
      try {
        const res = await fetch("/api/doctor/availability")

        if (res.ok) {
          const data = await res.json()
          setAvailability(data.availability || [])
        }
      } catch (err) {
        console.error("Error fetching availability:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [router])

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAvailability = async () => {
    setAdding(true)
    try {
      const res = await fetch("/api/doctor/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dayOfWeek: formData.dayOfWeek,
          startTime: formData.startTime,
          endTime: formData.endTime,
          breakStart: formData.breakStart,
          breakEnd: formData.breakEnd,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setAvailability((prev) => [...prev, data.availability])
      }
    } catch (err) {
      console.error("Error adding availability:", err)
    } finally {
      setAdding(false)
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-[500px] w-full rounded-xl" />
            <Skeleton className="h-[500px] w-full lg:col-span-2 rounded-xl" />
        </div>
      </div>
    )
  }

  // Group availability by day
  const availabilityByDay = DAYS_OF_WEEK.map((day) => ({
    day,
    slots: availability.filter((a) => a.day_of_week === day),
  }))

  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate" className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Availability</h1>
        <p className="text-muted-foreground mt-1">Set your working hours for each day</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Schedule Form */}
        <Card className="glass-card border-border lg:col-span-1 h-fit sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add Schedule
            </CardTitle>
            <CardDescription>Add your working hours for a day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Day of Week</Label>
              <Select value={formData.dayOfWeek} onValueChange={(v) => handleChange("dayOfWeek", v)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DAYS_OF_WEEK.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input 
                    type="time" 
                    value={formData.endTime} 
                    onChange={(e) => handleChange("endTime", e.target.value)} 
                    className="bg-background/50"
                />
              </div>
            </div>

            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Break Time (Optional)</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Break Start</Label>
                <Input
                  type="time"
                  value={formData.breakStart}
                  onChange={(e) => handleChange("breakStart", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Break End</Label>
                <Input
                  type="time"
                  value={formData.breakEnd}
                  onChange={(e) => handleChange("breakEnd", e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>

            <Button onClick={handleAddAvailability} className="w-full mt-2 shadow-lg shadow-primary/20" disabled={adding}>
              {adding ? (
                 "Adding..."
              ) : (
                <>
                <Plus className="h-4 w-4 mr-2" />
                Add Schedule
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Schedule Display */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Your Weekly Schedule
              </CardTitle>
              <CardDescription>Overview of your working hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availabilityByDay.map(({ day, slots }) => (
                  <div
                    key={day}
                    className={`p-4 rounded-xl border transition-all ${
                      slots.length > 0 
                      ? "bg-primary/5 border-primary/20 shadow-sm" 
                      : "bg-secondary/30 border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {day}
                      </h4>
                      {slots.length === 0 && <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">Off</span>}
                    </div>
                    {slots.length > 0 && (
                        <div className="space-y-2">
                            {slots.map((slot) => (
                            <div key={slot.id} className="flex items-center justify-between bg-background/50 p-2 rounded-lg text-sm border border-border/50">
                                <div>
                                <span className="font-medium text-foreground">
                                    {slot.start_time} - {slot.end_time}
                                </span>
                                {slot.break_start && slot.break_end && (
                                    <span className="text-muted-foreground ml-2 text-xs">
                                    (Break: {slot.break_start} - {slot.break_end})
                                    </span>
                                )}
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                            ))}
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
