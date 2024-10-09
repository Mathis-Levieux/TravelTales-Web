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
import { handleDeleteActivity } from "@/app/lib/actions";
import { useRouter } from "next/navigation";


export default function DeleteActivity({ activityId, className, tripId }: { activityId: number, className?: string, tripId: number }) {
    
    const router = useRouter();

    const leaveActivity = async () => {
        await handleDeleteActivity({ activityId });
        router.push(`/trip/${tripId}`);
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div>
                        <RoundIcon title="Supprimer la destination" aria-label="Supprimer la destination" icon={<PiTrashFill className={`text-red-600 cursor-pointer text-2xl`} />} className='bg-white h-10 w-10 cursor-pointer' />
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
                        <AlertDialogTitle className="text-center">{"Êtes-vous sûr de vouloir supprimer cette activité ?"}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {"Si vous supprimez cette activité, vous ne pourrez plus accéder à ses informations."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">
                        <AlertDialogAction
                            className="text-white font-bold w-full bg-rougelight hover:bg-red-600 py-6"
                            onClick={leaveActivity}
                        >
                            {"Supprimer l'activité"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}