"use client"

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { IoCalendarOutline } from "react-icons/io5";
import { format } from "date-fns"
import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { handleTripForm } from "@/app/lib/actions"



// const FormSchema = z.object({
//     username: z.string().min(2, {
//         message: "Username must be at least 2 characters.",
//     }),
//     dateRange: z.object({
//         from: z.date(),
//         to: z.date(),
//     })
// })

export default function TripForm() {

    const form = useForm({
        // resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            dateRange: {
                from: null,
                to: null
            },
        },
    })

    const onSubmit = async (data: any) => {
        handleTripForm(data)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
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
                            <FormLabel>Date Range</FormLabel>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                                "w-[300px] justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <IoCalendarOutline className="mr-2 h-4 w-4" />
                                            {field.value?.from ? (
                                                field.value.to ? (
                                                    <>
                                                        {format(field.value.from, "LLL dd, y")} -{" "}
                                                        {format(field.value.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(field.value.from, "LLL dd, y")
                                                )
                                            ) : (
                                                <span>Choisis une date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={field.value?.from || new Date()}
                                            //@ts-expect-error
                                            selected={field.value}
                                            onSelect={(date) => field.onChange(date)}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormDescription>
                                This is the date range for your trip.
                            </FormDescription>
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}


















// export default async function TripForm() {

//     const initialState: any = {
//         errors: {},
//         message: '',
//     }

//     const [state, formAction] = useFormState(handleTripForm, initialState)

//     return (
//         <form className="w-2/5" action={formAction}>
//             <Input className="mb-2" type="text" name="tripName" placeholder="Nom du voyage" />
//             <Input className="mb-2" type="text" name="tripDescription" placeholder="Description du voyage (optionnelle)" />
//             <DatePickerWithRange className="mb-2" />
//             <SubmitButton>
//                 Créer un voyage
//             </SubmitButton>
//         </form>
//     )
// }