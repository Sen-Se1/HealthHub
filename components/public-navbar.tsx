"use client"

import Link from "next/link"
import { Stethoscope, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PublicNavbarProps {
  activePage?: string
}

export function PublicNavbar({ activePage }: PublicNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: "About", href: "/about-us" },
    { name: "FAQ", href: "/faq" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact-us" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Stethoscope className="text-white h-5 w-5" />
          </div>
          <span className="font-black text-xl tracking-tighter text-foreground">HealthHub</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-sm font-bold transition-colors ${activePage === link.name ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-border" />
          <Link href="/auth/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">Sign In</Link>
          <Link href="/auth/register">
            <Button className="h-9 rounded-full px-5 font-bold shadow-lg shadow-primary/20">Get Started</Button>
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border/40 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-black tracking-tight ${activePage === link.name ? 'text-primary' : 'text-foreground'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border/50" />
              <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-lg font-black tracking-tight text-foreground">Sign In</Link>
              <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full h-12 rounded-2xl font-black text-lg shadow-lg shadow-primary/20">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
