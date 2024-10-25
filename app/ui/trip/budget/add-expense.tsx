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
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity } from '@/app/lib/types';
import { handleAddExpense } from '@/app/lib/actions';
import { capitalizeFirstLetter } from '@/app/lib/utils';

const addExpenseSchema = z.object({
    budgetId: z.number(),
    name: z.string().min(3, { message: 'Le nom de la dépense doit contenir au moins 3 caractères' }),
    amount: z.preprocess(
        (val) => (typeof val === 'string' ? parseFloat(val) : val),
        z.number({
            invalid_type_error: 'Le montant doit être un nombre',
            required_error: 'Le montant est requis',
        }).positive()
    ),
    activityId: z.number().nullable().optional(),
    category: z.string({
        required_error: 'La catégorie est requise',
    }),
});

export default function AddExpenseForm({ budgetId, activities, categories, children }: { budgetId: number, activities: Activity[], categories: string[], children: any }) {

    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof addExpenseSchema>>({
        mode: 'onSubmit',
        resolver: zodResolver(addExpenseSchema),
        defaultValues: {
            budgetId: budgetId,
            name: '',
            amount: 50,
        },
    });

    async function onSubmit(values: z.infer<typeof addExpenseSchema>) {
        try {
            const response = await handleAddExpense(values);
            if (response && response.error) setMessage(response.error);
            else {
                setMessage('Dépense ajoutée avec succès');
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
                                                placeholder="Nom de la dépense"
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
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="pb-3 relative mx-8">
                                        <FaMapMarkerAlt className="absolute left-3 top-7 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormControl>
                                            <Input
                                                className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold shadow-input"
                                                placeholder="Montant de la dépense"
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
                                name="activityId"
                                render={({ field }) => (
                                    <FormItem className='pb-3 relative mx-8'>
                                        <MdOutlineCategory className="absolute left-3 top-7 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormLabel></FormLabel>
                                        <Select onValueChange={(value) => field.onChange(value === "Aucune activité" ? null : Number(value))} defaultValue={field.value ? String(field.value) : undefined}>
                                            <FormControl>
                                                <SelectTrigger className='rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold shadow-input'>
                                                    <SelectValue placeholder="Voulez-vous relier cette dépense à une activité ?" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className=''>
                                                <SelectItem value={"Aucune activité"} className='hover:bg-slate-400'>
                                                    Aucune activité
                                                </SelectItem>
                                                {activities.map((activity: Activity) => (
                                                    <SelectItem key={activity.id} value={String(activity.id)} className='hover:bg-slate-400'>
                                                        {activity.name}
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
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className='pb-3 relative mx-8'>
                                        <MdOutlineCategory className="absolute left-3 top-7 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormLabel></FormLabel>
                                        <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold shadow-input'>
                                                    <SelectValue placeholder="Catégorie" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className=''>
                                                {categories.map((category: string) => (
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
                            <Button type="submit" className='w-full bg-jaune text-marron font-bold h-16 mt-16' >
                                Créer la dépense
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
