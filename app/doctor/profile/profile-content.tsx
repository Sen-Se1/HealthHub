"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Upload, FileText, CheckCircle, AlertCircle, Save, X, User, Briefcase, GraduationCap, Clock, Camera, Loader2, Mail, Eye, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface DoctorProfile {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  specialization: string
  qualification: string
  experience_years: number
  bio: string
  is_approved: boolean
  cv_url: string
  profile_picture_url?: string
}

export default function DoctorProfileContent() {
  const router = useRouter()
  const [profile, setProfile] = useState<DoctorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingPic, setUploadingPic] = useState(false)
  const [editing, setEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const picInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    specialization: "",
    qualification: "",
    experienceYears: "",
    bio: "",
    cvUrl: "",
    profilePictureUrl: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken")
      if (!token) {
        router.push("/auth/login")
        return
      }

      try {
        const res = await fetch("/api/doctor/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
          const data = await res.json()
          setProfile(data.doctor)
          setFormData({
            specialization: data.doctor.specialization || "",
            qualification: data.doctor.qualification || "",
            experienceYears: data.doctor.experience_years?.toString() || "",
            bio: data.doctor.bio || "",
            cvUrl: data.doctor.cv_url || "",
            profilePictureUrl: data.doctor.profile_picture_url || "",
          })
        }
      } catch (err) {
        console.error("[v0] Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingPic(true)
    const token = localStorage.getItem("authToken")

    try {
        const formDataUpload = new FormData()
        formDataUpload.append("file", file)
        formDataUpload.append("type", "profile")

        const res = await fetch("/api/upload", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formDataUpload,
        })

        if (res.ok) {
            const data = await res.json()
            setFormData(prev => ({ ...prev, profilePictureUrl: data.url }))
            setProfile(prev => prev ? { ...prev, profile_picture_url: data.url } : null)
        } else {
            alert("Failed to upload profile picture")
        }
    } catch (err) {
        console.error("Error uploading profile picture:", err)
        alert("Error uploading profile picture")
    } finally {
        setUploadingPic(false)
    }
  }

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    setUploading(true)
    const token = localStorage.getItem("authToken")

    try {
      const formDataUpload = new FormData()
      formDataUpload.append("file", file)
      formDataUpload.append("type", "cv")

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData((prev) => ({ ...prev, cvUrl: data.url }))
      } else {
        alert("Failed to upload CV")
      }
    } catch (err) {
      console.error("[v0] Error uploading CV:", err)
      alert("Error uploading CV")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    const token = localStorage.getItem("authToken")
    setSaving(true)

    try {
      const res = await fetch("/api/doctor/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          specialization: formData.specialization,
          qualification: formData.qualification,
          experienceYears: Number.parseInt(formData.experienceYears) || 0,
          bio: formData.bio,
          cvUrl: formData.cvUrl,
          profilePictureUrl: formData.profilePictureUrl,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setProfile((prev) => (prev ? { ...prev, ...data.doctor, profile_picture_url: formData.profilePictureUrl } : null))
        setEditing(false)
      } else {
        alert("Failed to save profile")
      }
    } catch (err) {
      console.error("[v0] Error saving profile:", err)
      alert("Error saving profile")
    } finally {
      setSaving(false)
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate" className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Doctor Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your professional information</p>
      </div>

      {profile && (
        <div className="grid gap-6">
            {/* Status Card */}
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
                                    {profile.profile_picture_url ? (
                                        <img src={profile.profile_picture_url} alt="Profile" className="h-full w-full object-cover rounded-xl" />
                                    ) : (
                                        <div className="h-full w-full bg-primary/10 rounded-xl flex items-center justify-center">
                                            <User className="h-10 w-10 text-primary" />
                                        </div>
                                    )}
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-md p-0 overflow-hidden bg-transparent border-none shadow-none">
                                {profile.profile_picture_url && (
                                    <img src={profile.profile_picture_url} alt="Profile Preview" className="w-full h-auto rounded-xl shadow-2xl" />
                                )}
                            </DialogContent>
                        </Dialog>
                        <input 
                            type="file" 
                            ref={picInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                        />
                        <button 
                            onClick={() => picInputRef.current?.click()}
                            disabled={uploadingPic}
                            className={`absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg translate-y-1/4 translate-x-1/4 transition-opacity hover:bg-primary/90 ${editing ? "opacity-100" : "opacity-0 hidden"}`}
                        >
                            {uploadingPic ? <Loader2 className="h-3 w-3 animate-spin" /> : <Camera className="h-3 w-3" />}
                        </button>
                     </div>
                     
                     <div className="flex-1 space-y-1 pb-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">
                                    Dr. {profile.first_name} {profile.last_name}
                                </h2>
                                <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="h-3.5 w-3.5" /> {profile.email}
                                    </span>
                                </div>
                            </div>
                            <Badge
                                variant={profile.is_approved ? "default" : "outline"}
                                className={`px-3 py-1 text-sm ${profile.is_approved ? "bg-primary hover:bg-primary/90" : "text-yellow-600 bg-yellow-500/10 border-yellow-200"}`}
                            >
                                {profile.is_approved ? (
                                    <span className="flex items-center gap-1.5">
                                    <CheckCircle className="h-3.5 w-3.5" /> Approved
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5">
                                    <AlertCircle className="h-3.5 w-3.5" /> Pending Approval
                                    </span>
                                )}
                            </Badge>
                        </div>
                     </div>
                </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="glass-card border-border">
            <CardHeader className="border-b border-border/50 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Professional Information</CardTitle>
                  <CardDescription>Update your specialization, qualifications, and bio</CardDescription>
                </div>
                {!editing && (
                  <Button onClick={() => setEditing(true)} variant="outline" className="shadow-sm">
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {!editing ? (
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                      <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <Label className="text-muted-foreground text-sm">Specialization</Label>
                        <p className="text-foreground font-medium mt-1 text-lg">{profile.specialization || "Not set"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <Label className="text-muted-foreground text-sm">Years of Experience</Label>
                            <p className="text-foreground font-medium mt-1 text-lg">{profile.experience_years ? `${profile.experience_years} Years` : "Not set"}</p>
                        </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                        <Label className="text-muted-foreground text-sm">Qualification</Label>
                        <p className="text-foreground font-medium mt-1">{profile.qualification || "Not set"}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                     <div className="flex items-center gap-2 mb-2">
                         <FileText className="h-5 w-5 text-primary" />
                         <Label className="text-muted-foreground text-sm">Bio</Label>
                     </div>
                    <p className="text-foreground mt-2 leading-relaxed">{profile.bio || "No biography provided yet."}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="e.g., Cardiology, Pediatrics"
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experienceYears">Years of Experience</Label>
                      <Input
                        id="experienceYears"
                        name="experienceYears"
                        type="number"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        placeholder="e.g., 10"
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="e.g., MD, MBBS, PhD"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Write a brief description about yourself..."
                      rows={4}
                      className="bg-background/50 resize-none"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSave} disabled={saving} className="shadow-md">
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Saving..." : "Save Changes"}
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

          {/* CV Upload Card */}
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                CV / Resume
              </CardTitle>
              <CardDescription>Upload your CV for verification (PDF or Word, max 5MB)</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleCVUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />

              {formData.cvUrl ? (
                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <FileText className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">CV Uploaded</p>
                      <p className="text-sm text-muted-foreground">Ready for review</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
                      <a href={formData.cvUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View CV
                      </a>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2"
                    >
                      {uploading ? (
                          <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                          </>
                      ) : (
                          <>
                              <RefreshCw className="h-4 w-4" /> Replace
                          </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <p className="text-foreground font-medium">
                    {uploading ? "Uploading..." : "Click to upload your CV"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">PDF or Word document, max 5MB</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  )
}
