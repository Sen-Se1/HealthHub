"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileCheck, AlertCircle, Scale, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function TermsOfService() {
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
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Understanding your rights and responsibilities as a user.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="glass-card border-none">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Agreement</h3>
                <p className="text-sm text-muted-foreground">Using our service constitutes acceptance of these terms.</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-none">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Disclaimers</h3>
                <p className="text-sm text-muted-foreground">Important limitations on our liability and warranties.</p>
              </CardContent>
            </Card>
            <Card className="glass-card border-none">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                   <Scale className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Governing Law</h3>
                <p className="text-sm text-muted-foreground">These terms are governed by the laws of your jurisdiction.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn} className="prose prose-invert max-w-none glass-card p-8 md:p-12 rounded-3xl">
            <h3>1. Agreement to Terms</h3>
            <p className="text-muted-foreground mb-6">
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and HealthHub, concerning your access to and use of the HealthHub website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>

            <h3>2. Intellectual Property Rights</h3>
            <p className="text-muted-foreground mb-6">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>

            <h3>3. User Representations</h3>
            <p className="text-muted-foreground mb-6">
              By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
            </p>

            <h3>4. Prohibited Activities</h3>
            <p className="text-muted-foreground mb-6">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
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
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-primary font-medium">Terms of Service</Link>
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
