'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DatePickerWithRange from '@/app/ui/trip/create-trip/date-picker-with-range';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { editDestinationForm } from '@/app/lib/actions';
import { Destination } from '@/app/lib/types';
import { FaMapMarkerAlt } from 'react-icons/fa';

const DestinationEditSchema = z.object({
    tripId: z.number(),
    destinationId: z.number(),
    name: z.string().min(1, { message: 'La destination ne peut pas être vide' }),
    dateStart: z.date(),
    dateEnd: z.date()
});

export default function EditDestinationForm({ destination, children }: { destination: Destination, children: any }) {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof DestinationEditSchema>>({
        mode: 'all',
        resolver: zodResolver(DestinationEditSchema),
        defaultValues: {
            tripId: destination.tripId,
            destinationId: destination.id,
            name: destination?.name || '',
            dateStart: new Date(destination.dateStart),
            dateEnd: new Date(destination.dateEnd),
        },
    });

    async function onSubmit(values: z.infer<typeof DestinationEditSchema>) {
        try {

            destination.dateStart = new Date(destination.dateStart);
            destination.dateEnd = new Date(destination.dateEnd);

            if (
                destination.dateStart.getTime() === values.dateStart.getTime() &&
                destination.dateEnd.getTime() === values.dateEnd.getTime() &&
                destination.name === values.name
            )
                return setMessage('Aucune modification n\'a été apportée');

            const response = await editDestinationForm(values); // Remplace par ta fonction d'édition
            if (response && response.error) setMessage(response.error);
            else {
                setMessage('Destination mise à jour avec succès');
                // setTimeout(() => {
                //     router.push(`/trip/${values.tripId}`);
                // }, 700);
            }
        } catch (error) {
            setMessage('Une erreur est survenue');
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild onClick={(e) => setMessage('')}>
                {children}
            </DialogTrigger>
            <DialogContent className="m-0 p-0 w-full bg-white gap-0 max-w-3xl">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="pb-3 relative mt-16 mx-8">
                                        <FaMapMarkerAlt className="absolute left-3 top-7 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormControl>
                                            <Input
                                                className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold shadow-input"
                                                placeholder="Nom de la destination"
                                                {...field}
                                                onChange={(e) => {
                                                    setMessage('');
                                                    field.onChange(e);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dateStart"
                                render={({ field }) => (
                                    <FormItem className='mx-8 mt-2'>
                                        <DatePickerWithRange
                                            value={{
                                                from: field.value,
                                                to: form.getValues('dateEnd'),
                                            }}
                                            onChange={(val) => {
                                                // @ts-expect-error
                                                form.setValue('dateStart', val?.from);
                                                // @ts-expect-error
                                                form.setValue('dateEnd', val?.to);
                                            }}
                                        />
                                        {form.formState.errors.dateStart && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {
                                                    "Vous devez sélectionner une date de début et de fin"
                                                }
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />
                            {message && <p className="text-center text-red-500 mt-1">{message}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="submit" className='w-full bg-jaune text-marron font-bold h-16 mt-16'>
                                Mettre à jour la destination
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
