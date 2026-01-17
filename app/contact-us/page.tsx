"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, Send, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactUs() {
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
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeIn} className="mb-12 text-center">
            <Link href="/">
              <Button variant="secondary" className="mb-8 group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground w-full max-w-2xl mx-auto">
              We're here to help. Reach out to us for any questions or support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeIn} className="space-y-8">
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <p className="text-muted-foreground">support@healthhub.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Office</h4>
                      <p className="text-muted-foreground">
                        123 Health Street<br />
                        Medical District<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl bg-primary/5 border-primary/20">
                <h3 className="text-xl font-bold mb-2">Office Hours</h3>
                <p className="text-muted-foreground mb-4">
                  Our support team is available during the following hours:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="glass-card border-none h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..." 
                        className="min-h-[150px]"
                      />
                    </div>
                    <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20">
                      Send Message <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/contact-us" className="text-primary font-medium">Contact Us</Link>
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
