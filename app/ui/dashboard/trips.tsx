"use client";
import { getTrips } from "@/app/lib/data";
import { useEffect, useState } from "react";

export default function Trips({ trips }: { trips: any }) {

    console.log(trips)

    return (
        <>
            {trips.map((trip: any) => (
                <div key={trip.id} className="flex m-2 items-center justify-between p-4 bg-white shadow-md rounded-lg">
                    <div>
                        <h2 className="text-xl font-semibold">TripName: {trip.title}</h2>
                        <p className="text-sm text-gray-500">TripDescription: {trip.description}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">TripDate: {trip.dateStart} to {trip.dateEnd}</p>
                    </div>
                </div>
            ))}
        </>
    )
}