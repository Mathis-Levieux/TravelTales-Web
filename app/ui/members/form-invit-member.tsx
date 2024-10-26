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
import { inviteMemberToTrip } from '@/app/lib/actions';

const FormSchema = z.object({
    tripId: z.number(),
    email: z.string().email({
        message: 'Veuillez entrer un email valide',
    }),
});

export default function FormMemberInvitation({ tripId }: { tripId: number }) {
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onSubmit',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            tripId: tripId,
            email: '',
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const response = await inviteMemberToTrip(values);

        if (response && response.error) setMessage(response.error);
        else if (response && response.message) setMessage(response.message);
    }

    return (
        <>
            {message && <p className="text-black mt-4 text-center">{message}</p>}
            <div className="md:mx-0 mx-1 flex items-center gap-5 justify-center md:mt-16 mt-8 md:mb-8 mb-4">
                <Form {...form}>
                    <RoundIcon icon={<FaShareAlt className="text-bleutext text-3xl me-1" />} className="border-8 border-bleufooter h-16 w-16" />
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={`font-semibold rounded-full p-2 flex items-center opacity-85 bg-bleufooter md:w-2/3 w-4/5`}
                    >
                        <div className="bg-white rounded-l-full flex w-full py-3 ml-1 relative">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="relative w-full">
                                        <FormControl>
                                            <Input
                                                className="rounded-full text-marronfonce rounded-l-full focus-visible:ring-0 placeholder:font-bold md:text-2xl text-base font-bold shadow-input w-full"
                                                placeholder="Entrez l'email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-center rounded-full ms-3 me-1">
                            <button type="submit" className="">
                                <RoundIcon icon={<IoIosSend className="text-bleutext text-3xl" />} className="h-14 w-14" />
                            </button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}