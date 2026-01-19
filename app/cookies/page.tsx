"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  ShieldCheck, Cookie, 
  Settings, Info, Lock, Globe, 
  ExternalLink, Mail, CheckCircle2,
  ArrowRight, ChevronRight, Eye, Terminal, Clock, Activity, Plus
} from "lucide-react"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const COOKIE_TYPES = [
  {
    category: "Essential Cookies",
    description: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
    items: [
      { name: "auth_token", purpose: "Maintains your secure session and authentication.", duration: "Session" },
      { name: "security_hash", purpose: "Prevents Cross-Site Request Forgery (CSRF) attacks.", duration: "Session" },
      { name: "theme_preference", purpose: "Remembers your choice of light or dark mode.", duration: "1 Year" }
    ]
  },
  {
    category: "Performance & Analytics",
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
    items: [
      { name: "_ga", purpose: "Google Analytics identifying unique users.", duration: "2 Years" },
      { name: "_gid", purpose: "Google Analytics identifying users.", duration: "24 Hours" }
    ]
  }
]

const SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "what-are-cookies", title: "2. What Are Cookies?" },
  { id: "how-we-use", title: "3. How We Use Cookies" },
  { id: "types-of-cookies", title: "4. Types of Cookies We Use" },
  { id: "third-party", title: "5. Third-Party Cookies" },
  { id: "managing-preferences", title: "6. Managing Your Preferences" },
  { id: "contact", title: "8. Contact Us" }
]

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-12 bg-primary/5 p-12 rounded-[2.5rem] border border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="flex-1 z-10">
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Cookie Policy</h1>
              <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed">
                This page explains how and why we use cookies and similar technologies on our platform to improve your experience and secure your data.
              </p>
              <div className="flex items-center gap-4 text-sm font-bold text-primary">
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Last Updated: Jan 2026</span>
                <span className="px-3 py-1 bg-primary/10 rounded-full">v2.1</span>
              </div>
            </div>

            <div className="w-full md:w-72 h-72 relative z-10 shrink-0">
              <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent rounded-3xl" />
              <Image 
                src="/cookies-hero.png" 
                alt="Cookie Policy Illustration" 
                fill
                className="object-cover rounded-3xl border border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 glass p-4 rounded-xl border border-white/20 shadow-xl">
                 <Cookie className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sidebar TOC - Desktop Only */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit">
              <h4 className="font-black uppercase tracking-widest text-xs text-muted-foreground mb-6">Table of Contents</h4>
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
            <div className="flex-1 space-y-16">
              
              {/* Introduction */}
              <motion.section 
                  id="introduction"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24 group"
              >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">1. Introduction</h2>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                    HealthHub ("we", "us", or "our") uses cookies and similar technologies to provide, customize, evaluate, improve, and secure our services. This Cookie Policy explains why we use these technologies and how you can control them.
                  </p>
                  <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* What Are Cookies */}
              <motion.section 
                  id="what-are-cookies"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24 group"
              >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Info className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">2. What Are Cookies?</h2>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                    Cookies are small text files that are stored in your browser's directory. They help us understand things like how you navigate our site, whether you're logged in, and how we can make your experience faster and more secure.
                  </p>
                  <hr className="mt-16 border-border/40" />
              </motion.section>

               {/* How We Use Cookies */}
               <motion.section 
                  id="how-we-use"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24 group"
              >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Terminal className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">3. How We Use Cookies</h2>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium mb-8">
                     We use cookies for various purposes, which can be grouped into the following categories:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: Lock, title: "Security", desc: "Protecting your account from unauthorized access." },
                      { icon: Info, title: "Maintenance", desc: "Ensuring the site runs smoothly and reliably." },
                      { icon: Globe, title: "Localization", desc: "Remembering your preferred language and region." },
                      { icon: Settings, title: "Functionality", desc: "Enabling features like appointment history." }
                    ].map((item, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-border/50 flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-black mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* Types of Cookies */}
              <motion.section 
                  id="types-of-cookies"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24 group"
              >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Cookie className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">4. Types of Cookies We Use</h2>
                  </div>
                  <div className="space-y-12">
                    {COOKIE_TYPES.map((type, i) => (
                      <div key={i} className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            {type.category}
                          </h3>
                          <p className="text-muted-foreground font-medium">{type.description}</p>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-border/50">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="bg-muted text-muted-foreground uppercase text-[10px] font-black tracking-widest">
                                <th className="px-6 py-4">Cookie Name</th>
                                <th className="px-6 py-4">Purpose</th>
                                <th className="px-6 py-4">Duration</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50 font-medium">
                              {type.items.map((item, j) => (
                                <tr key={j} className="hover:bg-muted/30 transition-colors">
                                  <td className="px-6 py-4 font-bold text-primary">{item.name}</td>
                                  <td className="px-6 py-4 max-w-sm">{item.purpose}</td>
                                  <td className="px-6 py-4">{item.duration}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* Third Party */}
              <motion.section 
                  id="third-party"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24 group"
              >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                     <h2 className="text-2xl font-black tracking-tight">5. Third-Party Cookies</h2>
                  </div>
                  <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                    <p className="text-lg text-muted-foreground font-medium">
                      In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the platform and deliver advertisements on and through the platform.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 font-bold">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <Link href="https://policies.google.com/technologies/cookies" className="hover:underline">Google Analytics</Link>
                      </li>
                    </ul>
                  </div>
                  <hr className="mt-16 border-border/40" />
              </motion.section>

              {/* Managing Preferences */}
               <motion.section 
                  id="managing-preferences"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-24 group"
              >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Settings className="h-5 w-5" />
                    </div>
                     <h2 className="text-2xl font-black tracking-tight">6. Managing Your Preferences</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                    <p>
                      Most web browsers allow you to manage cookies through the browser settings. If you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our platform.
                    </p>
                    <div className="mt-8 space-y-4">
                      <p className="font-black text-foreground">How to manage cookies in popular browsers:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Chrome', 'Safari', 'Firefox', 'Microsoft Edge'].map((browser) => (
                          <div key={browser} className="px-4 py-3 rounded-xl bg-muted/50 text-center font-bold text-sm border border-border/50">
                            {browser}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr className="mt-16 border-border/40" />
              </motion.section>

               {/* Contact */}
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
                     <h2 className="text-2xl font-black tracking-tight">8. Contact Us</h2>
                  </div>
                  <Card className="rounded-3xl border-none bg-muted/30 p-8 flex flex-col md:row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="space-y-2 relative z-10">
                      <h3 className="text-xl font-bold">Have questions about our cookies?</h3>
                      <p className="text-muted-foreground font-medium">Our legal and support team is here to clarify any concerns.</p>
                    </div>
                    <Link href="/contact-us" className="relative z-10">
                      <Button size="lg" className="rounded-full font-black px-8 cursor-pointer hover:scale-105 transition-transform">
                        Contact Support <Mail className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </Card>
              </motion.section>

            </div>
           </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
