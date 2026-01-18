"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { 
  Stethoscope, CalendarCheck, MessageCircle, Shield, 
  Activity, Award, Search, MapPin, Star, UserPlus, Phone, Mail,
  Users, CheckCircle2, Heart, Calendar, Twitter, Facebook, Linkedin
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [search, setSearch] = useState({ specialty: "", location: "", date: "" })

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
    <main className="min-h-screen bg-background relative overflow-clip scroll-mt-20">
      {/* Background Decor - Wrapped to prevent overflow */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white opacity-40" />
        <div className="absolute top-[-5%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/40 supports-backdrop-filter:bg-background/60"
      >
        <div className="container mx-auto px-4 flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-all duration-300">
              <Stethoscope className="text-white h-6 w-6" aria-hidden="true" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-foreground">HealthHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-10">
            {[
              { name: "Find Doctors", href: "#doctors" },
              { name: "Specialties", href: "#specialties" },
              { name: "How it Works", href: "#how-it-works" },
              { name: "Join Us", href: "#join-as-doctor" }
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <ModeToggle />
            <Link href="/auth/login" className="hidden sm:block">
              <Button variant="ghost" className="font-bold text-foreground hover:text-primary hover:bg-primary/5 px-6">Log in</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" className="rounded-full font-black px-8 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 bg-primary">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-16 lg:pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="relative z-10"
            >
              <motion.div 
                variants={fadeIn}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-10"
              >
                <Activity className="h-4 w-4 animate-pulse" />
                <span>Modern Healthcare Solution</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                className="text-6xl md:text-8xl font-black text-foreground mb-8 leading-[0.95] tracking-tighter"
              >
                Your Health, <br />
                <span className="text-primary italic">Our Priority.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-xl text-muted-foreground mb-12 max-w-xl leading-relaxed font-medium"
              >
                Connect with world-class specialists in minutes. Experience a simpler, more secure way to manage your healthcare journey today.
              </motion.p>

              {/* Advanced Search Bar */}
              <motion.div 
                variants={fadeIn}
                className="bg-card p-2 rounded-4xl md:rounded-full shadow-2xl border border-border/50 flex flex-col md:flex-row items-center gap-2 mb-12 group hover:border-primary/30 transition-colors"
                id="hero-search"
              >
                <div className="w-full md:flex-[1.5] flex items-center px-6 gap-3 group/input">
                  <Search className="h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                  <Input 
                    placeholder="Search specialty, doctor..." 
                    className="border-none bg-transparent focus-visible:ring-0 text-base h-12 font-medium"
                    value={search.specialty}
                    onChange={(e) => setSearch({...search, specialty: e.target.value})}
                  />
                </div>
                <div className="hidden md:block w-px h-8 bg-border" />
                <div className="w-full md:flex-1 flex items-center px-4 gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Location" 
                    className="border-none bg-transparent focus-visible:ring-0 text-base h-12 font-medium"
                    value={search.location}
                    onChange={(e) => setSearch({...search, location: e.target.value})}
                  />
                </div>
                <Link href="/auth/login" className="w-full md:w-auto">
                  <Button size="lg" className="w-full md:w-auto rounded-full h-14 md:h-12 px-10 font-black bg-primary hover:bg-primary/95 shadow-xl shadow-primary/20 text-lg transition-all active:scale-95">
                    Find Now
                  </Button>
                </Link>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="flex items-center gap-12"
              >
                <div className="flex -space-x-3.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-13 w-13 rounded-full border-4 border-background bg-muted overflow-hidden shadow-sm">
                      <Image 
                        src={`/placeholder-user.jpg`} 
                        alt="User" 
                        width={52} 
                        height={52} 
                      />
                    </div>
                  ))}
                  <div className="h-13 w-13 rounded-full border-4 border-background bg-primary flex items-center justify-center text-primary-foreground text-xs font-black shadow-sm">
                    +10k
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4.5 w-4.5 fill-current" />)}
                  </div>
                  <p className="text-sm font-bold text-foreground">5.0 Patient Rating <span className="text-muted-foreground font-medium">• 100% Secure</span></p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10">
                <Image 
                  src="/hero-illustration-v2.png" 
                  alt="Modern Healthcare" 
                  width={720} 
                  height={720} 
                  className="rounded-[3rem] shadow-medical"
                  priority
                />
                
                {/* Floating Indicators */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 glass p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20"
                >
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Booking</p>
                    <p className="text-sm font-black">Confirmed Now</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -left-6 glass p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Trust</p>
                    <p className="text-lg font-black leading-none">99.9% Happy</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Why Choose HealthHub?</h2>
            <p className="text-lg text-muted-foreground font-medium">
              We've combined advanced technology with a human touch to provide the most reliable healthcare reservation experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, title: "Expert Care", desc: "Access to a global network of world-class, board-certified specialists.", color: "bg-blue-500" },
              { icon: CalendarCheck, title: "Instant Booking", desc: "Skip the waiting room. Book and confirm your visits in under 60 seconds.", color: "bg-green-500" },
              { icon: MessageCircle, title: "Secure Consult", desc: "Encrypted direct messaging for private and safe health discussions.", color: "bg-purple-500" },
              { icon: Shield, title: "HIPAA Compliant", desc: "Your medical data is protected by industry-leading security standards.", color: "bg-orange-500" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-medical-hover rounded-4xl overflow-hidden">
                  <CardContent className="p-10">
                    <div className={`h-16 w-16 rounded-2xl ${feature.color}/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-8 w-8 text-foreground group-hover:text-primary transition-colors`} />
                    </div>
                    <h3 className="font-black text-2xl mb-4 tracking-tight">{feature.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section id="specialties" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Explore Specialties</h2>
              <p className="text-lg text-muted-foreground font-medium">Find the right specialist for your specific health needs from our diverse medical categories.</p>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" className="rounded-full font-bold h-12 px-8 border-primary/20 hover:bg-primary/5">View All Specialties</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Heart, name: "Cardiology", count: "120+ Doctors" },
              { icon: Activity, name: "Neurology", count: "85+ Doctors" },
              { icon: Stethoscope, name: "General Med", count: "250+ Doctors" },
              { icon: Users, name: "Pediatrics", count: "95+ Doctors" },
              { icon: Award, name: "Orthopedics", count: "70+ Doctors" },
              { icon: Shield, name: "Dermatology", count: "110+ Doctors" }
            ].map((spec, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-card border border-border/50 p-8 rounded-3xl text-center group cursor-pointer hover:border-primary/50 hover:shadow-xl transition-all"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                  <spec.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-lg mb-1">{spec.name}</h4>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{spec.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors Showcase */}
      <section id="doctors" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Our Top Rated Doctors</h2>
            <p className="text-lg text-muted-foreground font-medium">Connect with highly qualified professionals, hand-picked for their excellence in care and patient satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Dr. Sarah Johnson", spec: "Cardiologist", rating: "5.0", reviews: "124", image: "/doctor-1.png" },
              { name: "Dr. Michael Chen", spec: "Neurologist", rating: "4.9", reviews: "98", image: "/doctor-2.png" },
              { name: "Dr. Elena Rodriguez", spec: "Pediatrician", rating: "5.0", reviews: "156", image: "/doctor-3.png" }
            ].map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="rounded-3xl overflow-hidden border border-border/50 hover:shadow-medical-hover transition-all duration-500 group">
                  <div className="relative h-72 overflow-hidden">
                    <Image 
                      src={doc.image} 
                      alt={doc.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-black text-sm">{doc.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h4 className="text-2xl font-black mb-1">{doc.name}</h4>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest mb-6">{doc.spec}</p>
                    <div className="flex items-center gap-4 border-t border-border pt-6 mt-2">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-0.5">Reviews</p>
                        <p className="text-lg font-black">{doc.reviews}</p>
                      </div>
                      <Link href="/auth/login" className="flex-1">
                        <Button className="w-full rounded-full font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">Book Visit</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative overflow-hidden bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">How It Works</h2>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">Get the care you need in 3 simple steps. Our process is designed to be frictionless.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 relative">
            {/* Step Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-linear-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
            
            {[
              { icon: UserPlus, title: "Create Profile", desc: "Sign up and build your secure medical profile in minutes." },
              { icon: Search, title: "Find Specialist", desc: "Select from our vast network of verified healthcare experts." },
              { icon: Calendar, title: "Book Instant", desc: "Pick a time that suits you and get instant confirmation." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative text-center"
              >
                <div className="h-24 w-24 rounded-[2rem] bg-background border-4 border-primary flex items-center justify-center mx-auto mb-8 shadow-2xl relative z-10">
                  <step.icon className="h-10 w-10 text-primary" />
                  <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm">
                    {idx + 1}
                  </div>
                </div>
                <h4 className="text-2xl font-black mb-4">{step.title}</h4>
                <p className="text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Voice of Patients</h2>
            <p className="text-lg text-muted-foreground font-medium">Join the thousands who have revitalized their healthcare experience legacy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "HealthHub completely changed how I manage my family's health. The booking process is incredibly smooth and the doctors are top-tier.", user: "Amanda S.", role: "Mother of 3" },
              { text: "As a busy professional, I value the speed and reliability. Finding a neurologist was immediate and the secure records are a lifesaver.", user: "James W.", role: "Software Engineer" },
              { text: "The interface is beautiful and so easy to use. I can tell they care about the patient experience as much as the medicine.", user: "Linda K.", role: "Retired Educator" }
            ].map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full rounded-[2rem] border-none bg-muted/30 p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex text-yellow-500 mb-6">
                      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                    <p className="text-xl font-medium italic leading-relaxed mb-10">"{test.text}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-primary/20" />
                    <div>
                      <h5 className="font-black text-lg">{test.user}</h5>
                      <p className="text-sm text-muted-foreground font-medium">{test.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join as Doctor CTA */}
      <section id="join-as-doctor" className="container mx-auto px-4 py-20 pb-40">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden border-none shadow-[0_50px_100px_-20px_rgba(30,136,229,0.3)] rounded-[3rem]">
            <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-[#43A047] animate-gradient" />
            <div className="absolute inset-0 bg-grid-white opacity-10" />
            <CardContent className="relative z-10 p-16 md:p-32 text-center text-white">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter">
                Expand Your Practice. <br />Join HealthHub.
              </h2>
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed font-medium">
                Are you a healthcare professional looking to reach more patients and digitize your workflow? Join our network today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/auth/register?role=doctor">
                  <Button size="lg" variant="secondary" className="h-18 px-12 text-xl font-black rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 bg-white text-primary hover:bg-white/90">
                    Apply as Doctor
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button size="lg" variant="outline" className="h-18 px-12 text-xl font-bold rounded-full border-white/50 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white transition-all">
                    Partner with Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Get In Touch</h2>
              <p className="text-lg text-muted-foreground font-medium mb-12">Have questions or need assistance? Our support team is here for you 24/7.</p>
              
              <div className="space-y-8">
                {[
                  { icon: Phone, label: "Call Us", val: "+1 (555) 000-0000" },
                  { icon: Mail, label: "Email Us", val: "support@healthhub.com" },
                  { icon: MapPin, label: "Visit Us", val: "123 Medical Center Way, SF" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <item.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{item.label}</p>
                      <p className="text-xl font-bold">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[80px] -z-10" />
              <Image 
                src="/clinic-illustration.png" 
                alt="Our Facility" 
                width={700} 
                height={500} 
                className="rounded-3xl shadow-2xl relative z-10" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Footer */}
      <footer className="bg-card pt-32 pb-16 border-t border-border/50 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 w-full mb-32">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-8 group">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Stethoscope className="text-white h-7 w-7" />
                </div>
                <span className="font-black text-3xl tracking-tighter">HealthHub</span>
              </Link>
              <p className="text-muted-foreground text-lg mb-8 max-w-sm leading-relaxed">
                Empowering patients and doctors with advanced digital solutions for a healthier tomorrow.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Linkedin, label: "LinkedIn" }
                ].map(({ Icon, label }) => (
                  <div key={label} className="h-14 w-14 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all shadow-sm" aria-label={`Follow us on ${label}`}>
                    <span className="sr-only">{label}</span>
                    <Icon className="h-6 w-6" />
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: "Platform", links: [{n: "Find Doctors", h: "#doctors"}, {n: "Specialties", h: "#specialties"}, {n: "How it Works", h: "#how-it-works"}, {n: "Join as Doctor", h: "#join-as-doctor"}] },
              { title: "Company", links: [{n: "About Us", h: "#"}, {n: "Contact", h: "/contact-us"}, {n: "Careers", h: "#"}, {n: "News", h: "#"}] },
              { title: "Legal", links: [{n: "Privacy Policy", h: "/privacy-policy"}, {n: "Terms of Service", h: "/terms-of-service"}, {n: "Cookie Policy", h: "#"}, {n: "Legal Notes", h: "#"}] }
            ].map((col, idx) => (
              <div key={idx}>
                <h5 className="font-black text-xl mb-8 tracking-tight">{col.title}</h5>
                <ul className="space-y-5">
                  {col.links.map(l => (
                    <li key={l.n}>
                      <Link href={l.h} className="text-muted-foreground hover:text-primary font-medium transition-colors">{l.n}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-border/50 mb-16" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full text-muted-foreground font-medium">
            <p>&copy; {new Date().getFullYear()} HealthHub. All rights reserved.</p>
            <div className="flex gap-10">
              <Link href="#" className="hover:text-primary transition-colors">Status</Link>
              <Link href="#" className="hover:text-primary transition-colors">Trust</Link>
              <Link href="#" className="hover:text-primary transition-colors">Security</Link>
            </div>
            <p className="flex items-center gap-2">
              Built with <Heart className="h-4 w-4 text-red-500 fill-current" /> by SenSe1
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
