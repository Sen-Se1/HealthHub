"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { 
  AlertCircle, Loader2, ArrowRight, ArrowLeft, Lock, Mail, Eye, EyeOff, 
  ShieldCheck, CheckCircle2, Stethoscope
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validations"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Login failed")
        return
      }

      toast.success("Welcome back!", {
        description: `Logged in as ${data.user.firstName} ${data.user.lastName}`,
      })

      // Token is now handled via HttpOnly cookie set by the server
      router.push(data.user.role === "patient" ? "/patient/dashboard" : "/doctor/dashboard")
    } catch (err) {
      toast.error("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Illustration (Desktop Only) */}
        <div className="hidden lg:flex flex-[0.8] bg-muted/30 relative items-center justify-center p-12 overflow-hidden border-r border-border/40">
          <div className="absolute inset-0 bg-grid-white opacity-40" aria-hidden="true" />
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" aria-hidden="true" />
          
          <div className="relative z-10 max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative mb-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/20 aspect-video glass-card">
                <Image 
                  src="/clinic-illustration.png" 
                  alt="HealthHub Clinic Illustration" 
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent" />
              </div>
              <h1 className="text-3xl font-black tracking-tighter mb-4">Advance Your Health Journey</h1>
              <p className="text-base text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">Join thousands of patients and doctors connecting daily on our secure, HIPAA-compliant platform.</p>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-4 border-background bg-muted overflow-hidden">
                    <Image 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} 
                      alt="User avatar" 
                      width={48} 
                      height={48} 
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-primary flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Trusted by 50,000+ users worldwide
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:bg-background">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md space-y-8"
          >
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-black tracking-tighter">Welcome Back</h2>
              <p className="text-muted-foreground font-medium">Log in to HealthHub securely</p>
            </div>

            <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-8 space-y-6">

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-bold text-sm">Email or Phone</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="john@example.com"
                        type="email"
                        {...register("email")}
                        className="pl-11 h-11 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-destructive font-bold">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="font-bold text-sm">Password</Label>
                      <Link href="/auth/forgot-password" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="pl-11 pr-11 h-11 bg-background/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive font-bold">{errors.password.message}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="rounded-sm border-primary/30 data-[state=checked]:bg-primary" />
                    <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      Remember me for 30 days
                    </label>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-12 text-base font-black bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Sign In <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary font-black hover:underline underline-offset-4">
                  Create an account
                </Link>
              </p>
              
              <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest font-black text-muted-foreground/50 border-t border-border/40 pt-6">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3" /> HIPAA Compliant</span>
                <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> 256-bit AES</span>
              </div>
            </div>
            </motion.div>
      </div>
    </div>
  )
}
