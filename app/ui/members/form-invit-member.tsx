'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FaShareAlt } from "react-icons/fa";
import RoundIcon from "../round-icon";
import { IoIosSend } from "react-icons/io";
import { useState } from 'react';

const FormSchema = z.object({
    email: z.string().email({
        message: 'Veuillez entrer un email valide',
    }),
});

export default function FormMemberInvitation() {
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'all',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        // Remplacez cette ligne par votre logique de soumission de formulaire
        console.log('Email soumis:', values.email);
        // Vous pouvez également définir un message de succès ou d'erreur ici
        setMessage('Invitation envoyée avec succès');
    }

    return (
        <div className="flex items-center gap-5 justify-center mt-16 mb-8">
            <RoundIcon icon={<FaShareAlt className="text-bleutext text-3xl me-1" />} className="border-8 border-bleufooter h-16 w-16" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={`font-semibold rounded-full p-2 flex items-center opacity-85 bg-bleufooter w-2/3`}
                >
                    <div className="bg-white rounded-l-full flex w-full py-3 ml-1 relative">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormControl>
                                        <Input
                                            className="rounded-full text-marronfonce rounded-l-full focus-visible:ring-0 placeholder:font-bold text-2xl font-bold shadow-input w-full"
                                            placeholder="Entrez l'email"
                                            {...field}
                                            onBlur={form.handleSubmit(onSubmit)}
                                        />
                                    </FormControl>
                                    {/* <FormMessage className="text-sm text-red-500" /> */}
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-center rounded-full ms-3 me-1">
                        <RoundIcon icon={<IoIosSend className="text-bleutext text-3xl" />} className="h-14 w-14" />
                    </div>
                </form>
            </Form>
            {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
    );
}