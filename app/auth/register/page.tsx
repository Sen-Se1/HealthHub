"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { 
  User, Mail, Lock, Stethoscope, Loader2, ArrowLeft, Eye, EyeOff,
  UserPlus, Shield, Check, X, Phone, Calendar, MapPin
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/validations"
import { toast } from "sonner"
import { z } from "zod"
import { PhoneInput } from "@/components/ui/phone-input"

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
    <div className="flex-1">

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex flex-col justify-center space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <UserPlus className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Join HealthHub</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter">
                  Create Your <span className="text-primary">Account</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                  Join HealthHub to manage your healthcare easily. Whether you're a patient or a healthcare provider, we've got you covered.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Secure & Private</h3>
                    <p className="text-sm text-muted-foreground">Your health data is encrypted and protected with industry-standard security.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Easy Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Book appointments with top healthcare providers in just a few clicks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Professional Care</h3>
                    <p className="text-sm text-muted-foreground">Connect with verified doctors and healthcare professionals.</p>
                  </div>
                </div>
              </div>

              {/* Illustration Placeholder */}
              <div className="relative h-64 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center mx-auto border-2 border-primary/20">
                      <UserPlus className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">Join Our Healthcare Community</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              {/* Mobile Header */}
              <div className="lg:hidden mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <UserPlus className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Join HealthHub</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter mb-3">
                  Create <span className="text-primary">Account</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                  Start managing your healthcare today
                </p>
              </div>

              <Card className="border-border/50 shadow-2xl shadow-primary/5 p-8">
                {/* Role Selection */}
                <div className="mb-8">
                  <Label className="text-base font-bold mb-4 block">I am a...</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleRoleChange("patient")}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                        currentRole === "patient" 
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10" 
                          : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <User
                        className={`h-10 w-10 mx-auto mb-3 ${currentRole === "patient" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <p className={`font-bold text-lg ${currentRole === "patient" ? "text-primary" : "text-foreground"}`}>
                        Patient
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Book appointments</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleChange("doctor")}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                        currentRole === "doctor" 
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10" 
                          : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <Stethoscope
                        className={`h-10 w-10 mx-auto mb-3 ${currentRole === "doctor" ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <p className={`font-bold text-lg ${currentRole === "doctor" ? "text-primary" : "text-foreground"}`}>
                        Doctor
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Manage patients</p>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-bold">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...register("firstName")}
                        className="h-11 bg-background/50"
                      />
                      {errors.firstName && (
                        <p className="text-xs text-destructive font-medium flex items-center gap-1">
                          <X className="h-3 w-3" />
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-bold">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        {...register("lastName")}
                        className="h-11 bg-background/50"
                      />
                      {errors.lastName && (
                        <p className="text-xs text-destructive font-medium flex items-center gap-1">
                          <X className="h-3 w-3" />
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-bold">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        {...register("email")}
                        className="h-11 pl-10 bg-background/50"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-destructive font-medium flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-bold">
                      Phone Number <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
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
                    {errors.phone && (
                      <p className="text-xs text-destructive font-medium flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.phone.message as string}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-bold">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 6 characters"
                        {...register("password")}
                        className="h-11 pl-10 pr-10 bg-background/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {watchPassword && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
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
                          <span className={`text-xs font-bold ${passwordStrength!.color}`}>
                            {passwordStrength!.label}
                          </span>
                        </div>
                      </motion.div>
                    )}
                    
                    {errors.password && (
                      <p className="text-xs text-destructive font-medium flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-bold">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        {...register("confirmPassword")}
                        className="h-11 pl-10 pr-10 bg-background/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive font-medium flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.confirmPassword.message as string}
                      </p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms-of-service" className="text-primary hover:underline font-bold">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-primary hover:underline font-bold">
                      Privacy Policy
                    </Link>
                    .
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link href="/auth/login" className="font-bold text-primary hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  )
}
