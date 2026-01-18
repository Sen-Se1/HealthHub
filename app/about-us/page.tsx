"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Target, Eye, ShieldCheck,
  Users, Zap, Heart, CheckCircle2,
  ArrowRight, Activity, Globe, Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar activePage="About" />

      {/* Hero Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black mb-6"
            >
              <Activity className="h-4 w-4" /> OUR STORY
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight"
            >
              Connecting Patients with <span className="text-primary">Trusted Care</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto"
            >
              HealthHub is more than just a booking platform. We're a bridge between healthcare professionals and those seeking quality medical assistance, anytime, anywhere.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter">Our Mission</h2>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Our mission is to simplify access to healthcare by making it easy for patients to find trusted doctors and book appointments online, while helping healthcare providers manage their practices with digital-first efficiency.
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Eye className="h-8 w-8 text-secondary" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter">Our Vision</h2>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  We envision a future where healthcare is accessible, organized, and digital-first. We aim to be the global standard for patient-doctor interactions, improving health outcomes through seamless technology.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1576091160550-2173dad99901?q=80&w=2070&auto=format&fit=crop"
                alt="Modern Healthcare"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Our Core Values</h2>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
              The principles that guide every decision we make and every feature we build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Trust & Privacy", desc: "Your medical data is encrypted and handled with the highest security standards.", color: "bg-blue-500/10 text-blue-500" },
              { icon: Users, title: "Accessibility", desc: "Healthcare should be available to everyone, regardless of their location or technical skill.", color: "bg-green-500/10 text-green-500" },
              { icon: Zap, title: "Innovation", desc: "We constantly improve our platform to provide a better experience for patients and doctors.", color: "bg-amber-500/10 text-amber-500" },
              { icon: Heart, title: "Care", desc: "We are human-centered. We build for the people who seek care and the heroes who provide it.", color: "bg-rose-500/10 text-rose-500" }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl p-8 group overflow-hidden relative">
                  <div className={`h-14 w-14 rounded-2xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed italic">
                    {value.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Impact Stats */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
            {[
              { label: "Verified Doctors", value: "500+" },
              { label: "Active Patients", value: "10,000+" },
              { label: "Patient Satisfaction", value: "98%" },
              { label: "Availability", value: "24/7" }
            ].map((stat, idx) => (
              <div key={idx}>
                <h4 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">{stat.value}</h4>
                <p className="text-primary-foreground/80 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="py-24 bg-background border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <div>
                <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Security</p>
                <p className="font-bold">256-bit AES</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <div>
                <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Compliance</p>
                <p className="font-bold">HIPAA Ready</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-10 w-10 text-primary" />
              <div>
                <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Certified</p>
                <p className="font-bold">Medical Standards</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-10 w-10 text-primary" />
              <div>
                <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Privacy</p>
                <p className="font-bold">GDPR Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Network CTA */}
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
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">Join Our Healthcare Network</h2>
                <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 italic">
                  Whether you're a doctor looking to expand your practice or a patient seeking the best care, HealthHub is here for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/auth/register">
                    <Button size="lg" className="h-16 px-10 rounded-full font-black text-xl bg-white text-primary hover:bg-white/90 shadow-2xl w-full sm:w-auto">
                      Get Started Now <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="lg" variant="outline" className="h-16 px-10 rounded-full font-black text-xl border-2 border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                      Join as Doctor
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
