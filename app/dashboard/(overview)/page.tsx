import TripsSkeleton from "@/app/ui/dashboard/tripsSkeleton";
import Trips from "../../ui/dashboard/trips";
import { Suspense } from "react";

export default async function Page() {

    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <div className="w-full bg-white/50 rounded-2xl">
                    <Suspense fallback={<TripsSkeleton />}>
                        <Trips />
                    </Suspense>
                </div>
            </main>
        </>
    )
}