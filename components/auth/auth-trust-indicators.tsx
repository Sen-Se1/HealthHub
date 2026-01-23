"use client"

import { ShieldCheck, Lock } from "lucide-react"

export function AuthTrustIndicators() {
  return (
    <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest font-black text-muted-foreground/50 border-t border-border/40 pt-6">
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="h-3 w-3" /> HIPAA Compliant
      </span>
      <span className="flex items-center gap-1.5">
        <Lock className="h-3 w-3" /> 256-bit AES
      </span>
    </div>
  )
}
