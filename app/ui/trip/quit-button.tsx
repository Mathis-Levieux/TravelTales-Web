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
import { handleCountUsersInTrip, handleLeaveTrip } from "@/app/lib/actions";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useState } from "react";


export default function QuitButton({ id }: { id: number }) {

    const leaveTrip = async () => {
        await handleLeaveTrip({ id });
    }

    const [userCount, setUserCount] = useState(0);

    const countUsersInTrip = async () => {
        const userCount = await handleCountUsersInTrip({ id });
        setUserCount(userCount);
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div onClick={countUsersInTrip}>
                        <FaRegTrashAlt
                            className="text-red-600 mr-14 cursor-pointer"
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
                        <AlertDialogTitle className="text-center">{userCount > 1 ? "Êtes-vous sûr de vouloir quitter ce voyage ?" : "Êtes-vous sûr de vouloir supprimer ce voyage ?"}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {userCount > 1 ? "Si vous quittez, vous ne pourrez plus accéder aux informations de ce voyage." : "Vous êtes le dernier utilisateur sur ce voyage, si vous le quittez, il sera supprimé."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">
                        <AlertDialogAction
                            className="text-white font-bold w-full bg-rougelight hover:bg-red-600 py-6"
                            onClick={leaveTrip}
                        >
                            {userCount > 1 ? "Quitter le voyage" : "Supprimer le voyage"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}