"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Stethoscope, CalendarCheck, MessageCircle, Shield, ArrowRight, Activity, Award, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
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
        className="sticky top-0 z-50 bg-transparent backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-foreground text-xl tracking-tight">HealthHub</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" className="text-foreground hover:bg-primary/10">Log in</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="font-medium shadow-lg shadow-primary/20">Get Started</Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-left"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <Activity className="h-4 w-4" />
              <span>Modern Healthcare Solution</span>
            </motion.div>
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight"
            >
              Healthcare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2 animate-gradient">Made Simple</span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Connect with verified doctors, book appointments instantly, and manage your health journey all in one secure platform.
            </motion.p>
            <motion.div variants={fadeIn} className="flex gap-4 flex-wrap">
              <Link href="/auth/register">
                <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-xl shadow-primary/20">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg glass">
                  Explore Doctors
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="mt-12 flex items-center gap-8 border-t border-border pt-8"
            >
              <div>
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm text-muted-foreground">Patients</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
            <Image 
              src="/hero-illustration.png" 
              alt="Healthcare Illustration" 
              width={600} 
              height={600} 
              className="relative z-10 drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-24 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose HealthHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the tools you need to manage your health with confidence and ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Stethoscope, title: "Verified Doctors", desc: "All healthcare professionals are verified and credentialed for your safety." },
              { icon: CalendarCheck, title: "Easy Booking", desc: "Schedule appointments in seconds with our intuitive booking system." },
              { icon: MessageCircle, title: "Direct Chat", desc: "Communicate directly with your doctor through our secure messaging system." },
              { icon: Shield, title: "Secure & Private", desc: "Your health data is protected with enterprise-grade security." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card h-full border-none">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                      <feature.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 glass-card rounded-3xl">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-4xl font-extrabold mb-2">Award Winning</h4>
            <p className="text-muted-foreground">Recognized for excellence in digital health services.</p>
          </div>
          <div className="text-center p-8 glass-card rounded-3xl">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-4xl font-extrabold mb-2">24/7 Support</h4>
            <p className="text-muted-foreground">Access healthcare guidance whenever you need it.</p>
          </div>
          <div className="text-center p-8 glass-card rounded-3xl">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-4xl font-extrabold mb-2">Safe Data</h4>
            <p className="text-muted-foreground">Your privacy is our top priority with bank-level encryption.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden border-none shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-chart-2 animate-gradient" />
            <CardContent className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6">
                Ready to take control of your health?
              </h2>
              <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-lg md:text-xl">
                Join thousands of patients and doctors who trust HealthHub for their healthcare needs. Start your journey today.
              </p>
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="h-16 px-12 text-xl font-bold shadow-2xl">
                  Create Free Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 glass mt-16">
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
