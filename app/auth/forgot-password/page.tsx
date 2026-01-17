"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Loader2, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to send reset link")
        return
      }

      setSuccess(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
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
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link</CardDescription>
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

            {success ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-green-600 bg-green-500/10 p-6 rounded-xl border border-green-500/20">
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                     <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Reset link sent!</h3>
                  <p className="text-sm">Check your inbox for further instructions.</p>
                </div>
                <p className="text-sm text-muted-foreground px-4">
                  If an account exists with this email, you will receive an email shortly.
                </p>
                <Button asChild className="w-full mt-4 h-11 text-base shadow-lg shadow-primary/20">
                  <Link href="/auth/login">Back to Login</Link>
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/50 h-11"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full h-11 text-base shadow-lg shadow-primary/20">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <div className="text-center mt-6">
                  <Link href="/auth/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
