"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Stethoscope, Shield, Lock, ChevronRight, ArrowLeft, 
  Mail, Clock, CheckCircle2, ShieldCheck, Eye, Terminal,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"

const sections = [
  { id: "introduction", title: "1. Introduction", content: "HealthHub is committed to protecting your personal and medical information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform to book appointments, communicate with doctors, and manage your health records." },
  { id: "collection", title: "2. Information We Collect", items: [
    "Personal Identification (Name, email, phone number, date of birth)",
    "Medical Information (Health history, current symptoms, medication lists)",
    "Doctor Profiles & User Content (Biographies, CVs, messages between patients and doctors)",
    "Usage Data (Device information, IP addresses, browsing behavior through cookies)"
  ]},
  { id: "usage", title: "3. How We Use Your Information", items: [
    "Managing and scheduling medical appointments",
    "Facilitating secure communication between patients and healthcare providers",
    "Sending account updates, security alerts, and support messages",
    "Improving platform performance and personalizing user experience"
  ]},
  { id: "sharing", title: "4. Data Sharing & Disclosure", content: "We do not sell your data. We share information only with your selected doctors to facilitate care, with essential service providers (e.g., email delivery), or when required by law to protect user safety and security." },
  { id: "security", title: "5. Data Security", content: "HealthHub utilizes industry-standard 256-bit AES encryption and HIPAA-compliant storage protocols. We regularly audit our systems for vulnerabilities and restrict internal access to sensitive patient data. Your security is our highest priority." },
  { id: "cookies", title: "6. Cookies & Tracking", content: "We use essential cookies to keep you logged in and analytics cookies to understand how our site is used. You can manage your cookie preferences through your browser settings, though some platform features may become unavailable." },
  { id: "rights", title: "7. User Rights", items: [
    "The right to access and download your personal data",
    "The right to request corrections to incomplete or inaccurate information",
    "The right to delete your account and all associated personal data",
    "The right to withdraw consent for data processing at any time"
  ]},
  { id: "retention", title: "8. Data Retention", content: "We retain your information for as long as your account is active or as needed to provide you with services. Medical records are retained in compliance with healthcare-specific legal and regulatory requirements." },
  { id: "children", title: "9. Children's Privacy", content: "Our services are not intended for users under the age of 18 without explicit parental or guardian consent. We do not knowingly collect data from children without such oversight." },
  { id: "changes", title: "10. Changes to This Policy", content: "We may update this Privacy Policy periodically to reflect changes in our practices or for legal reasons. We will notify you of any significant changes via email or through a prominent notice on our platform." },
  { id: "contact", title: "11. Contact Information", content: "If you have questions about this policy or our data practices, please contact our Data Protection Officer at privacy@healthhub.com or through our Help Center." }
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Stethoscope className="text-white h-5 w-5" />
            </div>
            <span className="font-black text-xl tracking-tighter text-foreground">HealthHub</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <span className="text-sm font-bold text-foreground">Privacy Policy</span>
            <div className="h-4 w-px bg-border" />
            <Link href="/auth/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">Sign In</Link>
            <Link href="/auth/register">
              <Button size="sm" className="rounded-full font-bold">Get Started</Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-12 bg-primary/5 p-12 rounded-[2.5rem] border border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="flex-1 z-10">
              <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-6 hover:gap-3 transition-all">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal and medical data while using the HealthHub platform.
              </p>
              <div className="flex items-center gap-4 text-sm font-bold text-primary">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Last Updated: Oct 2023</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full">v2.1</span>
              </div>
            </div>

            <div className="w-full md:w-72 h-72 relative z-10 shrink-0">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-3xl" />
              <Image 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop" 
                alt="Security and Privacy Illustration" 
                fill
                className="object-cover rounded-3xl border border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 glass p-4 rounded-xl border border-white/20 shadow-xl">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Table of Contents - Desktop Only */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit">
              <h4 className="font-black uppercase tracking-widest text-xs text-muted-foreground mb-6">In this policy</h4>
              <nav className="space-y-4">
                {sections.map((section) => (
                  <a 
                    key={section.id} 
                    href={`#${section.id}`}
                    className="block text-sm font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    {section.title.split('. ')[1]}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Policy Content */}
            <div className="flex-1 space-y-16">
              {sections.map((section) => (
                <motion.section 
                  key={section.id} 
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24 group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {section.id === "introduction" && <ArrowRight className="h-5 w-5" />}
                      {section.id === "collection" && <Eye className="h-5 w-5" />}
                      {section.id === "usage" && <Terminal className="h-5 w-5" />}
                      {section.id === "sharing" && <Users className="h-5 w-5" />}
                      {section.id === "security" && <Shield className="h-5 w-5" />}
                      {section.id === "cookies" && <Lock className="h-5 w-5" />}
                      {section.id === "rights" && <ShieldCheck className="h-5 w-5" />}
                      {section.id === "retention" && <Clock className="h-5 w-5" />}
                      {section.id === "children" && <Plus className="h-5 w-5" />}
                      {section.id === "changes" && <Activity className="h-5 w-5" />}
                      {section.id === "contact" && <Mail className="h-5 w-5" />}
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">{section.title}</h2>
                  </div>
                  
                  {section.content && (
                    <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                      {section.content}
                    </p>
                  )}

                  {section.items && (
                    <ul className="space-y-4 mt-6">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-muted/30 p-4 rounded-2xl border border-border/50">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground/90 font-bold text-base leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.id === "security" && (
                    <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-3xl flex items-center gap-6">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <Lock className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-bold text-primary italic leading-relaxed">
                        "Your health data is encrypted at rest and in transit. We prioritize patient confidentiality above all else."
                      </p>
                    </div>
                  )}

                  <hr className="mt-16 border-border/40" />
                </motion.section>
              ))}
            </div>

          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-muted/30 border-t border-border/40 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Stethoscope className="text-white h-4 w-4" />
                </div>
                <span className="font-black text-xl tracking-tighter">HealthHub</span>
              </Link>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                The most trusted healthcare reservation platform for modern clinics and patients worldwide.
              </p>
            </div>
            <div>
              <h5 className="font-black uppercase text-xs tracking-widest text-foreground mb-6">Platform</h5>
              <div className="flex flex-col gap-4 text-sm font-bold text-muted-foreground">
                <Link href="/#features" className="hover:text-primary">Features</Link>
                <Link href="/#doctors" className="hover:text-primary">Find Doctors</Link>
                <Link href="/auth/register" className="hover:text-primary">Partner with Us</Link>
              </div>
            </div>
            <div>
              <h5 className="font-black uppercase text-xs tracking-widest text-foreground mb-6">Legal</h5>
              <div className="flex flex-col gap-4 text-sm font-bold text-primary">
                <Link href="/privacy-policy" className="flex items-center gap-2">Privacy Policy <ChevronRight className="h-3 w-3" /></Link>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
              </div>
            </div>
            <div>
              <h5 className="font-black uppercase text-xs tracking-widest text-foreground mb-6">Connect</h5>
              <div className="flex flex-col gap-4 text-sm font-bold text-muted-foreground">
                <Link href="/contact-us" className="hover:text-primary">Contact Us</Link>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="h-8 w-8 rounded-full bg-background border flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ChevronRight className="h-4 w-4" /></a>
                  <a href="#" className="h-8 w-8 rounded-full bg-background border flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ChevronRight className="h-4 w-4" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center sm:text-left flex flex-col sm:row items-center justify-between gap-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              &copy; {new Date().getFullYear()} HealthHub Inc. All rights reserved. Securely powered by HealthHub.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Plus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
