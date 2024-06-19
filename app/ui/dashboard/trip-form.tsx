'use client';
import { usePlacesWidget } from 'react-google-autocomplete';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import DatePickerWithRange from './date-picker-with-range';
import { Input } from '@/components/ui/input';
import { handleTripForm } from '@/app/lib/actions';
import { useState } from 'react';
import { IoEarthSharp } from 'react-icons/io5';
import { FaMapMarkerAlt, FaPencilAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const DestinationSchema = z.object({
  name: z.string().min(1, { message: 'La destination ne peut pas être vide' }),
  dateStart: z.date(),
  dateEnd: z.date(),
});

const FormSchema = z.object({
  title: z.string().min(1, {
    message: 'Le nom du voyage ne peut pas être vide',
  }),
  description: z.string().optional(),
  destination: z
    .array(DestinationSchema)
    .min(1, { message: 'Ajoutez au moins une destination' }),
});

export default function TripForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'all',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      destination: [
        {
          name: '',
          dateStart: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          dateEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'destination',
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const response = await handleTripForm(values);
    if (response && response.error) setMessage(response.error);
    else if (response && response.message) {
      setMessage(response.message);
      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    }
  }

  const createPlacesWidget = (index: number) => {
    const { ref, autocompleteRef } = usePlacesWidget({
      options: {
        types: ['(regions)'],
        fields: ['formatted_address'],
      },
      apiKey: process.env.NEXT_PUBLIC_API_KEY_PLACES,
      onPlaceSelected: (place) => {
        console.log(place);
        form.setValue(`destination.${index}.name`, place.formatted_address);
      },
    });
    return ref;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-7 rounded-2xl sm:w-6/12 w-full bg-white/50 flex flex-col items-center"
      >
        <div className="sm:w-10/12 w-11/12 my-20">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="pb-3 relative">
                <IoEarthSharp className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                <FormControl>
                  <Input
                    className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold "
                    placeholder="Nom du voyage"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="pb-3 relative">
                <FaPencilAlt className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                <FormControl>
                  <Input
                    className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold"
                    placeholder="Description (optionnelle)"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          {fields.map((field, index) => (
            <div key={field.id} className="">
              <FormField
                control={form.control}
                name={`destination.${index}.name`}
                render={({ field }) => (
                  <FormItem className="pb-3 relative">
                    <FaMapMarkerAlt className="absolute left-3 top-5 transform -translate-y-1/2 z-10 text-marron" />
                    <FormControl ref={createPlacesWidget(index) as never}>
                      <Input
                        className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold "
                        placeholder="Destination"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`destination.${index}.dateStart`}
                render={({ field }) => (
                  <FormItem className="pb-3 relative">
                    <DatePickerWithRange
                      value={{
                        from: field.value,
                        to: form.getValues(`destination.${index}.dateEnd`),
                      }}
                      onChange={(val) => {
                        form.setValue(
                          `destination.${index}.dateStart`,
                          // @ts-expect-error
                          val?.from,
                        );
                        // @ts-expect-error
                        form.setValue(`destination.${index}.dateEnd`, val?.to);
                      }}
                    />
                    {form.formState.errors.destination?.[index]?.dateStart && (
                      <p className="mt-2 text-sm text-red-500">
                        {
                          form.formState.errors.destination[index]?.dateStart
                            ?.message
                        }
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => remove(index)}>
                Supprimer la destination
              </Button>
            </div>
          ))}

          <Button
            className="mt-3"
            type="button"
            onClick={() =>
              append({ name: '', dateStart: new Date(), dateEnd: new Date() })
            }
          >
            Ajouter une destination
          </Button>

          <FormMessage className="">
            {(fields.length < 1 &&
              'Veuillez ajouter au moins une destination') ||
              message}
          </FormMessage>
        </div>

        <Button
          className="rounded-b-2xl rounded-t-none w-full bg-jaune text-marron font-bold h-16"
          type="submit"
          disabled={!form.formState.isValid}
        >
          Envoyer
        </Button>
      </form>
    </Form>
  );
}