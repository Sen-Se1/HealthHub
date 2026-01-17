"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Stethoscope, Loader2, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "patient",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed")
        return
      }

      router.push(formData.role === "patient" ? "/patient/dashboard" : "/doctor/dashboard")
    } catch (err) {
      setError("An error occurred during registration")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Navigation */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Home
          </Button>
        </Link>
      </div>
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white -z-10" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-chart-2/10 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-bold">H</span>
          </div>
          <span className="font-semibold text-foreground text-2xl">HealthHub</span>
        </div>

        <Card className="glass-card border-border/50">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Join HealthHub to manage your healthcare</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                {error}
              </motion.div>
            )}

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => handleRoleChange("patient")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  formData.role === "patient" 
                    ? "border-primary bg-primary/10 shadow-inner" 
                    : "border-border/50 hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <User
                  className={`h-8 w-8 mx-auto mb-2 ${formData.role === "patient" ? "text-primary" : "text-muted-foreground"}`}
                />
                <p className={`font-semibold ${formData.role === "patient" ? "text-primary" : "text-foreground"}`}>
                  Patient
                </p>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("doctor")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                  formData.role === "doctor" 
                    ? "border-primary bg-primary/10 shadow-inner" 
                    : "border-border/50 hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <Stethoscope
                  className={`h-8 w-8 mx-auto mb-2 ${formData.role === "doctor" ? "text-primary" : "text-muted-foreground"}`}
                />
                <p className={`font-semibold ${formData.role === "doctor" ? "text-primary" : "text-foreground"}`}>
                  Doctor
                </p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                   className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                   className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                   className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                   className="bg-background/50"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 text-base shadow-lg shadow-primary/20">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account <ArrowRight className="h-4 w-4 ml-2" />
                  </>   
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
