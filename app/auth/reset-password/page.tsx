"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowLeft, Shield, Key, Stethoscope, Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema } from "@/lib/validations"
import { toast } from "sonner"

// Password strength calculator
function calculatePasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0
  
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  if (score <= 2) return { score, label: "Weak", color: "text-red-500" }
  if (score <= 3) return { score, label: "Fair", color: "text-orange-500" }
  if (score <= 4) return { score, label: "Good", color: "text-yellow-500" }
  return { score, label: "Strong", color: "text-green-500" }
}

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || "",
      password: "",
      confirmPassword: ""
    }
  })

  const watchPassword = watch("password")
  const passwordStrength = watchPassword ? calculatePasswordStrength(watchPassword) : null

  const onSubmit = async (values: any) => {
    setLoading(true)

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: values.token, password: values.password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed to reset password")
        return
      }

      setSuccess(true)
      toast.success("Password reset successfully!", {
        description: "You can now log in with your new password."
      })
      
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    } catch (err) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center p-8">
        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center border-2 border-destructive/20">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight">Invalid Reset Link</h3>
          <p className="text-muted-foreground font-medium">
            The password reset link is invalid, expired, or has already been used.
          </p>
        </div>
        <Button asChild className="h-12 px-6 font-bold shadow-lg shadow-primary/20">
          <Link href="/auth/forgot-password">Request New Link</Link>
        </Button>
      </div>
    )
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center space-y-6 text-center p-8"
      >
        <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/20">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight">Password Updated!</h3>
          <p className="text-muted-foreground font-medium">
            Your password has been successfully reset. Redirecting to login...
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Redirecting in 3 seconds...</span>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black tracking-tight">Reset Your Password</h2>
        <p className="text-muted-foreground font-medium">
          Enter your new password below to secure your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-base font-bold">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              placeholder="Enter your new password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              onChange={(e) => {
                register("password").onChange(e)
                setPassword(e.target.value)
              }}
              className="h-12 pl-10 pr-10 text-base bg-background/50"
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
                <span className={`text-sm font-bold ${passwordStrength!.color}`}>
                  {passwordStrength!.label}
                </span>
              </div>
            </motion.div>
          )}
          
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive font-medium flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              {errors.password.message as string}
            </motion.p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-base font-bold">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              placeholder="Re-enter your password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="h-12 pl-10 pr-10 text-base bg-background/50"
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
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive font-medium flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              {errors.confirmPassword.message as string}
            </motion.p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
          <p className="text-sm font-bold mb-3">Password must contain:</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              {watchPassword && watchPassword.length >= 8 ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground" />
              )}
              <span className={watchPassword && watchPassword.length >= 8 ? "text-green-600 font-medium" : "text-muted-foreground"}>
                At least 8 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              {watchPassword && /\d/.test(watchPassword) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground" />
              )}
              <span className={watchPassword && /\d/.test(watchPassword) ? "text-green-600 font-medium" : "text-muted-foreground"}>
                At least one number
              </span>
            </div>
            <div className="flex items-center gap-2">
              {watchPassword && /[^A-Za-z0-9]/.test(watchPassword) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground" />
              )}
              <span className={watchPassword && /[^A-Za-z0-9]/.test(watchPassword) ? "text-green-600 font-medium" : "text-muted-foreground"}>
                At least one special character
              </span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Resetting Password...
            </>
          ) : (
            <>
              <Shield className="h-5 w-5 mr-2" />
              Reset Password
            </>
          )}
        </Button>

        <div className="text-center pt-2">
          <Link href="/auth/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
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
                  <Key className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Secure Password Reset</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter">
                  Create a <span className="text-primary">New Password</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                  Choose a strong, unique password to keep your HealthHub account secure and protected.
                </p>
              </div>

              {/* Security Tips */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Strong & Unique</h3>
                    <p className="text-sm text-muted-foreground">Use a combination of letters, numbers, and special characters for maximum security.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Lock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Never Reuse Passwords</h3>
                    <p className="text-sm text-muted-foreground">Make sure this password is unique and not used on other platforms.</p>
                  </div>
                </div>
              </div>

              {/* Illustration Placeholder */}
              <div className="relative h-64 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center mx-auto border-2 border-primary/20">
                      <Key className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">Secure Password Update</p>
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
                  <Key className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Secure Password Reset</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter mb-3">
                  Reset <span className="text-primary">Password</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                  Create a new secure password for your account
                </p>
              </div>

              <Card className="border-border/50 shadow-2xl shadow-primary/5">
                <Suspense fallback={
                  <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                    <span className="font-medium">Loading...</span>
                  </div>
                }>
                  <ResetPasswordContent />
                </Suspense>
              </Card>
            </motion.div>
          </div>
      </div>
    </div>
  )
}
