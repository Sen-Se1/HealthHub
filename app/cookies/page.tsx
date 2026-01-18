"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Stethoscope, ShieldCheck, Cookie, 
  Settings, Info, Lock, Globe, 
  ExternalLink, Mail, CheckCircle2,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModeToggle } from "@/components/ui/mode-toggle"

const SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "what-are-cookies", title: "2. What Are Cookies?" },
  { id: "how-we-use", title: "3. How We Use Cookies" },
  { id: "types-of-cookies", title: "4. Types of Cookies We Use" },
  { id: "third-party", title: "5. Third-Party Cookies" },
  { id: "managing-preferences", title: "6. Managing Your Preferences" },
  { id: "updates", title: "7. Updates to This Policy" },
  { id: "contact", title: "8. Contact Us" }
]

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

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <span className="text-sm font-bold text-foreground">Cookie Policy</span>
            <div className="h-4 w-px bg-border" />
            <Link href="/auth/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">Sign In</Link>
            <Link href="/auth/register">
              <Button className="h-9 rounded-full px-5 font-bold shadow-lg shadow-primary/20">Get Started</Button>
            </Link>
            <ModeToggle />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ModeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="font-bold">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

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
              <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Cookie className="h-6 w-6 text-secondary" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">LEGAL DOCUMENT</p>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
            >
              Cookie <span className="text-primary">Policy</span>
            </motion.h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xl text-muted-foreground font-medium">
                This page explains how and why we use cookies on our platform.
              </p>
              <div className="px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-bold text-muted-foreground">
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
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-4">Table of Contents</p>
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
              
              <section id="introduction" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">1. Introduction</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                  <p>
                    HealthHub ("we", "us", or "our") uses cookies and similar technologies to provide, customize, evaluate, improve, and secure our services. This Cookie Policy explains why we use these technologies and how you can control them.
                  </p>
                </div>
              </section>

              <section id="what-are-cookies" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">2. What Are Cookies?</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                  <p>
                    Cookies are small text files that are stored in your browser's directory. They help us understand things like how you navigate our site, whether you're logged in, and how we can make your experience faster and more secure.
                  </p>
                </div>
              </section>

              <section id="how-we-use" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">3. How We Use Cookies</h2>
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
              </section>

              <section id="types-of-cookies" className="scroll-mt-32 space-y-8">
                <h2 className="text-3xl font-black tracking-tighter">4. Types of Cookies We Use</h2>
                <div className="space-y-12">
                  {COOKIE_TYPES.map((type, i) => (
                    <div key={i} className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-secondary" />
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
              </section>

              <section id="third-party" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">5. Third-Party Cookies</h2>
                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                  <p className="text-lg text-muted-foreground font-medium">
                    In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the platform and deliver advertisements on and through the platform.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 font-bold">
                      <ExternalLink className="h-4 w-4 text-primary" />
                      <Link href="https://policies.google.com/technologies/cookies" className="hover:underline">Google Analytics</Link>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="managing-preferences" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">6. Managing Your Preferences</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
                  <p>
                    Most web browsers allow you to manage cookies through the browser settings. If you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our platform.
                  </p>
                  <div className="mt-8 space-y-4">
                    <p className="font-black text-foreground">How to manage cookies in popular browsers:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Chrome', 'Safari', 'Firefox', 'Microsoft Edge'].map((browser) => (
                        <div key={browser} className="px-4 py-3 rounded-xl bg-muted/50 text-center font-bold text-sm">
                          {browser}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section id="contact" className="scroll-mt-32 space-y-6">
                <h2 className="text-3xl font-black tracking-tighter">8. Contact Us</h2>
                <Card className="rounded-3xl border-none bg-muted/30 p-8 flex flex-col md:row items-center justify-between gap-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Have questions about our cookies?</h3>
                    <p className="text-muted-foreground font-medium">Our legal and support team is here to clarify any concerns.</p>
                  </div>
                  <Link href="/contact-us">
                    <Button size="lg" className="rounded-full font-black px-8">
                      Contact Support <Mail className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </Card>
              </section>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border/40 py-20">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Stethoscope className="text-white h-6 w-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter">HealthHub</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-muted-foreground mb-8">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-primary">Cookie Policy</Link>
            <Link href="/contact-us" className="hover:text-primary transition-colors">Contact Support</Link>
            <Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          </div>
          <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto">
            © 2026 HealthHub Digital Healthcare. All rights reserved. 
            Protecting your data and privacy is our top priority.
          </p>
        </div>
      </footer>
    </div>
  )
}
