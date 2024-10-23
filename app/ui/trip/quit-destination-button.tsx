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
import { handleDeleteDestination } from "@/app/lib/actions";
import { RiArrowGoBackLine } from "react-icons/ri";
import { PiTrashFill } from "react-icons/pi";


export default function QuitDestButton({ values, className }: { values: { tripId: number, destId: number }, className: string }) {

    const deleteDestination = async () => {
        await handleDeleteDestination({ tripId: values.tripId, destId: values.destId });
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div>
                        <PiTrashFill title="Supprimer la destination"
                            className={`text-red-600 cursor-pointer text-2xl ${className}`}
                        />
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
                        <AlertDialogTitle className="text-center">{"Êtes-vous sûr de vouloir supprimer cette destination ?"}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {"Cela la supprimera définitivement pour tous les participants du voyage."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">
                        <AlertDialogAction
                            className="text-white font-bold w-full bg-rougelight hover:bg-red-600 py-6"
                            onClick={deleteDestination}
                        >
                            {"Supprimer la destination"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}