"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Stethoscope, Mail, Phone, MapPin, Clock, 
  Send, CheckCircle2, ArrowLeft, MessageSquare, 
  User, ChevronRight, HelpCircle, PhoneCall, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { toast } from "sonner"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function ContactUsPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "patient",
    subject: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSubmitted(true)
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      })
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "An unexpected error occurred.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20 text-center md:text-left">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-primary/5 p-8 md:p-16 rounded-[3rem] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48" />

            <div className="flex-1 z-10">
              <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-6 hover:gap-3 transition-all">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Contact Us</h1>
              <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed max-w-xl">
                We&apos;re here to help. Whether you&apos;re a patient looking for care or a doctor wanting to join our network, reach out and we&apos;ll get back to you.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-black text-primary">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /> 24/7 Support Response</span>
                <span className="flex items-center gap-2"><Globe className="h-5 w-5" /> Multi-language Support</span>
              </div>
            </div>

            <div className="w-full md:w-[450px] aspect-square relative z-10 shrink-0">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-4xl" />
              <Image 
                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1200&auto=format&fit=crop" 
                alt="Healthcare Support Specialist" 
                fill
                className="object-cover rounded-4xl border border-white/10 shadow-3xl"
              />
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                  <PhoneCall className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Direct Line</p>
                  <p className="text-lg font-black">+1 (800) HELP-DOC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-black tracking-tighter mb-2">Send Us a Message</h2>
                      <p className="text-muted-foreground font-medium">Fill out the form below and our team will contact you shortly.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-bold">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input 
                              id="name" 
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="John Doe" 
                              required 
                              className="pl-11 h-12 bg-muted/30 border-border/50 focus-visible:ring-primary/20" 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-bold">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input 
                              id="email" 
                              type="email" 
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="john@example.com" 
                              required 
                              className="pl-11 h-12 bg-muted/30 border-border/50 focus-visible:ring-primary/20" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-sm font-bold">Your Role</Label>
                          <Select 
                            value={formData.role} 
                            onValueChange={(value) => setFormData({ ...formData, role: value })} 
                            required
                          >
                            <SelectTrigger className="h-12 bg-muted/30 border-border/50 focus-visible:ring-primary/20">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="patient">Patient</SelectItem>
                              <SelectItem value="doctor">Doctor</SelectItem>
                              <SelectItem value="visitor">Visitor / Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-sm font-bold">Subject</Label>
                          <Input 
                            id="subject" 
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="What is this about?" 
                            required 
                            className="h-12 bg-muted/30 border-border/50 focus-visible:ring-primary/20" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-bold">Message</Label>
                        <Textarea 
                          id="message" 
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us how we can help..." 
                          required 
                          className="min-h-[160px] bg-muted/30 border-border/50 focus-visible:ring-primary/20 resize-none px-4 py-3"
                        />
                      </div>

                      <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-black bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
                        {loading ? (
                          "Sending Message..."
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-12 bg-primary/5 rounded-[2.5rem] border border-primary/20 border-dashed"
                  >
                    <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center mb-8 shadow-2xl shadow-primary/40">
                      <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter mb-4">Email Sent!</h2>
                    <p className="text-xl text-muted-foreground font-medium mb-10 max-w-sm">
                      Thank you for reaching out. A HealthHub representative will contact you shortly.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full font-bold px-8">
                      Send another message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Links */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: "Booking Help", text: "How to book?", link: "/#how-it-works" },
                  { title: "Doctor Join", text: "Join as Doctor", link: "/auth/register" },
                  { title: "General FAQ", text: "Visit FAQ Page", link: "/faq" }
                ].map((item, i) => (
                  <Link key={i} href={item.link} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                    <HelpCircle className="h-6 w-6 text-primary mb-4" />
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                      {item.text} <ChevronRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-8">
              <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 space-y-8">
                  <h3 className="text-xl font-black tracking-tight border-b border-border/50 pb-4">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">Office Address</p>
                        <p className="text-base font-bold leading-relaxed">
                          123 Medical Center Way<br />
                          Suite 400, Innovation District<br />
                          San Francisco, CA 94103
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">Email Us</p>
                        <a href="mailto:support@healthhub.com" className="text-base font-bold hover:text-primary transition-colors">support@healthhub.com</a>
                        <p className="text-xs text-muted-foreground font-medium mt-1">Expected reply: ~2-4 hours</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">Call Support</p>
                        <p className="text-base font-bold">+1 (555) HEALTH-HUB</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">Available 24/7 for urgent care</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">Business Hours</p>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm font-bold flex justify-between gap-4"><span>Mon - Fri</span> <span className="text-primary">9AM - 6PM</span></p>
                          <p className="text-sm font-bold flex justify-between gap-4"><span>Sat - Sun</span> <span className="text-primary">Closed</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Connect */}
              <div className="p-8 bg-muted/30 rounded-4xl border border-border/50 text-center">
                <h4 className="font-black text-sm uppercase tracking-widest mb-6">Follow Our Updates</h4>
                <div className="flex justify-center gap-4">
                  {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                    <a key={social} href="#" className="h-12 w-12 rounded-full bg-background border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                      <span className="sr-only">{social}</span>
                      <MessageSquare className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <PublicFooter />    </div>
  )
}
