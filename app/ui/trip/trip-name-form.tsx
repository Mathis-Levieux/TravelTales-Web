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
import { handleTripNameForm } from '@/app/lib/actions';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

const FormSchema = z.object({
    newTitle: z.string().min(1, {
        message: 'Le nom du voyage ne peut pas être vide',
    }),
});

export default function TripForm({ tripTitle, tripId, className }: { tripTitle: string; tripId: string, className: string }) {

    const [message, setMessage] = useState<string>('');



    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'all',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            newTitle: tripTitle,
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {

        if (values.newTitle == tripTitle) return;
        const response = await handleTripNameForm(tripId, values.newTitle);

        if (response && response.error) setMessage(response.error);
        else if (response && response.message) setMessage(response.message);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={className}
            >
                <div className="">
                    <FormField
                        control={form.control}
                        name="newTitle"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <MdEdit className="absolute right-3 top-3 z-10 text-marron text-xl pointer-events-none" />
                                <FormControl>
                                    <Input
                                        className="rounded-full border-none focus-visible:ring-2 placeholder:font-bold text-xl font-bold shadow-input"
                                        placeholder="Titre du voyage"
                                        {...field}
                                        onBlur={form.handleSubmit(onSubmit)}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
}