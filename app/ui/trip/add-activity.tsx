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
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPencilAlt, FaRegStar } from 'react-icons/fa';
import { Destination } from '@/app/lib/types';
import DatePicker from './date-picker';
import { handleAddActivityForm } from '@/app/lib/actions';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MdOutlineCategory } from 'react-icons/md';
import { capitalizeFirstLetter } from '@/app/lib/utils';


const addActivitySchema = z.object({
    destinationId: z.number(),
    name: z.string().min(1, { message: 'Le nom ne peut pas être vide' }),
    description: z.string().optional(),
    date: z.date(),
    category: z.string().min(1, { message: 'La catégorie ne peut pas être vide' }),
});


export default function AddActivityForm({ categories, destination, children }: { categories: string[], destination: Destination, children: any }) {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof addActivitySchema>>({
        mode: 'onChange',
        resolver: zodResolver(addActivitySchema),
        defaultValues: {
            destinationId: destination.id,
            name: '',
            description: '',
            date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
    });

    async function onSubmit(values: z.infer<typeof addActivitySchema>) {
        try {
            const response = await handleAddActivityForm(values);
            if (response && response.error) setMessage(response.error);
            else {
                setMessage('Activité ajoutée avec succès');
                // setTimeout(() => {
                //     router.push(`/trip/${destination.tripId}`);
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
                                        <FaRegStar className="absolute left-3 top-7 transform -translate-y-1/2 z-10 text-marron text-xl" />
                                        <FormControl>
                                            <Input
                                                className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold shadow-input"
                                                placeholder="Nom de l'activité"
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="pb-3 relative mx-8">
                                        <FaPencilAlt className="absolute left-3 top-7 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormControl>
                                            <Input
                                                className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold shadow-input"
                                                placeholder="Description"
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
                                name="date"
                                render={({ field }) => (
                                    <FormItem className='mx-8 mt-2'>
                                        <DatePicker
                                            value={field.value}
                                            onChange={(date) => {
                                                setMessage('');
                                                field.onChange(date);
                                            }}
                                        />
                                        {form.formState.errors.date && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {
                                                    "Vous devez sélectionner une date de début et de fin"
                                                }
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className='pb-3 relative mx-8 mt-2'>
                                        <MdOutlineCategory className="absolute left-3 top-7 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormLabel></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold shadow-input'>
                                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className=''>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category} className='hover:bg-slate-400'>
                                                        {capitalizeFirstLetter(category)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {message && <p className="text-center text-red-500 mt-1">{message}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="submit" className='w-full bg-jaune text-marron font-bold h-16 mt-16' disabled={!form.formState.isValid}>
                                Ajouter une activité
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
