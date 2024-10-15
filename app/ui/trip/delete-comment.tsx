"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PiTrashFill } from "react-icons/pi";
import RoundIcon from "../round-icon";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { handleDeleteComment } from "@/app/lib/actions";
import { Comment } from "@/app/lib/types";

export default function DeleteComment({ comment }: { comment: Comment }) {

    const router = useRouter();

    const deleteComment = async () => {
        await handleDeleteComment(comment.id);
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div>
                        <RoundIcon title="Supprimer le commentaire" aria-label="Supprimer le commentaire" icon={<PiTrashFill className={`text-red-600 cursor-pointer text-2xl`} />} className='bg-white h-10 w-10 cursor-pointer' />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="p-0 border-none">
                    <AlertDialogHeader className="p-4 h-40 flex flex-col justify-center items-center relative">
                        <AlertDialogCancel asChild>
                            <div className="absolute top-1 right-2 border-none">
                                <RiArrowGoBackLine
                                    className="text-black text-2xl cursor-pointer"
                                />
                            </div>
                        </AlertDialogCancel>
                        <AlertDialogTitle className="text-center">{"Êtes-vous sûr de vouloir supprimer votre commentaire ?"}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {"Cette action est définitive."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">
                        <AlertDialogAction
                            className="text-white font-bold w-full bg-rougelight hover:bg-red-600 py-6"
                            onClick={deleteComment}
                        >
                            {"Supprimer le commentaire"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}