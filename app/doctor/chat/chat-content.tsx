"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChatWindow } from "@/components/chat/chat-window"
import { MessageSquare, User, Search } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"

interface Conversation {
  id: number
  patient_id: number
  patient_name: string
  last_message?: string
  updated_at: string
}

export default function DoctorChatContent() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchConversations = async () => {
      // Token is now handled via HttpOnly cookie
      try {
        const userRes = await fetch("/api/user/profile")
        if (userRes.ok) {
          const userData = await userRes.json()
          setUserId(userData.user.id)
        }

        const res = await fetch("/api/chat/conversations?role=doctor")
        if (res.ok) {
          const data = await res.json()
          setConversations(data.conversations || [])
        }
      } catch (err) {
        console.error("[v0] Error fetching conversations:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [router])

  const filteredConversations = conversations.filter(conv => 
    conv.patient_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-72" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
             <Skeleton className="h-full w-full rounded-xl" />
             <Skeleton className="h-full w-full lg:col-span-2 rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate" className="container mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Chat with your patients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Conversations List */}
        <Card className="glass-card border-border lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Conversations
            </CardTitle>
            <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search patients..." 
                    className="pl-9 bg-secondary/50 border-transparent focus:bg-background transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                 <p className="text-muted-foreground">No conversations found</p>
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 cursor-pointer transition-all hover:bg-primary/5 ${
                      selectedConversation?.id === conv.id ? "bg-primary/10 border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                            <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                         {/* Online indicator could go here */}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                            <p className="font-semibold text-foreground truncate text-sm">{conv.patient_name}</p>
                            <span className="text-[10px] text-muted-foreground">{new Date(conv.updated_at).toLocaleDateString()}</span>
                        </div>
                        {conv.last_message && (
                          <p className="text-xs text-muted-foreground truncate">{conv.last_message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="glass-card border-border lg:col-span-2 overflow-hidden flex flex-col shadow-lg">
          {selectedConversation && userId ? (
            <ChatWindow
              conversationId={selectedConversation.id}
              currentUserId={userId}
              otherUserName={selectedConversation.patient_name}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-4 p-8">
              <div className="h-20 w-20 bg-secondary/50 rounded-full flex items-center justify-center animate-pulse">
                <MessageSquare className="h-10 w-10 opacity-50" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-lg text-foreground">Select a conversation</h3>
                <p>Choose a patient from the list to view your chat history.</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  )
}
