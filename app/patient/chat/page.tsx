"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ChatWindow } from "@/components/chat/chat-window"
import { MessageSquare, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

interface Conversation {
  id: number
  appointmentId: number
  doctorName: string
  doctorId: number
}

function ChatContent() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/auth/login")
      return
    }

    const fetchConversations = async () => {
      try {
        const res = await fetch("/api/appointments/list", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
          const data = await res.json()
          const convs = data.appointments
            .filter((apt: any) => apt.status === "approved")
            .map((apt: any) => ({
              id: apt.id,
              appointmentId: apt.id,
              doctorName: `Dr. ${apt.first_name} ${apt.last_name}`,
              doctorId: apt.doctor_id,
            }))
          setConversations(convs)
          setCurrentUserId(1) // Ideally get this from profile/token
        }
      } catch (err) {
        console.error("[v0] Error fetching conversations:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [router])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <Card className="lg:col-span-1 border-border">
             <div className="p-4 space-y-4">
                 {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="flex items-center gap-3">
                         <Skeleton className="h-10 w-10 rounded-full" />
                         <div className="space-y-2 flex-1">
                             <Skeleton className="h-4 w-3/4" />
                             <Skeleton className="h-3 w-1/2" />
                         </div>
                     </div>
                 ))}
             </div>
         </Card>
         <Skeleton className="lg:col-span-3 h-[500px] w-full rounded-xl" />
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] min-h-[600px]"
    >
      {/* Conversations List */}
      <Card className="lg:col-span-1 bg-card glass-card border-border overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border/50 bg-secondary/20">
            <h2 className="font-semibold">Recent Chats</h2>
        </div>
        <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
          {conversations.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center justify-center h-full">
              <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                No conversations yet. Book an approved appointment to start chatting.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full text-left p-4 transition-all duration-200 hover:bg-secondary/50 ${
                    selectedConversation?.id === conv.id
                      ? "bg-primary/10 border-l-4 border-primary pl-3"
                      : "border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                         selectedConversation?.id === conv.id ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                    }`}>
                      <span className="font-bold text-sm">
                        {conv.doctorName.split(" ")[1]?.[0] || "D"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className={`font-medium text-sm truncate ${selectedConversation?.id === conv.id ? "text-primary" : "text-foreground"}`}>
                          {conv.doctorName}
                      </p>
                      <p className="text-xs text-muted-foreground">Appointment #{conv.appointmentId}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Window */}
      <div className="lg:col-span-3 h-full">
        <AnimatePresence mode="wait">
        {selectedConversation && currentUserId ? (
          <motion.div 
            key={selectedConversation.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full"
          >
            <ChatWindow
              conversationId={selectedConversation.id}
              currentUserId={currentUserId}
              otherUserName={selectedConversation.doctorName}
            />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full"
          >
            <Card className="bg-card glass-card border-border h-full flex items-center justify-center">
                <div className="text-center p-8">
                <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                     <MessageSquare className="h-10 w-10 text-primary/50" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Select a Conversation</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">Click on a doctor from the list to start messaging securely.</p>
                </div>
            </Card>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ChatPage() {
    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-100px)]">
             <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-1">Messages</h1>
                <p className="text-muted-foreground">Secure communication with your healthcare providers</p>
            </div>
            <Suspense fallback={
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <Card className="lg:col-span-1 border-border">
                        <div className="p-4 space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Skeleton className="lg:col-span-3 h-[500px] w-full rounded-xl" />
                </div>
            }>
                <ChatContent />
            </Suspense>
        </div>
    )
}
