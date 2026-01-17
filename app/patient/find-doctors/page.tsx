import { Suspense } from "react"
import FindDoctorsContent from "./find-doctors-content"
import { Skeleton } from "@/components/ui/skeleton"

export default function FindDoctorsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-5 w-96" />
            </div>
            <div className="relative mb-8">
               <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
                ))}
            </div>
        </div>
      }
    >
      <FindDoctorsContent />
    </Suspense>
  )
}
