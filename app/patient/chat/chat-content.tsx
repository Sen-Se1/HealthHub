"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChatWindow } from "@/components/chat/chat-window"
import { MessageSquare, Search, Plus, ArrowLeft, ArrowRight, UserPlus, Sparkles } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Conversation {
    id: number
    appointmentId: number
    doctorName: string
    doctorId: number
    specialty: string
    profilePictureUrl?: string
    lastMessage?: string
    time?: string
    unreadCount?: number
    isOnline?: boolean
}

export function ChatSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 h-full">
            <Card className="rounded-4xl border-border/50 p-6 space-y-6 hidden lg:block">
                <Skeleton className="h-10 w-full rounded-2xl" />
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3">
                            <Skeleton className="h-14 w-14 rounded-2xl" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-3/4 rounded-full" />
                                <Skeleton className="h-3 w-1/2 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <Skeleton className="h-full w-full rounded-4xl" />
        </div>
    )
}

export default function ChatContent() {
    const router = useRouter()
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
    const [currentUserId, setCurrentUserId] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [showSidebarOnMobile, setShowSidebarOnMobile] = useState(true)

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const profileRes = await fetch("/api/user/profile")
                if (profileRes.ok) {
                    const profileData = await profileRes.json()
                    setCurrentUserId(profileData.user.id)
                }

                const res = await fetch("/api/appointments/list")
                if (res.ok) {
                    const data = await res.json()
                    const appts = data.appointments || []

                    if (appts.length === 0) {
                        // Mock data for demonstration if no appointments
                        const mockConvs: Conversation[] = [
                            {
                                id: 1, appointmentId: 101, doctorName: "Dr. Sarah Adams", doctorId: 1,
                                specialty: "Cardiologist", lastMessage: "Your latest blood test results look very promising. Let's discuss them.",
                                time: "10:24 AM", unreadCount: 2, isOnline: true
                            },
                            {
                                id: 2, appointmentId: 102, doctorName: "Dr. James Wilson", doctorId: 2,
                                specialty: "General Physician", lastMessage: "I've sent the prescription to your pharmacy.",
                                time: "Yesterday", unreadCount: 0, isOnline: false
                            }
                        ]
                        setConversations(mockConvs)
                    } else {
                        const convs = appts
                            .filter((apt: any) => apt.status === "approved" || apt.status === "completed")
                            .map((apt: any) => ({
                                id: apt.id,
                                appointmentId: apt.id,
                                doctorName: `Dr. ${apt.first_name} ${apt.last_name}`,
                                doctorId: apt.doctor_id,
                                specialty: apt.specialization || "Specialist",
                                profilePictureUrl: apt.profile_picture_url,
                                lastMessage: "Consultation channel open",
                                time: "Recently",
                                unreadCount: 0,
                                isOnline: Math.random() > 0.5
                            }))
                        setConversations(convs)
                    }
                }
            } catch (err) {
                console.error("Error fetching conversations:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchConversations()
    }, [router])

    const filteredConversations = conversations.filter(c =>
        c.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelectConversation = (conv: Conversation) => {
        setSelectedConversation(conv)
        setShowSidebarOnMobile(false)
    }

    if (loading) return <ChatSkeleton />

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 h-[calc(100vh-16rem)] min-h-[650px] relative overflow-hidden">
            {/* Sidebar */}
            <motion.div
                className={cn(
                    "lg:block h-full transition-all duration-500",
                    !showSidebarOnMobile && "hidden lg:block"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Card className="h-full bg-card/40 glass-card border-border/50 overflow-hidden flex flex-col rounded-4xl shadow-2xl backdrop-blur-xl">
                    <div className="p-8 pb-4 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black tracking-tight">Messages</h2>
                                <p className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-[0.2em]">Consultations</p>
                            </div>
                            <Button variant="secondary" size="icon" className="rounded-2xl shadow-xl h-10 w-10 border border-border/30 bg-background/50">
                                <Plus className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-primary opacity-40 group-focus-within:opacity-100 transition-opacity" />
                            </div>
                            <Input
                                placeholder="Search doctor or specialty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-11 h-12 bg-secondary/30 border-transparent rounded-2xl font-bold placeholder:text-muted-foreground/30 text-sm focus-visible:ring-primary/20 focus-visible:bg-white/40 transition-all"
                            />
                        </div>
                    </div>

                    <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
                        {filteredConversations.length === 0 ? (
                            <div className="px-8 py-20 text-center flex flex-col items-center justify-center h-full space-y-6">
                                <div className="h-20 w-20 bg-linear-to-br from-secondary to-background rounded-full flex items-center justify-center shadow-inner">
                                    <MessageSquare className="h-8 w-8 text-muted-foreground/40" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-black text-muted-foreground opacity-60">
                                        No active conversations.
                                    </p>
                                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest leading-relaxed">
                                        Your private messages with doctors will appear here.
                                    </p>
                                </div>
                                <Link href="/patient/find-doctors">
                                    <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] uppercase tracking-widest border-primary/20 text-primary hover:bg-primary/5">
                                        FIND A DOCTOR
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="px-3 pb-8 space-y-1 mt-4">
                                {filteredConversations.map((conv) => (
                                    <motion.button
                                        key={conv.id}
                                        layout
                                        onClick={() => handleSelectConversation(conv)}
                                        className={cn(
                                            "w-full text-left p-4 rounded-3xl transition-all duration-300 flex items-center gap-4 group relative overflow-hidden",
                                            selectedConversation?.id === conv.id
                                                ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30 scale-[1.02] z-10"
                                                : "hover:bg-primary/5 active:scale-98"
                                        )}
                                    >
                                        <div className="relative shrink-0">
                                            <Avatar className="h-14 w-14 rounded-2xl border-2 border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300">
                                                <AvatarImage src={conv.profilePictureUrl} className="object-cover" />
                                                <AvatarFallback className={cn(
                                                    "font-black text-lg",
                                                    selectedConversation?.id === conv.id ? "bg-white/20 text-white" : "bg-secondary text-primary"
                                                )}>
                                                    {conv.doctorName.split("Dr. ")[1]?.[0] || conv.doctorName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            {conv.isOnline && (
                                                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background shadow-lg" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h3 className="font-black text-xs truncate tracking-tight uppercase">
                                                    {conv.doctorName}
                                                </h3>
                                                <span className={cn(
                                                    "text-[8px] font-black uppercase tracking-tighter",
                                                    selectedConversation?.id === conv.id ? "text-white/60" : "text-muted-foreground/40"
                                                )}>
                                                    {conv.time}
                                                </span>
                                            </div>
                                            <p className={cn(
                                                "text-[10px] font-black uppercase tracking-widest mb-1 opacity-60",
                                                selectedConversation?.id === conv.id ? "text-white" : "text-primary"
                                            )}>
                                                {conv.specialty}
                                            </p>
                                            <p className={cn(
                                                "text-xs truncate font-medium leading-tight",
                                                selectedConversation?.id === conv.id ? "text-white/80" : "text-muted-foreground/70"
                                            )}>
                                                {conv.lastMessage}
                                            </p>
                                        </div>

                                        {conv.unreadCount ? conv.unreadCount > 0 && selectedConversation?.id !== conv.id && (
                                            <Badge className="absolute top-4 right-4 bg-primary text-white text-[9px] font-black h-5 w-5 flex items-center justify-center p-0 rounded-full border-2 border-background shadow-xl scale-110">
                                                {conv.unreadCount}
                                            </Badge>
                                        ) : null}
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Main Area */}
            <motion.div
                className={cn(
                    "h-full lg:block transition-all duration-500",
                    showSidebarOnMobile && "hidden lg:block"
                )}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <AnimatePresence mode="wait">
                    {selectedConversation && currentUserId ? (
                        <motion.div
                            key={selectedConversation.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="h-full relative"
                        >
                            {/* Mobile Back Button */}
                            <div className="lg:hidden absolute top-4 left-4 z-50">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => setShowSidebarOnMobile(true)}
                                    className="rounded-2xl h-10 w-10 shadow-xl border border-border/30 backdrop-blur-md bg-background/50"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </div>

                            <ChatWindow
                                conversationId={selectedConversation.id}
                                currentUserId={currentUserId}
                                otherUserName={selectedConversation.doctorName}
                            />
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                            <Card className="bg-card glass-card border-border/50 rounded-4xl h-full flex items-center justify-center shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full -ml-32 -mb-32 blur-[100px] pointer-events-none" />

                                <div className="text-center p-10 relative z-10 space-y-10">
                                    <div className="relative mx-auto w-32 h-32">
                                        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse scale-150 blur-3xl" />
                                        <div className="h-32 w-32 bg-linear-to-br from-primary/20 via-primary/5 to-transparent rounded-full flex items-center justify-center relative z-10 shadow-2xl border border-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                                            <MessageSquare className="h-14 w-14 text-primary" />
                                        </div>
                                        <div className="absolute -top-4 -right-4 h-12 w-12 bg-accent rounded-full flex items-center justify-center border-4 border-background shadow-xl animate-bounce">
                                            <Sparkles className="h-6 w-6 text-white" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-black text-foreground tracking-tight">Private Healthcare Channel</h3>
                                        <p className="text-muted-foreground max-w-sm mx-auto text-lg font-medium leading-relaxed italic opacity-80">
                                            Direct communication with your specialists. Select a conversation to view detailed history and latest updates.
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center gap-6 pt-4">
                                        <div className="flex items-center gap-3 bg-secondary/30 px-6 py-3 rounded-full border border-border/40 backdrop-blur-sm">
                                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground">All Systems Operational</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-primary">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Secure Lock System Active</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
