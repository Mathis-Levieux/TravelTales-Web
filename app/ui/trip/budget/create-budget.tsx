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
import { FaMapMarkerAlt } from 'react-icons/fa';
import { handleCreateBudget } from '@/app/lib/actions';

const createBudgetSchema = z.object({
    tripId: z.number(),
    amount: z.preprocess(
        (val) => (typeof val === 'string' ? parseFloat(val) : val),
        z.number({
            invalid_type_error: 'Le montant doit être un nombre',
            required_error: 'Le montant est requis',
        }).positive()
    ),
});

export default function CreateBudgetForm({ tripId, children }: { tripId: number, children: any }) {
    
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof createBudgetSchema>>({
        mode: 'onChange',
        resolver: zodResolver(createBudgetSchema),
        defaultValues: {
            tripId: tripId,
        },
    });

    async function onSubmit(values: z.infer<typeof createBudgetSchema>) {
        try {
            const response = await handleCreateBudget(values);
            if (response && response.error) setMessage(response.error);
            else {
                setMessage('Budget ajouté avec succès');
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
                            <Button type="submit" className='w-full bg-jaune text-marron font-bold h-16 mt-16' disabled={!form.formState.isValid}>
                                Créer le budget
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
