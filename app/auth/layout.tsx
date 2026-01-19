import { AuthNavbar } from "@/components/auth-navbar"
import { AuthFooter } from "@/components/auth-footer"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10">
      <AuthNavbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <AuthFooter />
    </div>
  )
}
