"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { User, Mail, Phone, Calendar, Save, FileText, Loader2, Edit2, Activity, Camera, ShieldCheck, CreditCard, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientProfileSchema } from "@/lib/validations"
import { toast } from "sonner"
import { PhoneInput } from "@/components/ui/phone-input"

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

export function ProfileSkeleton() {
    return (
        <div className="max-w-5xl mx-auto space-y-10">
            <Skeleton className="h-48 w-full rounded-4xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Skeleton className="h-[400px] rounded-4xl md:col-span-1" />
                <Skeleton className="h-[400px] rounded-4xl md:col-span-2" />
            </div>
        </div>
    )
}

export default function ProfileContent() {
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

            if (selectedFile) formDataToSend.append("profilePicture", selectedFile)

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
                toast.success("Profile saved successfully")
                window.dispatchEvent(new Event("profile-updated"))
            } else {
                const errorData = await res.json()
                toast.error(errorData.error || "Update failed")
            }
        } catch (err) {
            console.error("Error updating profile:", err)
            toast.error("An error occurred")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <ProfileSkeleton />

    return (
        <div className="max-w-6xl mx-auto">
            {/* Premium Header Profile Card */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <Card className="glass-card border border-border/50 shadow-2xl rounded-4xl overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-primary/20 via-primary/10 to-transparent" />
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

                    <CardContent className="relative pt-12 px-8 sm:px-12 pb-12">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
                            <div className="relative group/avatar">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="h-40 w-40 rounded-3xl bg-background shadow-2xl flex items-center justify-center border-4 border-white/50 backdrop-blur-md overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 relative z-10">
                                            {profile?.profile_picture_url ? (
                                                <img src={profile.profile_picture_url} alt="Profile" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                                                    <User className="h-16 w-16 text-primary" />
                                                </div>
                                            )}
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl bg-transparent border-none p-0 shadow-none">
                                        {profile?.profile_picture_url && (
                                            <img src={profile.profile_picture_url} alt="Profile" className="w-full h-auto rounded-4xl shadow-2xl" />
                                        )}
                                    </DialogContent>
                                </Dialog>

                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-4 right-4 p-3 bg-primary text-primary-foreground rounded-2xl shadow-xl z-20 border-2 border-background"
                                >
                                    <Camera className="h-5 w-5" />
                                </motion.button>
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                        <h1 className="text-4xl font-black text-foreground tracking-tight">
                                            {profile?.first_name} {profile?.last_name}
                                        </h1>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20 self-center md:self-auto">
                                            <ShieldCheck className="h-3 w-3" /> Verified Patient
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                                        <Mail className="h-4 w-4" /> {profile?.email}
                                    </p>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="px-5 py-3 bg-secondary/30 rounded-2xl border border-border/50 text-sm font-bold flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" /> {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Birthday not set"}
                                    </div>
                                    {profile?.phone && (
                                        <div className="px-5 py-3 bg-secondary/30 rounded-2xl border border-border/50 text-sm font-bold flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-primary" /> {profile.phone}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Quick Stats/Side Info */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <Card className="glass-card border border-border/50 rounded-4xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" /> Health Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 bg-primary/5 rounded-3xl border border-primary/10 flex items-center justify-between">
                                <span className="text-sm font-bold opacity-70">Blood Type</span>
                                <span className="text-lg font-black text-primary">O+</span>
                            </div>
                            <div className="p-4 bg-accent/5 rounded-3xl border border-accent/10 flex items-center justify-between">
                                <span className="text-sm font-bold opacity-70">Apt. Status</span>
                                <span className="text-lg font-black text-accent">Healthy</span>
                            </div>
                            <div className="h-px bg-border/50" />
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-[0.2em] block">Medical History</Label>
                                <p className="text-sm font-medium leading-relaxed italic text-muted-foreground/80 bg-secondary/20 p-6 rounded-3xl border border-border/30">
                                    {profile?.medical_history || "No medical history recorded. Complete your profile for better care."}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start h-14 rounded-2xl px-6 font-bold gap-4 group hover:bg-primary/5 hover:border-primary/30">
                            <CreditCard className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" /> Billing & Insurance
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-14 rounded-2xl px-6 font-bold gap-4 group hover:bg-accent/5 hover:border-accent/30">
                            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" /> Notification Prefs
                        </Button>
                    </div>
                </motion.div>

                {/* Main Edit Form/Details */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
                    <Card className="glass-card border border-border/50 rounded-4xl shadow-2xl min-h-[600px]">
                        <CardHeader className="p-10 border-b border-border/50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-black tracking-tight">Personal Details</CardTitle>
                                <CardDescription className="text-base font-medium">Update your profile for personalized healthcare.</CardDescription>
                            </div>
                            {!editing && (
                                <Button onClick={() => setEditing(true)} className="rounded-2xl shadow-lg bg-primary hover:bg-primary/90">
                                    <Edit2 className="h-4 w-4 mr-2" /> Edit Info
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="p-10">
                            <AnimatePresence mode="wait">
                                {!editing ? (
                                    <motion.div
                                        key="view"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="grid gap-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest px-1">First Name</Label>
                                                <div className="h-14 bg-secondary/20 border border-border/50 rounded-2xl flex items-center px-6 font-black text-foreground">{profile?.first_name}</div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest px-1">Last Name</Label>
                                                <div className="h-14 bg-secondary/20 border border-border/50 rounded-2xl flex items-center px-6 font-black text-foreground">{profile?.last_name}</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest px-1">Phone Number</Label>
                                                <div className="h-14 bg-secondary/20 border border-border/50 rounded-2xl flex items-center px-6 font-black text-foreground">{profile?.phone || "Not provided"}</div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest px-1">Gender Identity</Label>
                                                <div className="h-14 bg-secondary/20 border border-border/50 rounded-2xl flex items-center px-6 font-black text-foreground capitalize">{profile?.gender || "Not specified"}</div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest px-1">Residential Address</Label>
                                            <div className="min-h-14 py-4 bg-secondary/20 border border-border/50 rounded-2xl flex items-center px-6 font-bold text-foreground leading-relaxed">
                                                {profile?.address || "No address provided yet."}
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-border/50">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                                    <FileText className="h-5 w-5 text-primary" />
                                                </div>
                                                <h3 className="text-xl font-black">Medical Documentation</h3>
                                            </div>
                                            <p className="text-sm font-medium text-muted-foreground italic bg-secondary/10 p-6 rounded-3xl border border-dashed border-border/50">
                                                Your medical records are stored securely and only accessible by healthcare professionals during your appointments.
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="edit"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="font-bold px-1">First Name</Label>
                                                <Input id="firstName" {...register("firstName")} className="h-12 bg-background border-border/50 rounded-xl text-lg font-medium" />
                                                {errors.firstName && <p className="text-xs text-destructive font-bold">{errors.firstName.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="font-bold px-1">Last Name</Label>
                                                <Input id="lastName" {...register("lastName")} className="h-12 bg-background border-border/50 rounded-xl text-lg font-medium" />
                                                {errors.lastName && <p className="text-xs text-destructive font-bold">{errors.lastName.message}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="font-bold px-1">Phone Number</Label>
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <PhoneInput value={field.value} onChange={field.onChange} disabled={saving} />
                                                    )}
                                                />
                                                {errors.phone && <p className="text-xs text-destructive font-bold">{errors.phone.message as string}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="dateOfBirth" className="font-bold px-1">Date of Birth</Label>
                                                <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} className="h-12 bg-background border-border/50 rounded-xl font-medium" />
                                                {errors.dateOfBirth && <p className="text-xs text-destructive font-bold">{errors.dateOfBirth.message}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="gender" className="font-bold px-1">Gender</Label>
                                                <select
                                                    id="gender"
                                                    {...register("gender")}
                                                    className="w-full h-12 bg-background border border-border/50 text-foreground px-4 text-sm rounded-xl font-medium focus:ring-2 focus:ring-primary/20 outline-hidden"
                                                >
                                                    <option value="">Select gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="address" className="font-bold px-1">Address</Label>
                                                <Input id="address" {...register("address")} className="h-12 bg-background border-border/50 rounded-xl font-medium" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="medicalHistory" className="font-bold px-1">Medical History</Label>
                                            <Textarea
                                                id="medicalHistory"
                                                {...register("medicalHistory")}
                                                placeholder="Specify allergies, chronic conditions, or medications..."
                                                className="min-h-[160px] bg-background border-border/50 rounded-2xl p-6 font-medium leading-relaxed italic"
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            <Button type="submit" disabled={saving} className="h-14 px-10 rounded-2xl shadow-xl bg-primary hover:bg-primary/90 font-black tracking-tight">
                                                {saving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                                                {saving ? "SAVING..." : "SAVE PROFILE"}
                                            </Button>
                                            <Button variant="ghost" type="button" onClick={() => setEditing(false)} className="h-14 px-8 rounded-2xl font-bold">
                                                CANCEL
                                            </Button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
