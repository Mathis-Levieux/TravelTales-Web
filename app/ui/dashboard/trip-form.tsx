"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import DatePickerWithRange from "./date-picker-with-range"
import { Input } from "@/components/ui/input"
import { handleTripForm } from "@/app/lib/actions"
import { useState } from "react"

const FormSchema = z.object({
    tripName: z.string().min(1, {
        message: "Le nom du voyage ne peut pas être vide"
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    })
})
export default function TripForm() {

    const [message, setMessage] = useState<string>("")


    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "all",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            tripName: "",
            dateRange: {
                from: new Date(Date.now()),
                to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            },
        },
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const response = await handleTripForm(values)
        if (response.error) setMessage(response.error)
        else if (response.message) setMessage(response.message)

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center w-full space-y-8">
                <FormField
                    control={form.control}
                    name="tripName"
                    render={({ field }) => (
                        <FormItem className="w-96">
                            <FormLabel>Nom du voyage</FormLabel>
                            <FormControl>
                                <Input className="border-none focus-visible:ring-2" placeholder="Nom du voyage" {...field} />
                            </FormControl>
                            <FormDescription>
                                Le nom de votre voyage.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-96">
                            <FormLabel>Date Range</FormLabel>
                            <DatePickerWithRange
                                className=""
                                value={field.value}
                                onChange={field.onChange}
                            />
                            <FormDescription>
                                The date range of your trip.
                            </FormDescription>
                            {form.formState.errors.dateRange && (
                                <p className="mt-2 text-sm text-red-500">
                                    {form.formState.errors.dateRange.to ? "Veuillez choisir une date de début et une date de fin" : 'Veuillez choisir une date de début et une date de fin'}
                                </p>
                            )}
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={!form.formState.isValid}>Envoyer</Button>
                <FormMessage>{message}</FormMessage>
            </form>
        </Form>
    )
}