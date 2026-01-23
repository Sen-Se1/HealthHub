"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { 
  Loader2, ArrowRight, Lock, Mail, Eye, EyeOff, User, Stethoscope, UserPlus, X
} from "lucide-react"
import { motion } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/validations"
import { toast } from "sonner"
import { z } from "zod"
import { PhoneInput } from "@/components/ui/phone-input"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"

// Password strength calculator
function calculatePasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  if (score <= 2) return { score, label: "Weak", color: "text-red-500" }
  if (score <= 3) return { score, label: "Fair", color: "text-orange-500" }
  if (score <= 4) return { score, label: "Good", color: "text-yellow-500" }
  return { score, label: "Strong", color: "text-green-500" }
}

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    setValue,
    watch,
    control,
    formState: { errors } 
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "patient",
    }
  })

  const currentRole = watch("role")
  const watchPassword = watch("password")
  const passwordStrength = watchPassword ? calculatePasswordStrength(watchPassword) : null

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const responseData = await res.json()

      if (!res.ok) {
        toast.error(responseData.error || "Registration failed")
        return
      }

      toast.success("Account created successfully!", {
        description: "Welcome to HealthHub.",
      })

      router.push(data.role === "patient" ? "/patient/dashboard" : "/doctor/dashboard")
    } catch (err) {
      toast.error("An error occurred during registration")
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = (role: "patient" | "doctor") => {
    setValue("role", role)
  }

  return (
    <AuthPageLayout
      illustration={{
        imageSrc: "/register-hero.png",
        imageAlt: "Join HealthHub Illustration",
        title: "Start Your Health Journey",
        description: "Join our community of healthcare professionals and patients. Secure, simple, and professional."
      }}
    >
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-3xl font-black tracking-tighter">Create Account</h2>
        <p className="text-muted-foreground font-medium">Join HealthHub today</p>
      </div>

      <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-8 space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-bold">I am a...</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleChange("patient")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  currentRole === "patient" 
                    ? "border-primary bg-primary/10" 
                    : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <User className={`h-6 w-6 mb-2 ${currentRole === "patient" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-bold ${currentRole === "patient" ? "text-primary" : "text-foreground"}`}>Patient</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("doctor")}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  currentRole === "doctor" 
                    ? "border-primary bg-primary/10" 
                    : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <Stethoscope className={`h-6 w-6 mb-2 ${currentRole === "doctor" ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-bold ${currentRole === "doctor" ? "text-primary" : "text-foreground"}`}>Doctor</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-bold">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                  className="h-11 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
                {errors.firstName && <p className="text-[10px] text-destructive font-bold">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-bold">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  className="h-11 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
                {errors.lastName && <p className="text-[10px] text-destructive font-bold">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className="pl-11 h-11 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
              </div>
              {errors.email && <p className="text-[10px] text-destructive font-bold">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold">Phone (optional)</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                    placeholder="Enter phone number"
                  />
                )}
              />
              {errors.phone && <p className="text-[10px] text-destructive font-bold">{errors.phone.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="pl-11 pr-11 h-11 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {watchPassword && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength!.score / 5) * 100}%` }}
                        className={`h-full ${
                          passwordStrength!.score <= 2 ? "bg-red-500" :
                          passwordStrength!.score <= 3 ? "bg-orange-500" :
                          passwordStrength!.score <= 4 ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                      />
                    </div>
                    <span className={`text-[10px] font-bold ${passwordStrength!.color}`}>
                      {passwordStrength!.label}
                    </span>
                  </div>
                </div>
              )}
              {errors.password && <p className="text-[10px] text-destructive font-bold">{errors.password.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-bold">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="pl-11 pr-11 h-11 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-destructive font-bold">{errors.confirmPassword.message as string}</p>}
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-base font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="text-center pt-2">
        <p className="text-sm font-medium text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-black hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </AuthPageLayout>
  )
}
