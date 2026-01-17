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

function ProfileContent() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    medicalHistory: "",
    profilePictureUrl: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // ... (useEffect and handlers remain similar, skipping to render for brevity in replacement? No, replace_file_content needs strict context matching. I will target specific blocks or replace larger chunks.)

  useEffect(() => {
    // ... code matching original ...
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/auth/login")
      return
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setProfile(data.user)
          setFormData({
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
  }, [router])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    const previewUrl = URL.createObjectURL(file)
    
    // Update local state for preview
    setFormData(prev => ({ ...prev, profilePictureUrl: previewUrl }))
    setProfile(prev => prev ? { ...prev, profile_picture_url: previewUrl } : null)
    
    // Enable editing mode so user can save
    setEditing(true)
  }

  const handleSave = async () => {
    const token = localStorage.getItem("authToken")
    if (!token) return

    setSaving(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("firstName", formData.firstName)
      formDataToSend.append("lastName", formData.lastName)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("dateOfBirth", formData.dateOfBirth)
      formDataToSend.append("gender", formData.gender)
      formDataToSend.append("address", formData.address)
      formDataToSend.append("medicalHistory", formData.medicalHistory)
      
      if (selectedFile) {
        formDataToSend.append("profilePicture", selectedFile)
      }

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      })

      if (res.ok) {
        const data = await res.json()
        setProfile((prev) => (prev ? { 
            ...prev, 
            ...data.user, 
            first_name: formData.firstName, 
            last_name: formData.lastName, 
            phone: formData.phone, 
            date_of_birth: formData.dateOfBirth, 
            gender: formData.gender, 
            address: formData.address, 
            medical_history: formData.medicalHistory,
            profile_picture_url: data.user?.profile_picture_url || formData.profilePictureUrl
        } : null))
        setSelectedFile(null)
        setEditing(false)
        // Trigger navbar update
        window.dispatchEvent(new Event("profile-updated"))
      } else {
        alert("Failed to update profile")
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      alert("Error updating profile")
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
                            disabled={uploading}
                            className={`absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg translate-y-1/4 translate-x-1/4 transition-opacity hover:bg-primary/90 ${editing ? "opacity-100" : "opacity-0 hidden"}`}
                        >
                            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
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

                        <div className="p-4 bg-secondary/30 rounded-lg">
                             <div className="flex items-center gap-2 mb-2">
                                 <Activity className="h-5 w-5 text-primary" />
                                 <Label className="text-muted-foreground text-sm">Medical History</Label>
                             </div>
                             <p className="text-foreground mt-2 leading-relaxed whitespace-pre-wrap">
                                {profile?.medical_history || "No medical history recorded."}
                             </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        {/* Edit Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>First Name</Label>
                                <Input
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="bg-background/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name</Label>
                                <Input
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="bg-background/50"
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="bg-background/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Date of Birth</Label>
                                <Input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                    className="bg-background/50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Gender</Label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="w-full bg-background/50 border border-input text-foreground px-3 py-2 text-sm rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="bg-background/50"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Medical History</Label>
                            <Textarea
                                value={formData.medicalHistory}
                                onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                                placeholder="Any relevant medical history, allergies, or chronic conditions..."
                                className="min-h-[120px] bg-background/50 resize-none"
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button onClick={handleSave} disabled={saving} className="shadow-md">
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
                            <Button variant="outline" onClick={() => setEditing(false)}>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </div>
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
