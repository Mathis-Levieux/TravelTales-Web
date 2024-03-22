'use client'
import { handleRegister } from "@/app/lib/actions"
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";

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
import { useState } from "react"
import { passwordRegex } from "@/app/lib/constants"


// TO DO : INTEGRER LE RENARD DANS LE FORMULAIRE AVEC LES ERREURS DE VALIDATION

const FormSchema = z.object({
    email: z.string().email({
        message: "L'email est invalide"
    }),
    username: z.string().min(3, {
        message: "Le nom d'utilisateur doit contenir au moins 3 caractères"
    }),
    password: z.string().regex(passwordRegex, {
        message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
    }),
    passwordConfirmation: z.string(),
}).refine(data => data.password === data.passwordConfirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirmation"]
})

export default function RegisterForm() {

    const [message, setMessage] = useState<string>("")

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            passwordConfirmation: "",
        },
    })


    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const response = await handleRegister(values)
        if (response.error) setMessage(response.error)
        else if (response.message) setMessage(response.message)

    }
    return (
        <>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="my-10 rounded-2xl w-6/12 bg-white/50 flex flex-col items-center">
                    <div className="w-10/12 my-20">

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="pb-3 relative">
                                    <FaUser className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                    <FormControl>
                                        <Input className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold" placeholder="Pseudo" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500" />
                                </FormItem>
                            )}
                        />

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
                                    <RiLockPasswordLine className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                    <FormControl>
                                        <Input className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold" placeholder="Mot de passe" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500" />

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <RiLockPasswordFill className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                    <FormControl>
                                        <Input className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold" placeholder="Confirmer le mot de passe" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormMessage aria-live="polite" role="status">{message}</FormMessage>
                    <Button className="rounded-b-2xl rounded-t-none w-full bg-jaune text-marron font-bold h-16" type="submit" disabled={!form.formState.isValid}>Créer un compte</Button>
                </form>
            </Form>
        </>
    )
}
