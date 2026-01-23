"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { 
  Loader2, ArrowRight, Lock, Mail, Eye, EyeOff
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validations"
import { toast } from "sonner"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"

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
    <AuthPageLayout
      illustration={{
        imageSrc: "/login-hero.png",
        imageAlt: "Secure Login Illustration",
        title: "Advance Your Health Journey",
        description: "Join thousands of patients and doctors connecting daily on our secure, HIPAA-compliant platform."
      }}
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

      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary font-black hover:underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </AuthPageLayout>
  )
}
