"use client"

import Link from "next/link"
import { Stethoscope, Mail, Phone, Heart, Twitter, Linkedin, Github, ChevronDown } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const currentYear = 2026

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us" },
      { name: "Careers", href: "/careers" },
      { name: "Contact Us", href: "/contact-us" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookies Policy", href: "/cookies-policy" },
      { name: "Legal Notes", href: "/legal-notes" },
    ]
  },
  {
    title: "Support",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Help / Support", href: "/contact-us" },
      { name: "support@healthhub.com", href: "mailto:support@healthhub.com", isEmail: true },
    ]
  }
]

export function PublicFooter() {

  return (
    <footer className="bg-muted/30 border-t border-border/40 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-300">
                <Stethoscope className="text-white h-7 w-7" />
              </div>
              <span className="font-bold text-3xl tracking-tight text-foreground">HealthHub</span>
            </Link>
            <p className="text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
              Book doctor appointments easily and securely.
              Empowering patients and doctors with seamless digital healthcare experiences.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Nav Columns - Desktop */}
          <div className="hidden lg:grid lg:col-span-8 grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-8 px-1 border-l-2 border-primary/20">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm inline-flex items-center group"
                      >
                        {link.name}
                        {!link.isEmail && (
                          <motion.span 
                            initial={{ width: 0, opacity: 0 }}
                            whileHover={{ width: "auto", opacity: 1 }}
                            className="ml-1"
                          >
                            <Heart className="h-3 w-3 fill-primary text-primary" />
                          </motion.span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Nav Sections - Mobile Accordion */}
          <div className="lg:hidden space-y-4">
            {footerSections.map((section) => (
              <MobileFooterSection key={section.title} section={section} />
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 pt-10 mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground font-medium text-sm">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>© {currentYear} HealthHub. All rights reserved.</p>
              <span className="hidden md:inline text-border">|</span>
              <p className="flex items-center gap-1">
                Built with <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" /> for better healthcare
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="/cookies-policy" className="hover:text-primary transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function MobileFooterSection({ section }: { section: typeof footerSections[0] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-background/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-bold text-sm uppercase tracking-widest text-foreground">
          {section.title}
        </span>
        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ul className="px-5 pb-5 pt-0 space-y-4">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
