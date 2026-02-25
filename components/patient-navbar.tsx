"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarDays, Search, MessageSquare, User, LogOut, Menu, X, Bell, Settings, Stethoscope } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { AnimatePresence, motion } from "framer-motion"

interface UserProfile {
  first_name: string
  last_name: string
  email: string
  profile_picture_url?: string
}

export function PatientNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      // Token is now handled via HttpOnly cookie
      try {
        const res = await fetch("/api/user/profile")
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch (err) {
        console.error("Error fetching user:", err)
      }
    }

    fetchUser()

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchUser()
    }

    window.addEventListener("profile-updated", handleProfileUpdate)

    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("authToken") // Cleanup just in case, but no longer primary
      router.refresh()
      router.push("/auth/login")
    }
  }

  const navLinks = [
    { href: "/patient/dashboard", label: "Dashboard", icon: User },
    { href: "/patient/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/patient/find-doctors", label: "Find Doctors", icon: Search },
    { href: "/patient/chat", label: "Chat", icon: MessageSquare },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-white/70 dark:bg-[#020617]/80 backdrop-blur-xl supports-backdrop-filter:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/patient/dashboard" className="flex items-center gap-2 group relative z-50">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
              <Stethoscope className="text-white h-6 w-6" />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="font-bold text-xl tracking-tight text-foreground leading-none">HealthHub</span>
              <span className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">Healthcare</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${active
                    ? "text-blue-600 bg-blue-500/10 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                >
                  <Icon className={`h-4 w-4 transition-transform ${active ? "scale-110" : "group-hover:scale-110"}`} />
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-blue-600 hover:bg-blue-500/5">
                <Bell className="h-5 w-5" />
              </Button>
              <ModeToggle />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 px-2 h-10 hover:bg-secondary/60 rounded-full transition-all border border-transparent hover:border-border/50">
                  <div className="h-8 w-8 rounded-full border border-blue-500/10 shadow-sm flex items-center justify-center overflow-hidden bg-secondary">
                    {user?.profile_picture_url ? (
                      <img
                        src={user.profile_picture_url}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="hidden lg:flex flex-col items-start leading-none mr-1">
                    <span className="text-sm font-bold text-foreground">
                      {user ? `${user.first_name}` : "Account"}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5 opacity-60">Patient</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white dark:bg-[#0F172A] border-border/50 shadow-2xl p-2 rounded-2xl backdrop-blur-xl">
                <div className="px-4 py-4 mb-2 bg-secondary/40 dark:bg-slate-900/50 rounded-xl border border-border/50">
                  <p className="text-sm font-black text-foreground mb-0.5">
                    {user ? `${user.first_name} ${user.last_name}` : "Portal User"}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-muted-foreground truncate font-medium">{user?.email}</p>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" title="Active" />
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-border/30 my-1" />
                <DropdownMenuItem asChild className="rounded-xl focus:bg-blue-500/5 focus:text-blue-600 cursor-pointer font-bold text-xs uppercase tracking-tight">
                  <Link href="/patient/profile" className="flex items-center gap-2 w-full py-2.5 px-3">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-blue-500/5 focus:text-blue-600 cursor-pointer font-bold text-xs uppercase tracking-tight">
                  <Link href="/patient/settings" className="flex items-center gap-2 w-full py-2.5 px-3">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/30 my-1" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950/20 cursor-pointer my-1 font-black text-xs uppercase tracking-widest"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full h-10 w-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden py-4 border-t border-border overflow-hidden"
            >
              <div className="flex flex-col gap-1 pb-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  )
                })}
              </div>
              <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 rounded-xl mt-2">
                <span className="text-sm font-medium text-foreground">Theme</span>
                <ModeToggle />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
