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
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import { Budget } from '@/app/lib/types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import RoundIcon from '../../round-icon';
import { MdEdit } from 'react-icons/md';
import { handleEditBudgetForm } from '@/app/lib/actions';

const BudgetEditSchema = z.object({
    budgetId: z.number(),
    amount: z.preprocess(
        (val) => (typeof val === 'string' ? parseFloat(val) : val),
        z.number({
            invalid_type_error: 'Le montant doit être un nombre',
            required_error: 'Le montant est requis',
        }).positive()
    ),
});

export default function EditBudgetComponent({ budget }: { budget: Budget, categories: string[] }) {

    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof BudgetEditSchema>>({
        mode: 'all',
        resolver: zodResolver(BudgetEditSchema),
        defaultValues: {
            budgetId: budget.id,
            amount: budget.amount,
        },
    });

    async function onSubmit(values: z.infer<typeof BudgetEditSchema>) {

        const response = await handleEditBudgetForm(values); // Remplace par ta fonction d'édition
        if (response && response.error) setMessage(response.error);
        else {
            setMessage('Budget mis à jour avec succès');
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild onClick={(e) => setMessage('')}>
                <div>
                    <RoundIcon title="Modifier le budget" aria-label="Modifier le budget" icon={<MdEdit className="text-marron text-2xl" />} className='bg-white h-10 w-10 cursor-pointer' />
                </div>
            </DialogTrigger>
            <DialogContent className="m-0 p-0 w-full bg-white gap-0 max-w-3xl">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <div className="flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="pb-3 relative mt-16 mx-8">
                                        <FaMapMarkerAlt className="absolute left-3 top-7 transform -translate-y-1/2 z-10 text-marron" />
                                        <FormControl>
                                            <Input
                                                className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold shadow-input"
                                                placeholder="Montant du budget"
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
