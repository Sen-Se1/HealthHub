"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

interface AuthIllustrationProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
}

export function AuthIllustration({ imageSrc, imageAlt, title, description }: AuthIllustrationProps) {
  return (
    <div className="hidden lg:flex flex-[0.8] bg-muted/30 relative items-center justify-center p-12 overflow-hidden border-r border-border/40">
      <div className="absolute inset-0 bg-grid-white opacity-40" aria-hidden="true" />
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" aria-hidden="true" />
      
      <div className="relative z-10 max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/20 aspect-video glass-card">
            <Image 
              src={imageSrc} 
              alt={imageAlt} 
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-4">{title}</h1>
          <p className="text-base text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">{description}</p>
        </motion.div>
        
        <motion.div 
          className="mt-12 flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-12 rounded-full border-4 border-background bg-muted overflow-hidden">
                <Image 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} 
                  alt="User avatar" 
                  width={48} 
                  height={48} 
                />
              </div>
            ))}
          </div>
          <p className="text-sm font-bold text-primary flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Trusted by 50,000+ users worldwide
          </p>
        </motion.div>
      </div>
    </div>
  )
}
