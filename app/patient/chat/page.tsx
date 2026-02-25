"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

const ChatContent = dynamic(
  () => import("./chat-content"),
  {
    ssr: false,
    loading: () => <ChatSkeletonLoading />
  }
)

function ChatSkeletonLoading() {
  return (
    <div className="container mx-auto px-4 py-4 lg:py-8 max-w-7xl h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 h-full">
        {/* Sidebar Skeleton */}
        <Card className="hidden lg:flex flex-col rounded-4xl border border-border/50 bg-card/30 overflow-hidden shadow-xl">
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-32 rounded-xl" />
              <Skeleton className="h-10 w-10 rounded-2xl" />
            </div>
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
          <div className="px-4 space-y-4 flex-1 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <Skeleton className="h-14 w-14 rounded-2xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/3 rounded-full" />
                    <Skeleton className="h-2 w-8 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-3/4 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Content Skeleton */}
        <Card className="h-full w-full rounded-4xl border border-border/50 bg-card/30 shadow-2xl relative overflow-hidden">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-2 w-20 rounded-full" />
              </div>
            </div>
          </div>
          <div className="p-8 space-y-8 h-[calc(100%-8rem)] flex flex-col justify-end">
            <div className="flex justify-start gap-4">
              <Skeleton className="h-12 w-2/3 rounded-3xl rounded-tl-sm" />
            </div>
            <div className="flex justify-end gap-4">
              <Skeleton className="h-12 w-1/2 rounded-3xl rounded-tr-sm bg-primary/10" />
            </div>
            <div className="flex justify-start gap-4">
              <Skeleton className="h-12 w-1/3 rounded-3xl rounded-tl-sm" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 border-t border-border/50">
            <Skeleton className="h-14 w-full rounded-2xl" />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4 pt-8 pb-4 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Secure Channel</span>
          </div>
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">My Consultations</h1>
            <p className="text-muted-foreground text-lg font-medium italic opacity-80">Encrypted messaging with your healthcare specialists.</p>
          </div>
        </header>

        <Suspense fallback={<ChatSkeletonLoading />}>
          <ChatContent />
        </Suspense>
      </div>
    </div>
  )
}
