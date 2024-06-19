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
import { FaRegTrashAlt } from "react-icons/fa";
import { handleLeaveTrip } from "@/app/lib/actions";
import { RiArrowGoBackLine } from "react-icons/ri";


export default function QuitButton({ id }: { id: number }) {

    const leaveTrip = async () => {
        await handleLeaveTrip({ id });
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <FaRegTrashAlt
                        className="text-red-600 mr-14 cursor-pointer"
                    />
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
                        <AlertDialogTitle className="text-center">Êtes-vous sûr de vouloir quitter ce voyage ?</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            Si vous quittez, vous ne pourrez plus accéder aux informations de ce voyage.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">
                        <AlertDialogAction
                            className="text-white font-bold w-full bg-rougelight hover:bg-red-600 py-6"
                            onClick={leaveTrip}
                        >
                            Quitter le voyage
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}