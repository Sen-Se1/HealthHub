"use client"

import Link from "next/link"
import { Stethoscope, Mail, Phone, Heart } from "lucide-react"

export function PublicFooter() {
  return (
    <footer className="bg-muted/50 border-t border-border/40 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Stethoscope className="text-white h-6 w-6" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-foreground">HealthHub</span>
            </Link>
            <p className="text-muted-foreground font-medium leading-relaxed italic">
              Empowering patients and doctors with seamless digital healthcare experiences. 
              Accessible, secure, and compassionate care for everyone.
            </p>
          </div>
          <div>
            <h4 className="font-black text-lg mb-6 tracking-tight uppercase tracking-widest text-[10px] text-muted-foreground">Company</h4>
            <ul className="space-y-4 text-muted-foreground font-medium italic text-sm">
              <li><Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact-us" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-lg mb-6 tracking-tight uppercase tracking-widest text-[10px] text-muted-foreground">Legal</h4>
            <ul className="space-y-4 text-muted-foreground font-medium italic text-sm">
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/legal-notes" className="hover:text-primary transition-colors">Legal Disclosure</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-lg mb-6 tracking-tight uppercase tracking-widest text-[10px] text-muted-foreground">Support</h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Email Us</p>
                  <p className="text-sm font-bold">support@healthhub.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Call Us</p>
                  <p className="text-sm font-bold">+1 (800) HEALTH-HUB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-px bg-border/40 my-12" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground font-medium text-sm">
          <p>© {new Date().getFullYear()} HealthHub Digital Healthcare. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with <Heart className="h-4 w-4 text-red-500 fill-current" /> by HealthHub Team
          </p>
        </div>
      </div>
    </footer>
  )
}
