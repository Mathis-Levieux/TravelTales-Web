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

import {handleEditActivity } from '@/app/lib/actions';
import { Activity } from '@/app/lib/types';
import { FaPencilAlt } from 'react-icons/fa';
import DatePicker from './date-picker';
import { MdOutlineCategory } from 'react-icons/md';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaRegStar } from 'react-icons/fa6';
import { capitalizeFirstLetter } from '@/app/lib/utils';

const ActivityEditSchema = z.object({
    destinationId: z.number(),
    activityId: z.number(),
    description: z.string().optional(),
    name: z.string().min(1, { message: "Le nom de l'activité ne peut pas être vide" }),
    date: z.date(),
    category: z.string(),
});

export default function EditActivityForm({ activity, children, categories }: { activity: Activity, children: any, categories: string[] }) {


    const router = useRouter();
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof ActivityEditSchema>>({
        mode: 'all',
        resolver: zodResolver(ActivityEditSchema),
        defaultValues: {
            destinationId: activity.destinationId,
            activityId: activity.id,
            description: activity.description,
            name: activity.name,
            date: activity.date,
            category: activity.category,
        },
    });

    async function onSubmit(values: z.infer<typeof ActivityEditSchema>) {
        try {

            const response = await handleEditActivity(values);
            if (response && response.error) setMessage(response.error);
            else {
                setMessage('Activité mise à jour avec succès');
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
                                                    "Vous devez sélectionner une date"
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
                                Mettre à jour l'activité
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
