"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, FileText, ArrowLeft, Eye } from "lucide-react"
import { motion } from "framer-motion"

export default function PrivacyPolicy() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white -z-10" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-chart-2/10 rounded-full blur-[120px] -z-10" />

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 glass border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-foreground text-xl tracking-tight">HealthHub</span>
          </Link>
          <div className="flex items-center gap-4">
             <ModeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="font-medium shadow-lg shadow-primary/20">Get Started</Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeIn} className="mb-12 text-center">
             <Link href="/">
              <Button variant="secondary" className="mb-8 group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is our top priority. Learn how we protect your data.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="glass-card border-none">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Data Protection</h3>
                <p className="text-sm text-muted-foreground">Bank-level encryption for all your personal data.</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-none">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Secure Access</h3>
                <p className="text-sm text-muted-foreground">Strict access controls to ensure only you see your data.</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-none">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                   <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">Clear policies on how we use your information.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn} className="prose prose-invert max-w-none glass-card p-8 md:p-12 rounded-3xl">
            <h3>1. Introduction</h3>
            <p className="text-muted-foreground mb-6">
              Welcome to HealthHub. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
            </p>

            <h3>2. Information We Collect</h3>
            <p className="text-muted-foreground mb-6">
              We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services or otherwise when you contact us.
            </p>

            <h3>3. How We Use Your Information</h3>
            <p className="text-muted-foreground mb-6">
              We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>

            <h3>4. Sharing Your Information</h3>
            <p className="text-muted-foreground mb-6">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 glass">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="font-bold text-xl">HealthHub</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="/privacy-policy" className="text-primary font-medium">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} HealthHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
