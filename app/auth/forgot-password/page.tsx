"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Loader2, ArrowLeft, Mail, Shield, Lock, Stethoscope } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "@/lib/validations"
import { toast } from "sonner"

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Stethoscope className="text-white h-5 w-5" />
            </div>
            <span className="font-black text-xl tracking-tighter text-foreground">HealthHub</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="gap-2 font-bold">
                <ArrowLeft className="h-4 w-4" /> Back to Login
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Illustration & Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex flex-col justify-center space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Secure Password Reset</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter">
                  Reset Your <span className="text-primary">Password</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                  Don't worry! It happens. Enter your email address and we'll send you a secure link to reset your password.
                </p>
              </div>

              {/* Security Features */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Secure & Encrypted</h3>
                    <p className="text-sm text-muted-foreground">All reset links are encrypted and expire after 30 minutes for your security.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email Verification</h3>
                    <p className="text-sm text-muted-foreground">We'll send instructions to your registered email address only.</p>
                  </div>
                </div>
              </div>

              {/* Illustration Placeholder */}
              <div className="relative h-64 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center mx-auto border-2 border-primary/20">
                      <Shield className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">Secure Password Recovery</p>
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
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-primary">Secure Password Reset</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter mb-3">
                  Forgot <span className="text-primary">Password?</span>
                </h1>
                <p className="text-muted-foreground font-medium">
                  Enter your email to receive a reset link
                </p>
              </div>

              <Card className="border-border/50 shadow-2xl shadow-primary/5 p-8">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center space-y-6"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center border-2 border-green-500/20">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black tracking-tight mb-2">Check Your Email</h3>
                          <p className="text-muted-foreground font-medium">
                            We've sent a password reset link to your email address.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 text-left">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <div className="text-sm space-y-1">
                            <p className="font-bold">Security Note</p>
                            <p className="text-muted-foreground">
                              The reset link will expire in <span className="font-bold text-foreground">30 minutes</span>. 
                              If you don't receive an email, check your spam folder.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button asChild className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
                          <Link href="/auth/login">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleResend}
                          disabled={resendCooldown}
                          className="w-full h-12 text-base font-bold"
                        >
                          {resendCooldown ? "Resend in 30s..." : "Resend Email"}
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
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-bold">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="email"
                            placeholder="Enter your registered email"
                            type="email"
                            {...register("email")}
                            className="h-12 pl-10 text-base bg-background/50"
                          />
                        </div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-destructive font-medium flex items-center gap-1"
                          >
                            <AlertCircle className="h-3 w-3" />
                            {errors.email.message as string}
                          </motion.p>
                        )}
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm font-medium"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {error}
                        </motion.div>
                      )}

                      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <div className="flex items-start gap-3">
                          <Lock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            We'll send a secure link to reset your password. This link expires in <span className="font-bold text-foreground">30 minutes</span>.
                          </p>
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
                            Sending Reset Link...
                          </>
                        ) : (
                          <>
                            <Mail className="h-5 w-5 mr-2" />
                            Send Reset Link
                          </>
                        )}
                      </Button>

                      <div className="text-center pt-4">
                        <p className="text-sm text-muted-foreground">
                          Remember your password?{" "}
                          <Link href="/auth/login" className="font-bold text-primary hover:underline">
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/contact-us" className="hover:text-primary transition-colors">Contact Support</Link>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} HealthHub Digital Healthcare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
