"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Stethoscope, Scale, ShieldCheck, 
  MapPin, Mail, Phone, Globe, 
  FileText, Lock, AlertTriangle,
  ArrowLeft, ExternalLink, Copyright
} from "lucide-react"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModeToggle } from "@/components/ui/mode-toggle"

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
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-sm font-bold text-primary mb-8 hover:translate-x-1 transition-transform">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">OFFICIAL IMPRINT</p>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
            >
              Legal <span className="text-primary">Notes</span>
            </motion.h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xl text-muted-foreground font-medium">
                Legal information and disclosures related to the use of our platform.
              </p>
              <div className="px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-bold text-muted-foreground shrink-0">
                Last Updated: January 19, 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 grow bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16">
            
            {/* Sidebar TOC */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32 space-y-4">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Legal Directory</p>
                <div className="space-y-1">
                  {SECTIONS.map((section) => (
                    <a 
                      key={section.id} 
                      href={`#${section.id}`}
                      className="block px-4 py-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Content Sections */}
            <div className="grow space-y-20">
              
              <section id="publisher" className="scroll-mt-32 space-y-8">
                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  1. Publisher Information
                </h2>
                <Card className="rounded-3xl border-none bg-muted/30 p-8 shadow-sm">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Company Entity</p>
                        <p className="font-bold">HealthHub Digital Solutions Ltd.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Legal Form</p>
                        <p className="font-bold">Private Limited Company</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Registered Address</p>
                        <p className="font-bold">123 Medical Plaza, Health District<br />Building B, Suite 405<br />San Francisco, CA 94103</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              <section id="contact" className="scroll-mt-32 space-y-8">
                <h2 className="text-3xl font-black tracking-tighter">2. Contact Details</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { icon: Mail, title: "Email", value: "legal@healthhub.com" },
                    { icon: Phone, title: "Phone", value: "+1 (800) LEGAL-HH" },
                    { icon: Globe, title: "Support", value: "Available 24/7" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{item.title}</p>
                      <p className="text-sm font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="hosting" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">3. Hosting Provider</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                  <p>
                    Our platform is hosted on high-availability cloud infrastructure ensuring 99.9% uptime and enterprise-grade security.
                  </p>
                  <div className="mt-6 p-6 rounded-2xl border border-secondary/20 bg-secondary/5">
                    <p className="font-black text-foreground mb-2">Platform Hosting:</p>
                    <p className="text-sm font-bold">Vercel Inc.<br />340 S Lemon Ave #4133<br />Walnut, CA 91789<br />United States</p>
                    <Link href="https://vercel.com" className="inline-flex items-center text-xs font-black text-secondary mt-4 hover:underline">
                      VISIT WEBSITE <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </section>

              <section id="intellectual-property" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                   <Copyright className="h-8 w-8 text-primary" />
                   4. Intellectual Property
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                  <p>
                    All content accessible on this platform, including but not limited to text, graphics, logos, images, and software, is the property of HealthHub or its content suppliers and is protected by international copyright laws.
                  </p>
                  <p>
                    Reproduction, modification, distribution, or republication of any material from this site is strictly prohibited without prior written consent from HealthHub Digital Solutions Ltd.
                  </p>
                </div>
              </section>

              <section id="liability" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">5. Liability Disclaimer</h2>
                <div className="space-y-8">
                  <Card className="rounded-3xl border-2 border-amber-500/20 bg-amber-500/5 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <AlertTriangle className="h-12 w-12 text-amber-500/20" />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <h4 className="text-xl font-black text-amber-600 dark:text-amber-500">Medical Responsibility Disclaimer</h4>
                      <p className="text-muted-foreground font-medium leading-relaxed">
                        HealthHub is a facilitator platform and does not provide medical advice or diagnosis. All medical decisions and treatments are the sole responsibility of the respective healthcare professional and the patient.
                        Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                      </p>
                    </div>
                  </Card>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                    <p>
                      While we strive to ensure the accuracy of the information on our platform, HealthHub cannot be held liable for any errors, omissions, or results obtained from the use of this information.
                    </p>
                  </div>
                </div>
              </section>

              <section id="external-links" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">6. External Links</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                  <p>
                    Our platform may contain links to external websites that are not provided or maintained by or in any way affiliated with HealthHub. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                  </p>
                </div>
              </section>

              <section id="applicable-law" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">7. Applicable Law</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                  <p>
                    Any dispute relating in any way to your visit to HealthHub or to services you purchase through our platform shall be submitted to confidential arbitration in the jurisdiction of California, USA, except that, to the extent you have in any manner violated or threatened to violate HealthHub's intellectual property rights.
                  </p>
                </div>
              </section>

              <section id="footer-cta" className="pt-10 border-t border-border/40">
                <Card className="rounded-3xl border-none bg-primary p-8 text-center text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
                  <div className="relative z-10">
                    <p className="font-black text-xs uppercase tracking-widest mb-4">Official Platform Documents</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link href="/privacy-policy">
                        <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10 hover:text-white">Privacy Policy</Button>
                      </Link>
                      <Link href="/terms-of-service">
                        <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10 hover:text-white">Terms of Service</Button>
                      </Link>
                      <Link href="/cookies">
                        <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10 hover:text-white">Cookie Policy</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </section>

            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
