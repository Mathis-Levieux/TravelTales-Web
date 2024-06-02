import TripsSkeleton from "@/app/ui/dashboard/tripsSkeleton";
import Trips from "../../ui/dashboard/trips";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {

    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <Link className="ml-auto mr-12" href={'/dashboard/createTrip'}>
                    <Button className="w-80 rounded-full bg-white text-bluetext">
                        Créer un voyage
                    </Button>
                </Link>
                <div className="w-full bg-white/50 rounded-2xl">
                    <Suspense fallback={<TripsSkeleton />}>
                        <Trips />
                    </Suspense>
                </div>
            </main>
        </>
    )
}