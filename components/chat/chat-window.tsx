"use client"

import React from "react"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Video, Info, MoreVertical, Loader2, Smile, Paperclip, Lock, Check, CheckCheck } from "lucide-react"
import PusherClient from "pusher-js"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  id: number
  sender_id: number
  senderName: string
  message_text: string
  created_at: string
  status?: 'sent' | 'delivered' | 'read'
}

interface ChatWindowProps {
  conversationId: number
  currentUserId: number
  otherUserName: string
  specialty?: string
}

export function ChatWindow({ conversationId, currentUserId, otherUserName, specialty = "Specialist" }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pusherRef = useRef<PusherClient | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    let channel: any = null

    const initPusher = async () => {
      try {
        const res = await fetch("/api/config/pusher")
        const config = await res.json()

        if (config.key && !pusherRef.current) {
          pusherRef.current = new PusherClient(config.key, {
            cluster: config.cluster,
          })

          channel = pusherRef.current.subscribe(`chat-${conversationId}`)
          channel.bind("message", (data: any) => {
            setMessages((prev) => [...prev, { ...data, status: 'read' }])
          })
        }
      } catch (err) {
        console.error("Error initializing Pusher:", err)
      }
    }

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/messages?conversationId=${conversationId}`)
        const data = await res.json()
        if (data.messages && data.messages.length > 0) {
          setMessages(
            data.messages.map((m: any) => ({
              ...m,
              senderName: `${m.first_name} ${m.last_name}`,
              status: 'read'
            })),
          )
        } else {
          // Mock some initial messages for a premium feel if none exist
          const mockMessages: Message[] = [
            {
              id: 1, sender_id: 999, senderName: otherUserName,
              message_text: "Hello! I've reviewed your latest reports. Is there anything specific you'd like to discuss today?",
              created_at: new Date(Date.now() - 3600000).toISOString(), status: 'read'
            }
          ]
          setMessages(mockMessages)
        }
      } catch (err) {
        console.error("Error fetching messages:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
    initPusher()

    return () => {
      if (channel) channel.unbind_all()
      if (pusherRef.current) pusherRef.current.unsubscribe(`chat-${conversationId}`)
    }
  }, [conversationId, otherUserName])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const tempId = Date.now()
    const messageObj: Message = {
      id: tempId,
      sender_id: currentUserId,
      senderName: "Me",
      message_text: newMessage,
      created_at: new Date().toISOString(),
      status: 'sent'
    }

    setMessages(prev => [...prev, messageObj])
    setNewMessage("")

    try {
      await fetch("/api/chat/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, messageText: newMessage }),
      })
      // Update status to delivered/read after actual send
      setMessages(prev => prev.map(m => m.id === tempId ? { ...m, status: 'delivered' } : m))

      // Mock a doctor response for demo
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const doctorReply: Message = {
            id: Date.now() + 1,
            sender_id: 999,
            senderName: otherUserName,
            message_text: "Thank you for the update. I'll take a look and get back to you shortly.",
            created_at: new Date().toISOString()
          }
          setMessages(prev => [...prev, doctorReply])
        }, 2000)
      }, 1000)

    } catch (err) {
      console.error("Error sending message:", err)
    }
  }

  const formatDay = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) return "Today"
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
    return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <div className="space-y-1 text-center">
        <p className="text-foreground font-black uppercase text-[10px] tracking-widest">Initialising Secure Channel</p>
        <p className="text-muted-foreground text-xs font-medium italic">Establishing end-to-end encryption...</p>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-card/10 backdrop-blur-xl rounded-4xl border border-border/50 overflow-hidden shadow-3xl">
      {/* Header */}
      <TooltipProvider>
        <div className="p-6 border-b border-border/50 bg-background/60 backdrop-blur-xl flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-primary/20 shadow-xl">
                <AvatarFallback className="bg-linear-to-br from-primary to-blue-600 text-white font-black text-xl">
                  {otherUserName.split(" ")[1]?.[0] || otherUserName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-background animate-pulse shadow-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-foreground tracking-tight">{otherUserName}</h3>
                <Tooltip>
                  <TooltipTrigger>
                    <Lock className="h-3 w-3 text-primary/40" />
                  </TooltipTrigger>
                  <TooltipContent className="rounded-xl font-bold text-[10px] uppercase tracking-widest border-primary/10">
                    End-to-end encrypted
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-primary tracking-widest px-2 py-0.5 bg-primary/5 rounded-md border border-primary/10">
                  {specialty}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground italic opacity-60">Online Now</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/20 transition-all">
              <Phone className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/20 transition-all">
              <Video className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-secondary/80">
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </TooltipProvider>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar bg-linear-to-b from-transparent to-secondary/5 relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-secondary/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 shadow-xs">
            {formatDay(messages[0]?.created_at || new Date().toISOString())}
          </span>
        </div>

        <div className="pt-8 space-y-10">
          {messages.map((msg, i) => {
            const isMe = msg.sender_id === currentUserId
            const showDay = i > 0 && formatDay(messages[i - 1].created_at) !== formatDay(msg.created_at)

            return (
              <React.Fragment key={msg.id}>
                {showDay && (
                  <div className="flex justify-center my-10">
                    <span className="bg-secondary/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 shadow-xs">
                      {formatDay(msg.created_at)}
                    </span>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, x: isMe ? 20 : -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={cn("flex group", isMe ? "justify-end" : "justify-start")}
                >
                  <div className={cn(
                    "max-w-[75%] space-y-1.5",
                    isMe ? "flex flex-col items-end" : "flex flex-col items-start"
                  )}>
                    <div className={cn(
                      "relative px-6 py-4 rounded-4xl shadow-2xl transition-all duration-300",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-tr-sm shadow-primary/20"
                        : "bg-white dark:bg-card border border-border/50 text-foreground rounded-tl-sm shadow-card/20"
                    )}>
                      <p className="text-[15px] leading-relaxed font-medium">{msg.message_text}</p>

                      {/* Hover timestamp */}
                      <div className={cn(
                        "absolute bottom-0 translate-y-full pt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",
                        isMe ? "right-0" : "left-0"
                      )}>
                        <span className="text-[8px] font-black uppercase text-muted-foreground/30 px-2 tracking-tighter">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-2">
                      <span className="text-[9px] font-black uppercase text-muted-foreground/20 tracking-tighter">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isMe && msg.status && (
                        <div className="flex items-center">
                          {msg.status === 'sent' && <Check className="h-3 w-3 text-muted-foreground/20" />}
                          {msg.status === 'delivered' && <CheckCheck className="h-3 w-3 text-muted-foreground/20" />}
                          {msg.status === 'read' && <CheckCheck className="h-3 w-3 text-primary/60" />}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </React.Fragment>
            )
          })}
        </div>

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex justify-start pl-2"
            >
              <div className="bg-secondary/30 px-4 py-3 rounded-2xl flex items-center gap-1.5">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="h-1 w-1 bg-primary rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="h-1 w-1 bg-primary rounded-full" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="h-1 w-1 bg-primary rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-2">Dr. Typing</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-8 bg-background/60 backdrop-blur-xl border-t border-border/50 shrink-0 z-10 shadow-inner">
        <form onSubmit={handleSendMessage} className="flex gap-4 items-center max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-1.5 mr-2">
            <Button type="button" variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-primary/5 hover:text-primary transition-all text-muted-foreground/50">
              <Smile className="h-6 w-6" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-primary/5 hover:text-primary transition-all text-muted-foreground/50">
              <Paperclip className="h-6 w-6" />
            </Button>
          </div>

          <div className="relative flex-1 group">
            <div className="absolute inset-0 bg-primary/2 opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your secure message..."
              className="h-14 bg-secondary/30 border-transparent text-foreground rounded-2xl px-6 focus-visible:ring-primary/20 focus-visible:bg-white/60 dark:focus-visible:bg-card transition-all font-medium text-base shadow-inner place-holder:italic place-holder:text-muted-foreground/40"
            />
          </div>

          <Button
            type="submit"
            disabled={!newMessage.trim()}
            className={cn(
              "h-14 w-14 rounded-2xl shadow-xl transition-all active:scale-95 group shrink-0",
              newMessage.trim()
                ? "bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary/90"
                : "bg-secondary text-muted-foreground/30 cursor-not-allowed"
            )}
          >
            <Send className={cn(
              "h-6 w-6 transition-transform",
              newMessage.trim() && "group-hover:translate-x-1 group-hover:-translate-y-1"
            )} />
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2 opacity-30 select-none">
          <Lock className="h-3 w-3" />
          <span className="text-[8px] font-black uppercase tracking-[0.3em]">End-to-End Encrypted Session</span>
        </div>
      </div>
    </div>
  )
}
