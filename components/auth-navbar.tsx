"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Stethoscope, ArrowLeft } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { motion } from "framer-motion"

export function AuthNavbar() {
  const pathname = usePathname()

  // Contextual links based on current auth page
  const getContextualLink = () => {
    if (pathname === "/auth/login") {
      return { label: "Create account", href: "/auth/register" }
    }
    if (pathname === "/auth/register") {
      return { label: "Log in", href: "/auth/login" }
    }
    if (pathname === "/auth/forgot-password" || pathname === "/auth/reset-password") {
      return { label: "Back to Login", href: "/auth/login", icon: <ArrowLeft className="h-4 w-4 mr-2" /> }
    }
    return { label: "Log in", href: "/auth/login" }
  }

  const contextLink = getContextualLink()

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <Stethoscope className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">HealthHub</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <Link 
            href={contextLink.href}
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center"
          >
            {contextLink.icon}
            {contextLink.label}
          </Link>
          <div className="h-4 w-px bg-border/60" />
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
