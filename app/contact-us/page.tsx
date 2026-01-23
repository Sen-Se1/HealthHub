"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Stethoscope, Mail, Phone, MapPin, Clock, 
  Send, CheckCircle2, ArrowLeft, MessageSquare, 
  User, ChevronRight, HelpCircle, PhoneCall, Globe,
  ArrowRight, UserPlus, Twitter, Linkedin, Facebook
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/10 to-transparent -z-10 hidden lg:block" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black mb-6"
              >
                <MessageSquare className="h-4 w-4" /> CONTACT US
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none"
              >
                We're Always Here to <span className="text-primary">Help You</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto italic"
              >
                Whether you're a patient looking for care or a doctor wanting to join our network, reach out and we'll get back to you within 24 hours.
              </motion.p>
              
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-black text-primary/60">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> 24/7 Support Response</span>
                <span className="flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Multi-language Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Support Card Header (Modern Illustration) */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-background border border-border/50 rounded-[3rem] p-8 md:p-12 overflow-hidden relative shadow-2xl shadow-primary/5">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Our Support Infrastructure</h2>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">
                    We use state-of-the-art communication tools to ensure your health concerns and professional inquiries are handled with the highest priority and security.
                  </p>
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/10 w-fit">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                      <PhoneCall className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Direct Assistance</p>
                      <p className="text-xl font-black text-primary">+1 (800) HELP-DOC</p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-xl">
                  <Image 
                    src="/contact-us-hero.png" 
                    alt="Contact Support Illustration" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16 items-stretch">
              
              {/* Row 1: Contact Form Area (Left) & Sidebar Info (Right) */}
              <div className="lg:col-span-2 h-full flex flex-col">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="h-full flex flex-col"
                    >
                      <div className="mb-8">
                        <h2 className="text-3xl font-black tracking-tighter mb-2">Send Us a <span className="text-primary">Message</span></h2>
                        <p className="text-muted-foreground font-medium italic">Fill out the form below and our team will contact you shortly.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8 flex-1">
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
                                className="pl-11 h-12 bg-muted/30 border-border/50 focus-visible:ring-primary/20 rounded-xl" 
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
                                className="pl-11 h-12 bg-muted/30 border-border/50 focus-visible:ring-primary/20 rounded-xl" 
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
                              <SelectTrigger className="h-12 bg-muted/30 border-border/50 focus-visible:ring-primary/20 rounded-xl">
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
                              className="h-12 bg-muted/30 border-border/50 focus-visible:ring-primary/20 rounded-xl" 
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
                            className="min-h-[160px] bg-muted/30 border-border/50 focus-visible:ring-primary/20 resize-none px-4 py-3 rounded-xl"
                          />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-black bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group rounded-full">
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
                      className="h-full flex flex-col items-center justify-center text-center bg-primary/5 rounded-[2.5rem] border border-primary/20 border-dashed p-12"
                    >
                      <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center mb-8 shadow-2xl shadow-primary/40">
                        <CheckCircle2 className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-4xl font-black tracking-tighter mb-4">Email Sent!</h2>
                      <p className="text-xl text-muted-foreground font-medium mb-10 max-w-sm italic text-center">
                        Thank you for reaching out. A HealthHub representative will contact you shortly.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full font-black px-10 h-14 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                        Send another message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="lg:col-span-1 h-full">
                <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden rounded-[2.5rem] h-full">
                  <CardContent className="p-8 space-y-10">
                    <h3 className="text-xl font-black tracking-tight border-b border-border/50 pb-4">Contact Information</h3>
                    
                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Office Address</p>
                          <p className="text-base font-bold leading-relaxed italic">
                            123 Medical Center Way<br />
                            Suite 400, Innovation District<br />
                            San Francisco, CA 94103
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                          <Mail className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Email Us</p>
                          <a href="mailto:support@healthhub.com" className="text-base font-bold hover:text-primary transition-colors">support@healthhub.com</a>
                          <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase italic tracking-wider">Replied in ~2-4 hours</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Call Support</p>
                          <p className="text-base font-bold">+1 (555) HEALTH-HUB</p>
                          <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase italic tracking-wider">Available 24/7</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                          <Clock className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Business Hours</p>
                          <div className="space-y-1 mt-1 font-bold italic text-sm">
                            <p className="flex justify-between gap-4"><span>Mon - Fri</span> <span className="text-primary">9AM - 6PM</span></p>
                            <p className="flex justify-between gap-4"><span>Sat - Sun</span> <span className="text-primary">Closed</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Row 2: Quick Links (Left) & Social Connect (Right) */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "Booking Help", text: "How to book?", link: "/#how-it-works", icon: HelpCircle },
                    { title: "Doctor Join", text: "Join as Doctor", link: "/auth/register", icon: UserPlus },
                    { title: "General FAQ", text: "Visit FAQ Page", link: "/faq", icon: Globe }
                  ].map((item, i) => (
                    <Link key={i} href={item.link} className="p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group shadow-sm hover:shadow-xl">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-black text-lg mb-2">{item.title}</h4>
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                        {item.text} <ChevronRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="p-10 bg-muted/30 rounded-[2.5rem] border border-border/50 text-center h-full flex flex-col justify-center">
                  <h4 className="font-black text-[10px] uppercase tracking-widest mb-8 opacity-60">Follow Our Updates</h4>
                  <div className="flex justify-center gap-6">
                    {[
                      { icon: Twitter, label: 'Twitter' },
                      { icon: Linkedin, label: 'LinkedIn' },
                      { icon: Facebook, label: 'Facebook' }
                    ].map((social) => (
                      <a key={social.label} href="#" className="h-14 w-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md group">
                        <span className="sr-only">{social.label}</span>
                        <social.icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Join Our Network CTA Section (STANDARD STYLE) */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-[3rem] border-none bg-linear-to-br from-primary to-secondary p-12 md:p-24 text-center text-white relative overflow-hidden group shadow-2xl shadow-primary/30">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] opacity-50 group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">Ready to Start Your <span className="text-primary-foreground italic">Health Journey?</span></h2>
                  <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 italic">
                    Join thousands of patients and healthcare providers connecting daily on our secure, HIPAA-compliant platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/auth/register">
                      <Button size="lg" className="h-16 px-10 rounded-full font-black text-xl bg-white text-primary hover:bg-white/90 shadow-2xl w-full sm:w-auto cursor-pointer transition-all duration-300">
                        Get Started Now <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button size="lg" variant="outline" className="h-16 px-10 rounded-full font-black text-xl border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary w-full sm:w-auto cursor-pointer transition-all duration-300">
                        Join as Doctor
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
