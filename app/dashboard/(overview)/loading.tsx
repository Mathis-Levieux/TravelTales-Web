import { Skeleton } from "@/components/ui/skeleton"


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <>
            <Skeleton className="w-[1400px] h-[30px] rounded-full mt-6" />
            <Skeleton className="w-[1400px] h-[80px] rounded-full mt-6" />
            <Skeleton className="w-[1400px] h-[80px] rounded-full mt-6" />
        </>
    )
}