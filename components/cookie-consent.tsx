"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X, Settings, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = (type: "all" | "essential") => {
    localStorage.setItem("cookie_consent", type === "all" ? "accepted" : "essential")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-100"
        >
          <div className="bg-background/80 backdrop-blur-2xl border border-primary/20 rounded-4xl p-6 shadow-[0_20px_50px_rgba(30,136,229,0.15)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Cookie className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-black tracking-tight">Cookie Preferences</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Privacy & Transparency</p>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="ml-auto p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground font-medium mb-6 leading-relaxed">
                We use cookies to improve your healthcare experience, analyze site usage, and ensure secure appointments. 
                Read our <Link href="/cookies" className="text-primary hover:underline font-bold">Cookie Policy</Link> for details.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => handleAccept("all")}
                  className="grow rounded-xl font-bold h-11 shadow-lg shadow-primary/20"
                >
                  Accept All
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleAccept("essential")}
                  className="grow rounded-xl font-bold h-11 border-primary/20 hover:bg-primary/5"
                >
                  Essential Only
                </Button>
                <Link href="/cookies" className="hidden sm:block">
                  <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-muted-foreground">
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
