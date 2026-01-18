"use client"

import { useEffect, useState, Suspense, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { User, Mail, Phone, Calendar, MapPin, Save, FileText, Loader2, Edit2, X, Activity, Camera, Users } from "lucide-react"
import { motion } from "framer-motion"

interface UserProfile {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string
  date_of_birth: string
  gender: string
  address: string
  medical_history: string
  profile_picture_url?: string
}

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientProfileSchema } from "@/lib/validations"
import { toast } from "sonner"
import { PhoneInput } from "@/components/ui/phone-input"
import { z } from "zod"

function ProfileContent() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    watch,
    control,
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      medicalHistory: "",
      profilePictureUrl: "",
    }
  })

  const formValues = watch()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile")
        if (res.ok) {
          const data = await res.json()
          setProfile(data.user)
          reset({
            firstName: data.user.first_name || "",
            lastName: data.user.last_name || "",
            phone: data.user.phone || "",
            dateOfBirth: data.user.date_of_birth?.split("T")[0] || "",
            gender: data.user.gender || "",
            address: data.user.address || "",
            medicalHistory: data.user.medical_history || "",
            profilePictureUrl: data.user.profile_picture_url || "",
          })
        }
      } catch (err) {
        console.error("Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router, reset])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    const previewUrl = URL.createObjectURL(file)
    
    setValue("profilePictureUrl", previewUrl)
    setProfile(prev => prev ? { ...prev, profile_picture_url: previewUrl } : null)
    setEditing(true)
  }

  const onSubmit = async (data: any) => {
    setSaving(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("firstName", data.firstName)
      formDataToSend.append("lastName", data.lastName)
      formDataToSend.append("phone", data.phone)
      formDataToSend.append("dateOfBirth", data.dateOfBirth)
      formDataToSend.append("gender", data.gender)
      formDataToSend.append("address", data.address)
      formDataToSend.append("medicalHistory", data.medicalHistory)
      
      if (selectedFile) {
        formDataToSend.append("profilePicture", selectedFile)
      }

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        body: formDataToSend,
      })

      if (res.ok) {
        const responseData = await res.json()
        if (responseData.user) {
          setProfile(responseData.user)
          reset({
            firstName: responseData.user.first_name || "",
            lastName: responseData.user.last_name || "",
            phone: responseData.user.phone || "",
            dateOfBirth: responseData.user.date_of_birth?.split("T")[0] || "",
            gender: responseData.user.gender || "",
            address: responseData.user.address || "",
            medicalHistory: responseData.user.medical_history || "",
            profilePictureUrl: responseData.user.profile_picture_url || "",
          })
        }
        setSelectedFile(null)
        setEditing(false)
        toast.success("Profile updated successfully")
        window.dispatchEvent(new Event("profile-updated"))
      } else {
        const errorData = await res.json()
        toast.error(errorData.error || "Failed to update profile")
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      toast.error("Error updating profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
     return (
        <div className="space-y-6">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
        </div>
     )
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Patient Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information</p>
      </div>

      <div className="grid gap-6">
          {/* Status/Header Card */}
          <Card className="glass-card border-none overflow-hidden group">
            <div className="h-16 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
                <div className="absolute inset-0 bg-grid-white/10" />
            </div>
            <CardContent className="relative pt-0 px-6 sm:px-10 pb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-12">
                     <div className="relative group/avatar">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="h-24 w-24 rounded-2xl bg-background shadow-xl flex items-center justify-center border-4 border-background/50 backdrop-blur-sm overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                                    {profile?.profile_picture_url ? (
                                        <img src={profile.profile_picture_url} alt="Profile" className="h-full w-full object-cover rounded-xl" />
                                    ) : (
                                        <div className="h-full w-full bg-primary/10 rounded-xl flex items-center justify-center">
                                            <User className="h-10 w-10 text-primary" />
                                        </div>
                                    )}
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-md p-0 overflow-hidden bg-transparent border-none shadow-none">
                                {profile?.profile_picture_url && (
                                    <img src={profile.profile_picture_url} alt="Profile Preview" className="w-full h-auto rounded-xl shadow-2xl" />
                                )}
                            </DialogContent>
                        </Dialog>

                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={saving}
                            className={`absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg translate-y-1/4 translate-x-1/4 transition-opacity hover:bg-primary/90 ${editing ? "opacity-100" : "opacity-0 hidden"}`}
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                        </button>
                     </div>
                     
                     <div className="flex-1 space-y-1 pb-2">
                        <h2 className="text-2xl font-bold text-foreground">
                            {profile?.first_name} {profile?.last_name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                            <span className="flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5" /> {profile?.email}
                            </span>
                            {profile?.phone && (
                                <span className="flex items-center gap-1.5">
                                    <Phone className="h-3.5 w-3.5" /> {profile.phone}
                                </span>
                            )}
                        </div>
                     </div>
                </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="glass-card border-border">
            <CardHeader className="border-b border-border/50 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and medical history</CardDescription>
                </div>
                {!editing && (
                  <Button onClick={() => setEditing(true)} variant="outline" className="shadow-sm">
                    <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
                {!editing ? (
                    <div className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                <User className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <Label className="text-muted-foreground text-sm">Full Name</Label>
                                    <p className="text-foreground font-medium mt-1 text-lg">{profile?.first_name} {profile?.last_name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <Label className="text-muted-foreground text-sm">Date of Birth</Label>
                                    <p className="text-foreground font-medium mt-1 text-lg">
                                        {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "Not set"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                <Phone className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <Label className="text-muted-foreground text-sm">Phone</Label>
                                    <p className="text-foreground font-medium mt-1 text-lg">{profile?.phone || "Not set"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                <Users className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <Label className="text-muted-foreground text-sm">Gender</Label>
                                    <p className="text-foreground font-medium mt-1 text-lg capitalize">{profile?.gender || "Not set"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                            <MapPin className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <Label className="text-muted-foreground text-sm">Address</Label>
                                <p className="text-foreground font-medium mt-1">{profile?.address || "Not set"}</p>
                            </div>
                        </div>

                        <div className="p-5 bg-secondary/30 rounded-xl border border-border/50">
                             <div className="flex items-center gap-2 mb-3">
                                 <div className="p-1.5 rounded-md bg-primary/10">
                                    <Activity className="h-4 w-4 text-primary" />
                                 </div>
                                 <Label className="text-foreground font-semibold text-sm">Medical History</Label>
                             </div>
                             <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap wrap-break-word text-sm md:text-base italic">
                                   {profile?.medical_history || "No medical history recorded."}
                                </p>
                             </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in duration-300">
                        {/* Edit Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    {...register("firstName")}
                                    className="bg-background/50"
                                />
                                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    {...register("lastName")}
                                    className="bg-background/50"
                                />
                                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <PhoneInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={saving}
                                        />
                                    )}
                                />
                                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message as string}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    {...register("dateOfBirth")}
                                    className="bg-background/50"
                                />
                                {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    {...register("gender")}
                                    className="w-full bg-background/50 border border-input text-foreground px-3 py-2 text-sm rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                {errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    {...register("address")}
                                    className="bg-background/50"
                                />
                                {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="medicalHistory">Medical History</Label>
                            <Textarea
                                id="medicalHistory"
                                {...register("medicalHistory")}
                                placeholder="Any relevant medical history, allergies, or chronic conditions..."
                                className="bg-background/50 min-h-[160px] max-h-[400px] leading-relaxed resize-y focus-visible:ring-primary/30 custom-scrollbar"
                            />
                            {errors.medicalHistory && <p className="text-xs text-destructive">{errors.medicalHistory.message}</p>}
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button type="submit" disabled={saving} className="shadow-md">
                                {saving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                            <Button variant="outline" type="button" onClick={() => setEditing(false)}>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
          </Card>
      </div>
    </motion.div>
  )
}

export default function ProfilePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={
                 <div className="max-w-4xl mx-auto space-y-6">
                     <Skeleton className="h-40 w-full rounded-xl" />
                     <Skeleton className="h-96 w-full rounded-xl" />
                 </div>
            }>
                <ProfileContent />
            </Suspense>
        </div>
    )
}
