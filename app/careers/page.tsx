"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Stethoscope, Zap, Users, ShieldCheck, 
  MapPin, Clock, Briefcase, ArrowRight, 
  CheckCircle2, Heart, GraduationCap, 
  Globe, Laptop, Target, Search,
  Filter, Plus, Minus, Send, Menu,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/ui/mode-toggle"

const JOBS = [
  {
    id: "j1",
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Join our core product team to build scalable healthcare solutions using Next.js, TypeScript, and Prisma.",
    requirements: [
      "5+ years of experience with React and Node.js",
      "Strong understanding of database design and performance",
      "Experience with healthcare data standards is a plus"
    ]
  },
  {
    id: "j2",
    title: "Product Designer (UX/UI)",
    department: "Design",
    location: "Hybrid / San Francisco",
    type: "Full-time",
    description: "Design intuitive and accessible experiences for patients and doctors across our digital platforms.",
    requirements: [
      "Portfolio showcasing end-to-end product design",
      "Expertise in Figma and design systems",
      "Passion for healthcare and human-centered design"
    ]
  },
  {
    id: "j3",
    title: "Customer Success Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
    description: "Help our medical partners get the most out of HealthHub through proactive support and onboarding.",
    requirements: [
      "Prior experience in B2B SaaS customer success",
      "Excellent communication and problem-solving skills",
      "Empathy for healthcare professionals and patients"
    ]
  },
  {
    id: "j4",
    title: "Security & Compliance Lead",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Lead our security initiatives and ensure HIPAA and GDPR compliance across all platform systems.",
    requirements: [
      "Deep knowledge of cloud security and encryption",
      "Experience with compliance audits and risk management",
      "Strong technical background in systems architecture"
    ]
  }
]

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDept, setActiveDept] = useState("All")
  const [openJobId, setOpenJobId] = useState<string | null>(null)

  const departments = ["All", "Engineering", "Design", "Operations", "Product"]

  const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           job.department.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDept = activeDept === "All" || job.department === activeDept
      return matchesSearch && matchesDept
    })
  }, [searchQuery, activeDept])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Stethoscope className="text-white h-5 w-5" />
            </div>
            <span className="font-black text-xl tracking-tighter text-foreground">HealthHub</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <span className="text-sm font-bold text-foreground">Careers</span>
            <div className="h-4 w-px bg-border" />
            <Link href="/auth/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">Sign In</Link>
            <Link href="/auth/register">
              <Button className="h-9 rounded-full px-5 font-bold shadow-lg shadow-primary/20">Get Started</Button>
            </Link>
            <ModeToggle />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ModeToggle />
            <Link href="/auth/login" className="text-muted-foreground">
              <Button variant="ghost" size="sm" className="font-bold">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-secondary/5 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black mb-6"
            >
              <Users className="h-4 w-4" /> WE ARE HIRING
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none"
            >
              Build the Future of <br className="hidden md:block" />
              <span className="text-primary">Medical Care</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground font-medium mb-12 max-w-2xl mx-auto italic"
            >
              Join a mission-driven team dedicated to making healthcare accessible, organized, and digital-first for everyone.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#open-positions">
                <Button size="lg" className="h-14 px-10 rounded-full font-black text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                  View Open Positions
                </Button>
              </a>
              <Link href="/about-us">
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-full font-black text-lg border-2">
                  Our Culture
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-20">
            <h2 className="text-4xl font-black tracking-tighter mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground font-medium text-lg italic">The values that define our workplace and your growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Meaningful Impact", desc: "Your work directly improves how millions of patients access healthcare." },
              { icon: Globe, title: "Flexible Work", desc: "We prioritize results over hours, with a remote-friendly and supportive culture." },
              { icon: GraduationCap, title: "Growth & Learning", desc: "Enjoy dedicated budgets for personal development and career progression." },
              { icon: Heart, title: "Supportive Team", desc: "Join a diverse group of passionate individuals who value collaboration." }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all rounded-3xl p-8 group overflow-hidden relative">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <card.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{card.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed italic">{card.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative aspect-square md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl"
             >
               <Image 
                 src="https://images.unsplash.com/photo-1573164067507-40e1d6a9272c?q=80&w=2069&auto=format&fit=crop"
                 alt="Collaboration"
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent" />
             </motion.div>
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-8"
             >
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Our Culture & <span className="text-primary">Values</span></h2>
                  <p className="text-xl text-muted-foreground font-medium leading-relaxed italic">
                    We believe that the best healthcare experiences are built by happy, empowered, and diverse teams.
                  </p>
                </div>
                <div className="space-y-6">
                   {[
                     { title: "Mission-Driven", desc: "We are obsessed with improving patient outcomes." },
                     { title: "Innovation & Trust", desc: "We move fast, but never compromise on security." },
                     { title: "Diversity & Inclusion", desc: "Different perspectives drive our best solutions." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                       <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                       <div>
                         <h4 className="font-black text-lg">{item.title}</h4>
                         <p className="text-muted-foreground font-medium italic">{item.desc}</p>
                       </div>
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions Filter */}
      <section id="open-positions" className="py-24 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black tracking-tighter">Open Positions</h2>
            <p className="text-lg text-muted-foreground font-medium italic">Join our rapidly growing network of healthcare innovators.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by role..." 
                className="h-14 pl-12 pr-4 bg-background border-border/50 rounded-2xl font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex bg-background border border-border/50 rounded-2xl p-1 h-14 items-center">
               <div className="px-4 hidden sm:flex items-center gap-2 border-r border-border/50 text-muted-foreground">
                 <Filter className="h-4 w-4" />
                 <span className="text-xs font-black uppercase tracking-widest">Dept</span>
               </div>
               <div className="flex gap-1 overflow-x-auto no-scrollbar px-2">
                 {departments.map((dept) => (
                   <button
                     key={dept}
                     onClick={() => setActiveDept(dept)}
                     className={`px-4 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${activeDept === dept ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted'}`}
                   >
                     {dept}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <Card 
                      className={`border-none shadow-sm hover:shadow-md transition-all rounded-[2rem] overflow-hidden ${openJobId === job.id ? 'ring-2 ring-primary/20 bg-background scale-[1.01]' : 'bg-background hover:bg-background/80'}`}
                    >
                      <button
                        onClick={() => setOpenJobId(openJobId === job.id ? null : job.id)}
                        className="w-full text-left p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                      >
                        <div className="space-y-4 grow">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{job.title}</h3>
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none font-black px-3 py-1 uppercase text-[10px] tracking-widest">{job.department}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium text-sm italic">
                             <div className="flex items-center gap-2">
                               <MapPin className="h-4 w-4" /> {job.location}
                             </div>
                             <div className="flex items-center gap-2">
                               <Clock className="h-4 w-4" /> {job.type}
                             </div>
                          </div>
                        </div>
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-all ${openJobId === job.id ? 'bg-primary text-white rotate-180 scale-110' : 'bg-primary/5 text-primary group-hover:bg-primary/10'}`}>
                           <Plus className={`h-6 w-6 transition-transform ${openJobId === job.id ? 'hidden' : 'block'}`} />
                           <Minus className={`h-6 w-6 transition-transform ${openJobId === job.id ? 'block' : 'hidden'}`} />
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {openJobId === job.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <CardContent className="px-8 pb-8 pt-0">
                               <div className="h-px bg-border/50 mb-8" />
                               <div className="grid md:grid-cols-2 gap-12">
                                  <div className="space-y-6">
                                     <h4 className="text-lg font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                       <Info className="h-4 w-4" /> About the role
                                     </h4>
                                     <p className="text-muted-foreground font-medium leading-relaxed italic text-lg">
                                       {job.description}
                                     </p>
                                  </div>
                                  <div className="space-y-6">
                                     <h4 className="text-lg font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                       <CheckCircle2 className="h-4 w-4" /> Requirements
                                     </h4>
                                     <ul className="space-y-4">
                                       {job.requirements.map((req, idx) => (
                                         <li key={idx} className="flex gap-3 text-muted-foreground font-medium italic">
                                           <div className="h-2 w-2 rounded-full bg-secondary/50 mt-2 shrink-0" />
                                           <span>{req}</span>
                                         </li>
                                       ))}
                                     </ul>
                                  </div>
                               </div>
                               <div className="mt-12 flex justify-end">
                                  <Link href={`mailto:careers@healthhub.com?subject=Application for ${job.title}`}>
                                    <Button className="h-14 px-10 rounded-full font-black text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                                      Apply Now <Send className="ml-2 h-5 w-5" />
                                    </Button>
                                  </Link>
                               </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-24 bg-background border border-dashed border-border rounded-3xl">
                   <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Search className="h-10 w-10 text-muted-foreground opacity-20" />
                   </div>
                   <h3 className="text-2xl font-black mb-2">No roles found</h3>
                   <p className="text-muted-foreground font-medium italic">Try adjusting your filters or search keywords.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl font-black tracking-tighter">Benefits & <span className="text-primary italic">Perks</span></h2>
             <p className="text-lg text-muted-foreground font-medium italic">Taking care of you, so you can take care of our patients.</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { icon: ShieldCheck, title: "Health Insurance" },
                { icon: Laptop, title: "Remote Work" },
                { icon: Clock, title: "Paid Time Off" },
                { icon: GraduationCap, title: "Learning Budget" },
                { icon: Zap, title: "Modern Stack" }
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col items-center gap-4 text-center p-6 rounded-[2rem] bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-tight">{benefit.title}</h4>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Employment Process Timeline */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tighter">Application <span className="text-primary">Process</span></h2>
            <p className="text-lg text-muted-foreground font-medium italic">What to expect when joining our healthcare rocketship.</p>
          </div>
          <div className="relative">
             <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/10 -translate-y-1/2 hidden md:block" />
             <div className="grid md:grid-cols-3 gap-12 relative z-10">
                {[
                  { step: "01", title: "Apply Online", desc: "Submit your CV and portfolio through our simple portal." },
                  { step: "02", title: "Meet the Team", desc: "Collaborative interviews with potential teammates." },
                  { step: "03", title: "Join HealthHub", desc: "Receive your offer and begin your onboarding journey." }
                ].map((item, i) => (
                  <div key={i} className="bg-background border border-border/50 p-8 rounded-[2.5rem] relative group hover:border-primary/50 transition-all shadow-sm">
                    <div className="h-10 w-10 bg-primary text-white flex items-center justify-center rounded-full font-black text-xs mb-6 shadow-lg shadow-primary/20">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                    <p className="text-muted-foreground font-medium italic">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Send CV Anyway */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
           <Card className="rounded-[3rem] border-none bg-linear-to-br from-primary to-secondary p-12 md:p-20 text-center text-white relative overflow-hidden group shadow-2xl shadow-primary/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)] opacity-50 group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none italic">Don't see a role that fits?</h2>
                <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 italic">
                  We're always looking for talented individuals who share our passion for healthcare technology. Send us your CV anyway!
                </p>
                <Link href="mailto:careers@healthhub.com">
                  <Button size="lg" className="h-16 px-12 rounded-full font-black text-xl bg-white text-primary hover:bg-white/90 shadow-2xl">
                    Submit General Application <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              </div>
           </Card>
        </div>
      </section>

      {/* Footer */}
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
              <h4 className="font-black text-lg mb-6 tracking-tight uppercase tracking-widest text-[10px] text-muted-foreground">Resources</h4>
              <ul className="space-y-4 text-muted-foreground font-medium italic text-sm">
                <li><Link href="/about-us" className="hover:text-primary transition-colors">About Our Vision</Link></li>
                <li><Link href="/careers" className="text-primary font-black">Careers at HealthHub</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">Help Center / FAQ</Link></li>
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
              <h4 className="font-black text-lg mb-6 tracking-tight uppercase tracking-widest text-[10px] text-muted-foreground">Stay Connected</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center hover:border-primary transition-colors">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center hover:border-primary transition-colors">
                    <Laptop className="h-5 w-5 text-primary" />
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center hover:border-primary transition-colors">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-bold italic">© 2026 HealthHub Digital. <br />Making healthcare human again.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
