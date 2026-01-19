import Link from "next/link"

export function AuthFooter() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookies Policy", href: "/cookies-policy" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  return (
    <footer className="py-8 border-t border-border/40 bg-background/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <p className="order-2 md:order-1">
            © {currentYear} HealthHub Inc. All rights reserved.
          </p>
          
          <nav className="flex items-center gap-6 md:gap-8 order-1 md:order-2">
            {footerLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="hover:text-primary transition-colors duration-200"
              >
                {link.name.split(" ")[0]} {/* Responsive: show first word only on very small screens? Actually just keep names, they aren't that long */}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
