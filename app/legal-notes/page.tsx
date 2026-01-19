"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Scale, ShieldCheck, Globe,
  Mail, Phone, ExternalLink, Copyright,
  AlertTriangle, ChevronRight, CheckCircle2,
  FileText
} from "lucide-react"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const SECTIONS = [
  { id: "publisher", title: "1. Publisher Information" },
  { id: "contact", title: "2. Contact Details" },
  { id: "hosting", title: "3. Hosting Provider" },
  { id: "intellectual-property", title: "4. Intellectual Property" },
  { id: "liability", title: "5. Liability Disclaimer" },
  { id: "external-links", title: "6. External Links" },
  { id: "applicable-law", title: "7. Applicable Law" }
]

export default function LegalNotesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-12 bg-primary/5 p-12 rounded-[2.5rem] border border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="flex-1 z-10">
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Legal Notes</h1>
              <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed">
                Legal information and disclosures related to the use of the HealthHub platform.
              </p>
              <div className="flex items-center gap-4 text-sm font-bold text-primary">
                <span className="flex items-center gap-2"><Scale className="h-4 w-4" /> Last Updated: Jan 2026</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-xs">OFFICIAL IMPRINT</span>
              </div>
            </div>

            <div className="w-full md:w-72 h-72 relative z-10 shrink-0">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-3xl" />
              <Image 
                src="/legal-notes-hero.png" 
                alt="Medical Office Illustration" 
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
            
            {/* Sidebar TOC - Desktop Only */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit">
              <h4 className="font-black uppercase tracking-widest text-xs text-muted-foreground mb-6">Legal Directory</h4>
              <nav className="space-y-4">
                {SECTIONS.map((section) => (
                  <a 
                    key={section.id} 
                    href={`#${section.id}`}
                    className="text-sm font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    {section.title.split('. ')[1]}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-16 font-sans">
              
              {/* 1. Publisher Information */}
              <motion.section 
                id="publisher"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-24 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">1. Publisher Information</h2>
                </div>
                
                <Card className="rounded-3xl border-none bg-muted/30 p-8 shadow-sm">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Company Entity</p>
                        <p className="font-bold text-foreground">HealthHub Digital Solutions Ltd.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Legal Form</p>
                        <p className="font-bold text-foreground">Private Limited Company</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Registered Address</p>
                        <p className="font-bold text-foreground">123 Medical Plaza, Health District<br />Building B, Suite 405<br />San Francisco, CA 94103</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* 2. Contact Details */}
              <motion.section 
                id="contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-24 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">2. Contact Details</h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { icon: Mail, title: "Email", value: "legal@healthhub.com" },
                    { icon: Phone, title: "Phone", value: "+1 (800) LEGAL-HH" },
                    { icon: Globe, title: "Support", value: "Available 24/7" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col items-center text-center group/card hover:border-primary/50 transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{item.title}</p>
                      <p className="text-sm font-bold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* 3. Hosting Provider */}
              <motion.section 
                id="hosting"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-24 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">3. Hosting Provider</h2>
                </div>
                
                <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-6">
                  Our platform is hosted on high-availability cloud infrastructure ensuring 99.9% uptime and enterprise-grade security.
                </p>
                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
                  <p className="font-black text-foreground mb-2">Platform Hosting:</p>
                  <p className="text-sm font-bold text-muted-foreground">Vercel Inc.<br />340 S Lemon Ave #4133<br />Walnut, CA 91789<br />United States</p>
                  <Link href="https://vercel.com" className="inline-flex items-center text-xs font-black text-primary mt-4 hover:underline">
                    VISIT WEBSITE <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
                <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* 4. Intellectual Property */}
              <motion.section 
                id="intellectual-property"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-24 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Copyright className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">4. Intellectual Property</h2>
                </div>

                <div className="space-y-4 text-lg text-muted-foreground font-medium leading-relaxed">
                  <p>
                    All content accessible on this platform, including but not limited to text, graphics, logos, images, and software, is the property of HealthHub or its content suppliers and is protected by international copyright laws.
                  </p>
                  <p>
                    Reproduction, modification, distribution, or republication of any material from this site is strictly prohibited without prior written consent from HealthHub Digital Solutions Ltd.
                  </p>
                </div>
                <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* 5. Liability Disclaimer */}
              <motion.section 
                id="liability"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-24 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">5. Liability Disclaimer</h2>
                </div>

                <div className="space-y-8">
                  <div className="text-lg text-muted-foreground font-medium leading-relaxed">
                    <p>
                      While we strive to ensure the accuracy of the information on our platform, HealthHub cannot be held liable for any errors, omissions, or results obtained from the use of this information.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex items-center gap-6">
                    <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <AlertTriangle className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-600 dark:text-amber-500 mb-1">Medical Responsibility Disclaimer</h4>
                      <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                        HealthHub is a facilitator platform and does not provide medical advice or diagnosis. Always seek the advice of your physician.
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* 6. External Links */}
              <motion.section 
                id="external-links"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-24 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">6. External Links</h2>
                </div>
                
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Our platform may contain links to external websites that are not provided or maintained by or in any way affiliated with HealthHub. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                </p>
                <hr className="mt-16 border-border/40" />
              </motion.section>

               {/* 7. Applicable Law */}
              <motion.section 
                id="applicable-law"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="scroll-mt-24 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Scale className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">7. Applicable Law</h2>
                </div>
                
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Any dispute relating in any way to your visit to HealthHub or to services you purchase through our platform shall be submitted to confidential arbitration in the jurisdiction of California, USA.
                </p>
                <hr className="mt-16 border-border/40" />
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
