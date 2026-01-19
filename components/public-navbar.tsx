"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Stethoscope, Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Careers", href: "/careers" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg border-b border-border/40 py-2 shadow-sm" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-50">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-all duration-300">
            <Stethoscope className="text-white h-6 w-6" />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-bold text-xl tracking-tight text-foreground leading-none">HealthHub</span>
            <span className="text-[10px] text-primary font-semibold tracking-widest uppercase">Healthcare</span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 bg-muted/50 dark:bg-muted/20 p-1 rounded-full border border-border/40">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                pathname === link.href 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              {pathname === link.href && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md shadow-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ModeToggle />
          <div className="h-4 w-px bg-border/60 mx-1" />
          <Link href="/auth/login">
            <Button variant="ghost" className="text-sm font-semibold hover:bg-primary/5 hover:text-primary transition-colors">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="rounded-full px-6 font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-3 relative z-50">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full bg-muted/50 hover:bg-muted"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 lg:hidden bg-background pt-24 px-6"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Navigation</span>
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl transition-all",
                    pathname === link.href 
                      ? "bg-primary/10 text-primary font-bold" 
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <span className="text-lg tracking-tight">{link.name}</span>
                  <ChevronRight className={cn("h-5 w-5 opacity-50", pathname === link.href && "opacity-100")} />
                </Link>
              ))}
              
              <div className="mt-8 pt-8 border-t border-border/50 flex flex-col gap-4">
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-semibold border-2">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="absolute bottom-10 left-6 right-6 text-center">
              <p className="text-sm text-muted-foreground">© 2026 HealthHub Platform</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
