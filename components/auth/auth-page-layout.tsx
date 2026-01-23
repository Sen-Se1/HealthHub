"use client"

import { motion } from "framer-motion"
import { AuthIllustration } from "./auth-illustration"
import { AuthTrustIndicators } from "./auth-trust-indicators"

interface AuthPageLayoutProps {
  children: React.ReactNode
  illustration: {
    imageSrc: string
    imageAlt: string
    title: string
    description: string
  }
}

export function AuthPageLayout({ children, illustration }: AuthPageLayoutProps) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
      <AuthIllustration {...illustration} />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:bg-background relative">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md space-y-8 relative z-10"
        >
          {children}
          <AuthTrustIndicators />
        </motion.div>
        
        {/* Background Decorations for mobile */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] z-0 lg:hidden" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] z-0 lg:hidden" />
      </div>
    </div>
  )
}
