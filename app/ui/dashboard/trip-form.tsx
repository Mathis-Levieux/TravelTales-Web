"use client"
import { usePlacesWidget } from "react-google-autocomplete";
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
import { useEffect, useState } from "react"
import { IoEarthSharp } from "react-icons/io5";
import { FaMapMarkerAlt, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";



const FormSchema = z.object({
    title: z.string().min(1, {
        message: "Le nom du voyage ne peut pas être vide"
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),
    description: z.string().optional(),
    destination: z.string().min(1, {
        message: "La destination ne peut pas être vide"
    })
})
export default function TripForm() {

    const router = useRouter()

    const [message, setMessage] = useState<string>("")
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "all",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            dateRange: {
                from: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
            },
            description: "",
            destination: "",
        },
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const response = await handleTripForm(values)
        if (response && response.error) setMessage(response.error)
        else if (response && response.message) {
            setMessage(response.message);
            setTimeout(() => {
                router.push("/dashboard")
            }, 1500)
        }
    }

    const { ref, autocompleteRef } = usePlacesWidget({
        options: {
            types: ["(regions)"],
            fields: ["formatted_address"]
        },
        apiKey: process.env.NEXT_PUBLIC_API_KEY_PLACES,
        onPlaceSelected: (place) => {
            console.log(place)
            form.setValue("destination", place.formatted_address);
        }
    });


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="my-7 rounded-2xl sm:w-6/12 w-full bg-white/50 flex flex-col items-center">
                <div className="sm:w-10/12 w-11/12 my-20">

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="pb-3 relative">
                                <IoEarthSharp className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                <FormControl>
                                    <Input className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold " placeholder="Nom du voyage" {...field} />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="pb-3 relative">
                                <FaPencilAlt className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                <FormControl>
                                    <Input className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold" placeholder="Description (optionnelle)" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Optionnelle.
                                </FormDescription> */}
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem className="pb-3 relative">
                                <FaMapMarkerAlt className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                <FormControl ref={ref as never}>
                                    <Input className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold " placeholder="Destination" {...field} />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dateRange"
                        render={({ field }) => (
                            <FormItem className="pb-3 relative mt-1.5">
                                <DatePickerWithRange
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                                {form.formState.errors.dateRange && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {form.formState.errors.dateRange.to ? "Veuillez choisir une date de début et une date de fin" : 'Veuillez choisir une date de début et une date de fin'}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormMessage className="">{message}</FormMessage>
                </div>

                <Button className="rounded-b-2xl rounded-t-none w-full bg-jaune text-marron font-bold h-16" type="submit" disabled={!form.formState.isValid}>Envoyer</Button>
            </form>
        </Form>
    )
}