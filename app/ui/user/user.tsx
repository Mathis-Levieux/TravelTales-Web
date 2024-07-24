'use client';

import { handleEditUserInfos } from "@/app/lib/actions";
import type { User } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { z } from "zod";
import { useRouter } from 'next/navigation'


const FormSchema = z
    .object({
        email: z.string().email({
            message: "L'email est invalide",
        }),
        username: z.string().min(3, {
            message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
        }),
        // avatar: z.string()
        //     .refine(value => value[0].type === "image/jpeg" || value[0].type === "image/png", {
        //         message: "Le fichier doit être une image jpeg ou png"
        //     }),
    });

export default function User({ user }: { user: User }) {
    const router = useRouter()
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onBlur',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: user.email,
            username: user.username,
            // avatar: '',
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const response = await handleEditUserInfos(values);
        if (response.error && response.error) setMessage(response.error);
        else if (response.message && response.message) setMessage(response.message)
    }

    return user && (

        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="my-7 rounded-2xl sm:w-6/12 w-full bg-white/50 flex flex-col items-center"
            >
                <div className="w-10/12 my-20">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="pb-3 relative">
                                <FaUser className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                                <MdEdit className="absolute right-3 top-3 transform -translate-y-1/2 z-10 text-marron" />
                                <FormControl>
                                    <Input
                                        className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold "
                                        placeholder="Username"
                                        {...field}
                                    />
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
                                <MdEdit className="absolute right-3 top-3 transform -translate-y-1/2 z-10 text-marron" />

                                <FormControl>
                                    <Input
                                        className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold "
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>

                <FormMessage aria-live="polite" role="status">
                    {message}
                </FormMessage>
                <Button
                    className="rounded-b-2xl rounded-t-none w-full bg-jaune text-marron font-bold h-16"
                    type="submit"
                    disabled={!form.formState.isValid}
                >
                    Enregistrer mes infos
                </Button>
            </form>
        </Form>
    )
}