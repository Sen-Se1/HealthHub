"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Shield, Lock, ChevronRight, ArrowLeft, 
  Clock, CheckCircle2, Scale, FileText,
  AlertTriangle, CreditCard, Ban, Briefcase, UserCheck,
  MessageSquare, HelpCircle, Gavel, XCircle, RefreshCw,
  ArrowRight
} from "lucide-react"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms", icon: Scale, content: "By accessing or using the HealthHub platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site." },
  { id: "eligibility", title: "2. Eligibility", icon: UserCheck, content: "You must be at least 18 years of age to create an account on HealthHub. By using the platform, you represent and warrant that you have the right, authority, and capacity to enter into this agreement." },
  { id: "accounts", title: "3. User Accounts", icon: Lock, items: [
    "Users are responsible for maintaining account confidentiality.",
    "All information provided must be accurate and updated regularly.",
    "HealthHub reserves the right to suspend accounts for security violations.",
    "One person may not maintain more than one active account."
  ]},
  { id: "doctor-resp", title: "4. Doctor Responsibilities", icon: Briefcase, content: "Healthcare providers joining the platform must provide valid credentials, maintain professional standards, and comply with all healthcare regulations and patient confidentiality laws." },
  { id: "patient-resp", title: "5. Patient Responsibilities", icon: CheckCircle2, content: "Patients must provide accurate medical information, show up for scheduled appointments on time, and interact with healthcare providers in a respectful and professional manner." },
  { id: "appointments", title: "6. Appointments & Cancellations", icon: Clock, items: [
    "Appointments are subject to doctor availability and confirmation.",
    "Cancellations must be made at least 24 hours in advance.",
    "Repeated no-shows may lead to platform restrictions or fees.",
    "Doctors may reschedule in case of medical emergencies."
  ]},
  { id: "payments", title: "7. Payments & Fees", icon: CreditCard, content: "While HealthHub platform usage is currently free for basic booking, specific consultation fees are set by individual doctors. Any payment processing through the platform is handled via secure third-party providers." },
  { id: "communications", title: "8. Communications", icon: MessageSquare, content: "By using HealthHub, you consent to receive platform notifications, appointment reminders, and secure messages from healthcare providers. You may opt out of marketing communications at any time." },
  { id: "prohibited", title: "9. Prohibited Use", icon: Ban, items: [
    "Using the platform for fraudulent or illegal activities.",
    "Attempting to bypass security or scrape platform data.",
    "Harassing or abusing healthcare providers or other users.",
    "Posting false or misleading medical information."
  ]},
  { id: "ip", title: "10. Intellectual Property", icon: Shield, content: "The HealthHub name, logo, and all original platform content are the exclusive property of HealthHub Inc. and are protected by international copyright and trademark laws." },
  { id: "liability", title: "11. Limitation of Liability", icon: AlertTriangle, content: "HealthHub is a facilitator and does not provide direct medical advice. We are not liable for any outcomes of medical consultations or interactions occurring through the platform. Always seek professional medical care for emergencies." },
  { id: "termination", title: "12. Termination", icon: XCircle, content: "HealthHub reserves the right to terminate or suspend your account at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the platform." },
  { id: "changes", title: "13. Changes to Terms", icon: RefreshCw, content: "We may revise these Terms of Service at any time. By continuing to use the platform after changes are posted, you agree to be bound by the updated version of the terms." },
  { id: "law", title: "14. Governing Law", icon: Gavel, content: "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which HealthHub Inc. operates, without regard to its conflict of law provisions." },
  { id: "contact", title: "15. Contact Information", icon: HelpCircle, content: "If you have any questions about these Terms, please contact our legal team at legal@healthhub.com or through our official support channels." }
]

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-12 bg-primary/5 p-12 rounded-[2.5rem] border border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="flex-1 z-10">
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Terms of Service</h1>
              <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed">
                Please read these terms carefully before using our platform. By using HealthHub, youAgree to these terms.
              </p>
              <div className="flex items-center gap-4 text-sm font-bold text-primary">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Last Updated: Oct 2023</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full">v1.4</span>
              </div>
            </div>

            <div className="w-full md:w-72 h-72 relative z-10 shrink-0">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-3xl" />
              <Image 
                src="/terms-of-service-hero.png" 
                alt="Terms and Legal Illustration" 
                fill
                className="object-cover rounded-3xl border border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 glass p-4 rounded-xl border border-white/20 shadow-xl">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Table of Contents - Desktop Only */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit">
              <h4 className="font-black uppercase tracking-widest text-xs text-muted-foreground mb-6">In these terms</h4>
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
            <div className="flex-1 space-y-16 font-sans">
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
                      <section.icon className="h-5 w-5" />
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
                  
                  {(section.id === "liability" || section.id === "termination") && (
                    <div className="mt-8 p-6 bg-red-500/5 border border-red-500/10 rounded-3xl flex items-center gap-6">
                      <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="text-sm font-bold text-destructive italic leading-relaxed">
                        {section.id === "liability" 
                          ? "IMPORTANT: HealthHub is not responsible for medical outcomes. Consult a doctor for professional advice."
                          : "HealthHub reserves the right to terminate accounts that compromise platform safety."}
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

      <PublicFooter />
    </div>
  )
}
