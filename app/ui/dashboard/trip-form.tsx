'use client'
import { Input } from "@/components/ui/input"
import { handleTripForm } from "@/app/lib/actions"

export default async function tripForm() {
    return (
        <form action={handleTripForm}>
            <Input type="text" name="departure" placeholder="Départ" />
        </form>
    )
}