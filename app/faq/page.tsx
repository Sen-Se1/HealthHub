"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, ChevronDown, 
  User, UserPlus, Calendar, CreditCard, 
  ShieldCheck, HelpCircle, ArrowRight,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicNavbar } from "@/components/public-navbar"
import { PublicFooter } from "@/components/public-footer"

const FAQ_DATA = [
  {
    category: "patients",
    items: [
      { id: "p1", question: "How do I book an appointment?", answer: "To book an appointment, simply use the search bar on the homepage to find a specialist. Once you've found a doctor that fits your needs, click 'Book Appointment', choose an available time slot, and confirm your booking." },
      { id: "p2", question: "Can I cancel or reschedule?", answer: "Yes, you can cancel or reschedule up to 24 hours before your appointment through your patient dashboard. For late cancellations, please contact the clinic directly." },
      { id: "p3", question: "Is online consultation available?", answer: "Many of our doctors offer tele-health consultations. Look for the 'Video Consult' badge on doctor profiles or filter by 'Online Available' in your search." },
      { id: "p4", question: "Is my medical data secure?", answer: "Absolutely. HealthHub uses 256-bit AES encryption and is fully HIPAA compliant. Your medical records are only accessible to you and the healthcare providers you authorize." }
    ]
  },
  {
    category: "doctors",
    items: [
      { id: "d1", question: "How do I register as a doctor?", answer: "Click 'Join as Doctor' in the footer or navigation menu. You'll need to provide your medical license details, specialization, and professional background for our verification team." },
      { id: "d2", question: "How do I manage appointment requests?", answer: "Your doctor dashboard allows you to view, accept, or reschedule incoming requests. You can also set your availability and vacation days in the 'Calendar' tab." },
      { id: "d3", question: "Can I chat with patients?", answer: "Yes, HealthHub includes a secure messaging system that becomes active once an appointment is confirmed, allowing you to discuss symptoms or follow-ups safely." },
      { id: "d4", question: "How do I update my profile?", answer: "Go to your Profile settings to update your photo, bio, qualifications, and clinic address. These changes go live immediately to help patients find you." }
    ]
  },
  {
    category: "appointments",
    items: [
      { id: "a1", question: "How long is an appointment?", answer: "A typical initial consultation is 30 minutes, though this varies by specialty. Follow-ups are usually 15-20 minutes." },
      { id: "a2", question: "What happens if a doctor cancels?", answer: "If a doctor cancels, you will receive an immediate notification. You'll be given the option to reschedule with the same doctor or receive a list of available alternatives." },
      { id: "a3", question: "Do I get reminders?", answer: "Yes! We send SMS and email reminders 24 hours and 2 hours before your scheduled visit to ensure you never miss an appointment." }
    ]
  },
  {
    category: "payments",
    items: [
      { id: "py1", question: "How do payments work?", answer: "You can pay securely using credit/debit cards or health insurance. Payment is typically processed after the consultation is completed." },
      { id: "py2", question: "Are refunds available?", answer: "Refunds are processed automatically for cancellations made 24+ hours in advance. For other cases, please refer to our refund policy or contact support." }
    ]
  },
  {
    category: "security",
    items: [
      { id: "s1", question: "How is my data protected?", answer: "We use bank-grade encryption and stay compliant with global healthcare data standards. Our servers are monitored 24/7 for any unauthorized access." },
      { id: "s2", question: "Who can see my information?", answer: "Only you and the doctors you have booked appointments with can see your medical history. Our staff only has access to administrative data needed for support." }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [openItem, setOpenItem] = useState<string | null>(null)

  const filteredData = useMemo(() => {
    let result = FAQ_DATA

    if (activeTab !== "all") {
      result = result.filter(cat => cat.category === activeTab)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.map(cat => ({
        ...cat,
        items: cat.items.filter(item => 
          item.question.toLowerCase().includes(query) || 
          item.answer.toLowerCase().includes(query)
        )
      })).filter(cat => cat.items.length > 0)
    }

    return result
  }, [activeTab, searchQuery])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/10 to-transparent -z-10 hidden lg:block" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black mb-6"
            >
              <HelpCircle className="h-4 w-4" /> HELP CENTER
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none"
            >
              Frequently Asked <span className="text-primary">Questions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto"
            >
              Find quick answers to common questions from patients and doctors. We're here to help you get the most out of HealthHub.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for a question..." 
                className="h-14 pl-12 pr-4 bg-background border-border/50 shadow-2xl shadow-primary/5 text-lg rounded-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories & Content */}
      <section className="py-20 bg-muted/30 grow">
        <div className="container mx-auto px-4 max-w-5xl">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-background/50 backdrop-blur-md border border-border/50 p-1 h-14 rounded-2xl shadow-xl overflow-x-auto max-w-full no-scrollbar">
                <TabsTrigger value="all" className="px-6 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">All Topics</TabsTrigger>
                <TabsTrigger value="patients" className="px-6 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Patients</TabsTrigger>
                <TabsTrigger value="doctors" className="px-6 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Doctors</TabsTrigger>
                <TabsTrigger value="appointments" className="px-6 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Appointments</TabsTrigger>
                <TabsTrigger value="payments" className="px-6 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Payments</TabsTrigger>
                <TabsTrigger value="security" className="px-6 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Security</TabsTrigger>
              </TabsList>
            </div>

            <div className="space-y-12">
              {filteredData.length > 0 ? (
                filteredData.map((category) => (
                  <div key={category.category} className="space-y-6">
                    <h3 className="text-2xl font-black tracking-tight text-primary capitalize flex items-center gap-3">
                      {category.category === 'patients' && <User className="h-6 w-6" />}
                      {category.category === 'doctors' && <UserPlus className="h-6 w-6" />}
                      {category.category === 'appointments' && <Calendar className="h-6 w-6" />}
                      {category.category === 'payments' && <CreditCard className="h-6 w-6" />}
                      {category.category === 'security' && <ShieldCheck className="h-6 w-6" />}
                      {category.category}
                    </h3>
                    <div className="grid gap-4">
                      {category.items.map((item) => (
                        <Card 
                          key={item.id} 
                          className={`border-none shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden ${openItem === item.id ? 'ring-2 ring-primary/20 bg-background' : 'bg-background hover:bg-muted/50'}`}
                        >
                          <button
                            onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                            className="w-full text-left p-6 flex items-center justify-between group"
                          >
                            <span className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                              {item.question}
                            </span>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all ${openItem === item.id ? 'bg-primary text-white scale-110 rotate-180' : 'bg-primary/5 text-primary group-hover:bg-primary/10'}`}>
                              <ChevronDown className="h-5 w-5" />
                            </div>
                          </button>
                          <AnimatePresence>
                            {openItem === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <CardContent className="px-6 pb-6 pt-0">
                                  <div className="h-px bg-border/50 mb-6" />
                                  <p className="text-muted-foreground font-medium leading-relaxed text-lg">
                                    {item.answer}
                                  </p>
                                </CardContent>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 px-4">
                  <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">No results found</h3>
                  <p className="text-muted-foreground font-medium">Try searching with different keywords or check another category.</p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="py-32 bg-background border-t border-border/40">
        <div className="container mx-auto px-4">
          <Card className="rounded-[3rem] border-none bg-primary/5 p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none">Still have questions?</h2>
              <p className="text-xl text-muted-foreground font-medium mb-10">
                Can't find the answer you're looking for? Please reach out to our friendly support team for personal assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact-us" className="w-full sm:w-auto">
                  <Button size="lg" className="cursor-pointer h-14 px-8 rounded-full font-black text-lg bg-primary hover:bg-primary/80 shadow-xl shadow-primary/20 w-full transition-all duration-300">
                      Contact Support <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/login" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="cursor-pointer h-14 px-8 rounded-full font-black text-lg border-2 border-primary/20 text-primary hover:bg-primary hover:text-white w-full transition-all duration-300">
                      Sign In to Account
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
