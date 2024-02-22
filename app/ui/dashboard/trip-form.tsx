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
    tripName: z.string().min(2, {
        message: "Le nom du voyage doit contenir au moins 2 caractères"
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    })
})

export default function TripForm() {

    const [message, setMessage] = useState<string>("")


    const form = useForm<z.infer<typeof FormSchema>>({
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
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const response = await handleTripForm(values)
        if (response.error) setMessage(response.error)
        else if (response.message) setMessage(response.message)

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="tripName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Nom du voyage" {...field} />
                            </FormControl>
                            <FormDescription>
                                The name of your trip.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date Range</FormLabel>
                            <DatePickerWithRange
                                value={field.value}
                                onChange={field.onChange}
                            />
                            <FormDescription>
                                The date range of your trip.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Envoyer</Button>
                <FormMessage>{message}</FormMessage>
            </form>
        </Form>
    )
}