"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "./date-picker-with-range"
import React from "react"
import { handleTripForm } from "@/app/lib/actions"

const formSchema = z.object({
    tripName: z.string().min(2, {
        message: "Le nom du voyage doit contenir au moins 2 caractères"
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    })
})

export default function TripForm() {

    const [message, setMessage] = React.useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tripName: "",
            dateRange: {
                from: new Date(),
                to: new Date(),
            }
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
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
                            <FormLabel>Nom du voyage</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the name of your trip.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date du voyage</FormLabel>
                            <FormControl>
                                <Controller
                                    control={form.control}
                                    name="dateRange"
                                    render={({ field }) => (
                                        <DatePickerWithRange date={field.value} setDate={field.onChange} />
                                    )}
                                />

                            </FormControl>
                            <FormDescription>
                                Choose the start and end date of your trip.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormMessage>{message}</FormMessage>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
