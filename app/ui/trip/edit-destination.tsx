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
import { usePlacesWidget } from 'react-google-autocomplete';
import { handleTripDestinationForm } from '@/app/lib/actions';
import { Destination } from '@/app/lib/types';

const DestinationEditSchema = z.object({
    name: z.string().min(1, { message: 'La destination ne peut pas être vide' }),
    dateStart: z.date(),
    dateEnd: z.date(),
});

export default function EditDestinationForm({ destination, children }: { destination: Destination, children: any }) {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof DestinationEditSchema>>({
        mode: 'all',
        resolver: zodResolver(DestinationEditSchema),
        defaultValues: {
            name: destination?.name || '',
            dateStart: destination?.dateStart || new Date(),
            dateEnd: destination?.dateEnd || new Date(),
        },
    });

    async function onSubmit(values: z.infer<typeof DestinationEditSchema>) {
        try {
            const response = await handleTripDestinationForm(values); // Remplace par ta fonction d'édition
            return;
            if (response && response.error) setMessage(response.error);
            else {
                setMessage('Destination mise à jour avec succès');
                setTimeout(() => {
                    router.push('/destinations');
                }, 700);
            }
        } catch (error) {
            setMessage('Une erreur est survenue');
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Éditer la destination</DialogTitle>
                    <DialogDescription>
                        Modifiez les informations de votre destination. Cliquez sur "Mettre à jour" lorsque vous avez terminé.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="col-span-3"
                                                placeholder="Nom de la destination"
                                                {...field}
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
                                    <FormItem>
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
                                            <p className="text-sm text-red-500">
                                                {form.formState.errors.dateStart.message}
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={!form.formState.isValid}>
                                Mettre à jour
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

                {message && <p className="text-center text-red-500">{message}</p>}
            </DialogContent>
        </Dialog>
    );
}
