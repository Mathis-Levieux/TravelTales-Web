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

const FormSchema = z.object({
    tripName: z.string().min(1, {
        message: "Le nom du voyage ne peut pas être vide"
    }),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),
    tripDescription: z.string().optional(),
    tripDestination: z.string().min(1, {
        message: "La destination ne peut pas être vide"
    }),
    tripCity: z.string().min(1, {
        message: "La ville ne peut pas être vide"
    }),
})
export default function TripForm() {

    const [message, setMessage] = useState<string>("")

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "all",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            tripName: "",
            dateRange: {
                from: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
            },
            tripDescription: "",
            tripDestination: "",
        },
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const response = await handleTripForm(values)
        if (response && response.error) setMessage(response.error)
        else if (response && response.message) setMessage(response.message)

    }

    const { ref, autocompleteRef } = usePlacesWidget({
        options: {
            types: ["(regions)"],
            // fields: ["formatted_address"]
        },
        apiKey: process.env.NEXT_PUBLIC_API_KEY_PLACES,
        onPlaceSelected: (place) => {
            console.log(place)
            const components = place.address_components;
            const cityComponent = components.find(component => component.types.includes('locality'));
            // const countryComponent = components.find(component => component.types.includes('country'));
            // console.log(cityComponent, countryComponent)
            const city = cityComponent ? cityComponent.long_name : '';
            // const country = countryComponent ? countryComponent.long_name : '';
            form.setValue("tripCity", city);
            form.setValue("tripDestination", place.formatted_address);
        }
    });


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
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="tripDescription"
                    render={({ field }) => (
                        <FormItem className="w-96">
                            <FormLabel>Description du voyage</FormLabel>
                            <FormControl>
                                <Input className="border-none focus-visible:ring-2" placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                Optionnelle.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tripDestination"
                    render={({ field }) => (
                        <FormItem className="w-96">
                            <FormLabel>Destination du voyage</FormLabel>
                            <FormControl ref={ref as never}>
                                <Input className="border-none focus-visible:ring-2" placeholder="Destination" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-96">
                            <FormLabel>Date de votre voyage</FormLabel>
                            <DatePickerWithRange
                                className=""
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

                <Button type="submit" disabled={!form.formState.isValid}>Envoyer</Button>
                <FormMessage>{message}</FormMessage>
            </form>
        </Form>
    )
}

// import React from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";

// export default function TripForm() {
//     const { register, control, handleSubmit, reset, trigger, setError } = useForm({
//         defaultValues: {
//             test: [{ firstName: "", lastName: "" }]
//         }
//     });
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: "test"
//     });

//     return (
//         <form onSubmit={handleSubmit(data => console.log(data))}>
//             <ul>
//                 {fields.map((item, index) => (
//                     <li key={item.id}>
//                         <input {...register(`test.${index}.firstName`)} placeholder="Destination" />
//                         <Controller
//                             render={({ field }) => <input {...field} />}
//                             name={`test.${index}.lastName`}
//                             control={control}
//                         />
//                         <button type="button" onClick={() => remove(index)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//             <button
//                 type="button"
//                 onClick={() => append({ firstName: "", lastName: "" })}
//             >
//                 append
//             </button>
//             <input type="submit" />
//         </form>
//     );
// }