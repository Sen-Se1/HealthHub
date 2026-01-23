"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { 
  Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowLeft, Shield, ArrowRight, Check, X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { resetPasswordSchema } from "@/lib/validations"
import { toast } from "sonner"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"

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
      <div className="flex flex-col items-center justify-center space-y-6 text-center py-4">
        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center border-2 border-destructive/20">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black tracking-tight">Invalid Reset Link</h3>
          <p className="text-sm text-muted-foreground font-medium">
            The password reset link is invalid, expired, or has already been used.
          </p>
        </div>
        <Button asChild className="w-full h-11 font-bold shadow-lg shadow-primary/20 bg-primary">
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
        className="flex flex-col items-center justify-center space-y-6 text-center py-4"
      >
        <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/20">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-black tracking-tight">Password Updated!</h3>
          <p className="text-sm text-muted-foreground font-medium">
            Your password has been successfully reset. Redirecting to login...
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
          <Loader2 className="h-3.3 w-3.5 animate-spin" />
          <span>Redirecting in 3 seconds...</span>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-bold">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="h-11 pl-10 pr-10 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
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
        
        {errors.password && (
          <p className="text-[10px] text-destructive font-bold flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.password.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-bold">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            className="h-11 pl-10 pr-10 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-[10px] text-destructive font-bold flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.confirmPassword.message as string}
          </p>
        )}
      </div>

      <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-[10px] space-y-2">
        <p className="font-bold">Password must contain:</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            {watchPassword && watchPassword.length >= 8 ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={watchPassword && watchPassword.length >= 8 ? "text-green-600 font-bold" : "text-muted-foreground font-medium"}>
              8+ Characters
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {watchPassword && /\d/.test(watchPassword) ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={watchPassword && /\d/.test(watchPassword) ? "text-green-600 font-bold" : "text-muted-foreground font-medium"}>
              One Number
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {watchPassword && /[^A-Za-z0-9]/.test(watchPassword) ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={watchPassword && /[^A-Za-z0-9]/.test(watchPassword) ? "text-green-600 font-bold" : "text-muted-foreground font-medium"}>
              Special Char
            </span>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 text-base font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Resetting...
          </>
        ) : (
          <>
            Reset Password <ArrowRight className="h-5 w-5 ml-2" />
          </>
        )}
      </Button>

      <div className="text-center">
        <Link href="/auth/login" className="text-sm font-bold text-primary hover:underline underline-offset-4 flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Login
        </Link>
      </div>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <AuthPageLayout
      illustration={{
        imageSrc: "/reset-password-hero.png",
        imageAlt: "Secure Password Reset Illustration",
        title: "Secure Your Account",
        description: "Choose a strong, unique password to keep your HealthHub account secure and protected."
      }}
    >
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-3xl font-black tracking-tighter">New Password</h2>
        <p className="text-muted-foreground font-medium">Create a new secure password</p>
      </div>

      <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-8">
          <Suspense fallback={
            <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
              <span className="font-bold">Loading...</span>
            </div>
          }>
            <ResetPasswordContent />
          </Suspense>
        </CardContent>
      </Card>
    </AuthPageLayout>
  )
}
