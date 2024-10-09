"use client"

import { handleCreateComment } from "@/app/lib/actions";
import { Activity } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const CommentSchema = z.object({
    content: z.string().min(1, { message: 'Le commentaire ne peut pas être vide' }),
    date: z.date(),
    activityId: z.number(),
});

export default function CreateCommentForm({ children, activity }: { children: any, activity: Activity }) {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');

    const form = useForm<z.infer<typeof CommentSchema>>({
        mode: 'all',
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            content: '',
            date: new Date(),
            activityId: activity.id,
        },
    });

    const onSubmit = async (data: z.infer<typeof CommentSchema>) => {
        const res = await handleCreateComment(data);
        if (res) {
            setMessage('Commentaire créé avec succès');
            router.push(`/trip/${activity.destination.tripId}/activity/${activity.id}`);
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <textarea
                                            {...field}
                                            placeholder="Ajouter un commentaire"
                                            className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormMessage>{message}</FormMessage>
                        <DialogFooter>
                            <Button
                                type="submit"
                                className='w-full bg-jaune text-marron font-bold h-16 mt-4'
                                disabled={!form.formState.isValid}
                            >
                                Envoyer
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}
