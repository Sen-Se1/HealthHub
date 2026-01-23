"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { 
  AlertCircle, CheckCircle, Loader2, ArrowLeft, Mail, Shield, Lock, ArrowRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "@/lib/validations"
import { toast } from "sonner"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(false)

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (values: any) => {
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (!res.ok) {
        const errorMsg = data.error || "Failed to send reset link"
        setError(errorMsg)
        toast.error(errorMsg)
        return
      }

      setSuccess(true)
      toast.success("Reset link sent!", {
        description: "Please check your inbox for instructions."
      })
    } catch (err) {
      const errorMsg = "An error occurred. Please try again."
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendCooldown) return
    
    setResendCooldown(true)
    const email = getValues("email")
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        toast.success("Reset link resent!", {
          description: "Please check your inbox."
        })
      }
    } catch (err) {
      toast.error("Failed to resend link")
    }

    setTimeout(() => setResendCooldown(false), 30000) // 30 second cooldown
  }

  return (
    <AuthPageLayout
      illustration={{
        imageSrc: "/forgot-password-hero.png",
        imageAlt: "Secure Password Reset Illustration",
        title: "Reset Your Password",
        description: "Don't worry! It happens. Enter your email address and we'll send you a secure link to reset your password."
      }}
    >
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-3xl font-black tracking-tighter">Forgot Password</h2>
        <p className="text-muted-foreground font-medium">Enter your email to receive a reset link</p>
      </div>

      <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-8">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/20">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground font-medium mt-1">
                      We've sent a password reset link to your email address.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="text-xs space-y-1">
                      <p className="font-bold">Security Note</p>
                      <p className="text-muted-foreground">
                        The reset link will expire in <span className="font-bold text-foreground">30 minutes</span>. 
                        If you don't receive an email, check your spam folder.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={handleResend}
                    disabled={resendCooldown}
                    className="w-full h-11 text-sm font-bold active:scale-95 transition-all"
                  >
                    {resendCooldown ? "Resend in 30s..." : "Resend Email"}
                  </Button>
                  <Button asChild className="w-full h-11 text-sm font-bold bg-primary active:scale-95 transition-all">
                    <Link href="/auth/login">
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="john@example.com"
                      type="email"
                      {...register("email")}
                      className="h-11 pl-10 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[10px] text-destructive font-bold flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive px-3 py-2 rounded-lg text-[10px] font-bold">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      We'll send a secure link to reset your password. This link expires in <span className="font-bold text-foreground">30 minutes</span>.
                    </p>
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link href="/auth/login" className="text-sm font-bold text-primary hover:underline underline-offset-4 flex items-center justify-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Login
                  </Link>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </AuthPageLayout>
  )
}
