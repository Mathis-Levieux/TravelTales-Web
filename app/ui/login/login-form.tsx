'use client'

import { handleLogIn } from "@/app/lib/actions"
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";



// TO DO : INTEGRER LE RENARD DANS LE FORMULAIRE AVEC LES ERREURS DE VALIDATION
// TO DO : TESTER LA PAGE AVEC L'API
// TO DO : FAIRE LES HOVER SUR LES BOUTONS


const FormSchema = z.object({
    email: z.string().email({
        message: "L'email est invalide"
    }),
    password: z.string().min(1, {
    }),
})

export default function LoginForm() {


    const [message, setMessage] = useState<string>("")

    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect")

    useEffect(() => {
        if (redirect == "true") {
            setMessage("Votre email a été confirmé, vous pouvez vous maintenant vous connecter")
        }
    }, [])

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "all",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const response = await handleLogIn(values)

        if (response && response.error) {
            setMessage(response.error)
        }

    }

    return (


        <>
                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="my-10 rounded-2xl w-6/12 bg-white/50 flex flex-col items-center">
                        <div className="w-10/12 my-20">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="pb-3 relative">
                                        <IoMdMail className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormControl>
                                            <Input className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold " placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-sm text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="pb-3 relative">
                                        <RiLockPasswordFill className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormControl>
                                            <Input type="password" className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold" placeholder="Mot de passe" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />



                        </div>

                        <FormMessage aria-live="polite" role="status">{message}</FormMessage>
                        <Button className="rounded-b-2xl rounded-t-none w-full bg-jaune text-marron font-bold h-16" type="submit" disabled={!form.formState.isValid}>Se connecter</Button>
                    </form>
                </Form>
        </>
    )
}
