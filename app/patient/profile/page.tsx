"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const ProfileContent = dynamic(
    () => import("./profile-content"),
    {
        ssr: false,
        loading: () => <ProfileSkeletonLoading />
    }
)

function ProfileSkeletonLoading() {
    return (
        <div className="max-w-5xl mx-auto space-y-10">
            <div className="h-48 w-full rounded-4xl bg-muted animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="h-[400px] rounded-4xl md:col-span-1 bg-muted animate-pulse" />
                <div className="h-[400px] rounded-4xl md:col-span-2 bg-muted animate-pulse" />
            </div>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <Suspense fallback={<ProfileSkeletonLoading />}>
                <ProfileContent />
            </Suspense>
        </div>
    )
}
