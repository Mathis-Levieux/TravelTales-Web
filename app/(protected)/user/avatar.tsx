// 'use client';
// import { FaUser } from 'react-icons/fa';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useState } from 'react';
// import { Label } from '@/components/ui/label';

// const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5Mo
// const ACCEPTED_IMAGE_MIME_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ];
// const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];

// const FormSchema = z.object({
//   avatar: z
//     .any()
//     .optional()
//     .refine((value) => value[0]?.size <= MAX_FILE_SIZE, {
//       message: 'Le fichier ne doit pas dépasser 5Mo',
//     })
//     .refine((value) => ACCEPTED_IMAGE_MIME_TYPES.includes(value[0]?.type), {
//       message: 'Le fichier doit être une image jpeg ou png',
//     })
//     .refine(
//       (value) => ACCEPTED_IMAGE_TYPES.includes(value[0]?.type.split('/')[1]),
//       {
//         message: 'Le fichier doit être une image jpeg ou png',
//       },
//     ),
// });

// export default function RegisterForm() {
//   const [message, setMessage] = useState<string>('');

//   const form = useForm<z.infer<typeof FormSchema>>({
//     mode: 'all',
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       avatar: undefined,
//     },
//   });

//   const fileRef = form.register('avatar');

//   async function onSubmit(value: z.infer<typeof FormSchema>) {
//     const response = await uploadAvatar(value);
//     if (response.error) setMessage(response.error);
//     else if (response.message) setMessage(response.message);
//   }
//   return (
//     <>
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="my-10 rounded-2xl w-6/12 bg-white/50 flex flex-col items-center"
//         >
//           <div className="w-10/12">
//             <FormField
//               control={form.control}
//               name="avatar"
//               render={({ field }) => (
//                 <FormItem className="pb-3">
//                   <Label
//                     htmlFor="avatar"
//                     className="cursor-pointer w-fit m-auto block"
//                   >
//                     <FaUser
//                       className="bg-white rounded-full m-auto text-marron py-7 my-3"
//                       size={100}
//                     />
//                   </Label>
//                   <FormControl>
//                     <Input
//                       id="avatar"
//                       type="file"
//                       className="hidden"
//                       {...fileRef}
//                     />
//                   </FormControl>
//                   <FormMessage className="text-sm text-red-500" />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormMessage aria-live="polite" role="status">
//             {message}
//           </FormMessage>
//           <Button
//             className="mt-10 rounded-b-2xl rounded-t-none w-full bg-jaune text-marron font-bold h-16"
//             type="submit"
//             disabled={!form.formState.isValid}
//           >
//             Créer un compte
//           </Button>
//         </form>
//       </Form>
//     </>
//   );
// }
