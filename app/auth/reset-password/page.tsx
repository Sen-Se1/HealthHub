"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters")
        setLoading(false)
        return
    }

    if (!token) {
        setError("Invalid or missing token")
        setLoading(false)
        return
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to reset password")
        return
      }

      setSuccess(true)
      setTimeout(() => {
          router.push("/auth/login")
      }, 2000)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
      return (
          <div className="flex flex-col items-center justify-center space-y-4 text-center p-4">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                   <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div className="space-y-2">
                  <h3 className="font-semibold text-xl">Invalid parameters</h3>
                  <p className="text-muted-foreground">The password reset link is invalid or missing.</p>
              </div>
              <Button asChild variant="default" className="mt-4">
                  <Link href="/auth/login">Back to Login</Link>
              </Button>
          </div>
      )
  }

  return (
    <>
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
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
        
        {success && (
             <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm"
             >
                <CheckCircle2 className="h-4 w-4" />
                <p>Password reset successfully! Redirecting...</p>
             </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              placeholder="Enter new password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-11 text-base shadow-lg shadow-primary/20">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Resetting...
              </>
            ) : (
              <>
                 Reset Password <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </>
  )
}

export default function ResetPasswordPage() {
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
                <Suspense fallback={
                    <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                        Loading...
                    </div>
                }>
                    <ResetPasswordContent />
                </Suspense>
            </Card>
          </motion.div>
        </div>
      )
}
