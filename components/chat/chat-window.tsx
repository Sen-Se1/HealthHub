"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PusherClient from "pusher-js"

interface Message {
  id: number
  sender_id: number
  senderName: string
  message_text: string
  created_at: string
  first_name?: string
  last_name?: string
}

interface ChatWindowProps {
  conversationId: number
  currentUserId: number
  otherUserName: string
}

export function ChatWindow({ conversationId, currentUserId, otherUserName }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pusherRef = useRef<PusherClient | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    let channel: any = null

    const initPusher = async () => {
      try {
        // Fetch Pusher config from server
        const res = await fetch("/api/config/pusher")
        const config = await res.json()

        if (config.key && !pusherRef.current) {
          pusherRef.current = new PusherClient(config.key, {
            cluster: config.cluster,
          })

          channel = pusherRef.current.subscribe(`chat-${conversationId}`)
          channel.bind("message", (data: any) => {
            setMessages((prev) => [...prev, data])
          })
        }
      } catch (err) {
        console.error("[v0] Error initializing Pusher:", err)
      }
    }

    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/messages?conversationId=${conversationId}`)
        const data = await res.json()
        if (data.messages) {
          setMessages(
            data.messages.map((m: any) => ({
              ...m,
              senderName: `${m.first_name} ${m.last_name}`,
            })),
          )
        }
      } catch (err) {
        console.error("[v0] Error fetching messages:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
    initPusher()

    return () => {
      if (channel) {
        channel.unbind_all()
      }
      if (pusherRef.current) {
        pusherRef.current.unsubscribe(`chat-${conversationId}`)
      }
    }
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    try {
      await fetch("/api/chat/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          messageText: newMessage,
        }),
      })

      setNewMessage("")
    } catch (err) {
      console.error("[v0] Error sending message:", err)
    }
  }

  if (loading) return <div className="p-4 text-slate-400">Loading messages...</div>

  return (
    <div className="flex flex-col h-[600px] bg-slate-800 border border-slate-700 rounded-lg">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <h3 className="text-white font-semibold">{otherUserName}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-slate-400 py-8">Start the conversation</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender_id === currentUserId ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender_id === currentUserId ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-100"
                }`}
              >
                <p className="text-sm">{msg.message_text}</p>
                <p className="text-xs mt-1 opacity-70">{new Date(msg.created_at).toLocaleTimeString()}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-slate-700 border-slate-600 text-white flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()} className="bg-emerald-500 hover:bg-emerald-600">
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
