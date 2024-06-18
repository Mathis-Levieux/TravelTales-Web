"use client"

import TripButton from "@/app/ui/dashboard/trip-button";
import Link from "next/link";
import { Suspense } from "react";

export default function Error() {
    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <div className="w-full bg-white/50 rounded-2xl py-5">
                    <div className='flex justify-evenly'>
                        <Link className="rounded-full w-1/5" href={'/dashboard/createtrip'}>
                            <TripButton
                                textColor="marron"
                                icon='plus'
                                className='shadow-createtripbutton bg-jaune text-marron border-beige'
                            >
                                Créer un voyage
                            </TripButton>
                        </Link>
                        <Link className='rounded-full w-1/5' href={'/dashboard/createtrip'}>
                            <TripButton
                                textColor="bleutext"
                                icon='share'
                                className='shadow-jointripbutton bg-bleufooter text-bleutext'
                            >
                                Rejoindre un voyage
                            </TripButton>
                        </Link>
                    </div>

                    <p className="text-center text-2xl font-semibold text-red-600 mt-5">
                        Une erreur est survenue lors de la récupération de vos voyages.
                    </p>
                </div>
            </main>
        </>
    );
}