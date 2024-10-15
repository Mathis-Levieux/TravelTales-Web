import colorMap from "@/app/lib/colorMap";
import iconMap from "@/app/lib/iconMap";
import { Activity, User } from "@/app/lib/types";
import { FaCalendar, FaComment, FaMoneyBill, FaQuestionCircle, FaWallet } from 'react-icons/fa'; // Fallback icon
import { MdDone, MdEdit } from "react-icons/md";
import RoundIcon from "../round-icon";
import ActivityButton from "./activity-buttons";
import DeleteActivity from "./delete-activity";
import EditActivityForm from "./edit-activity";
import { getActivitiesCategories, getUser } from "@/app/lib/data";
import CreateCommentForm from "./create-comment";
import DeleteComment from "./delete-comment";

const DefaultIcon = FaQuestionCircle;

export default async function ActivityFull({ activity }: { activity: Activity }) {

    const username = await getUser('username');
    const categories = await getActivitiesCategories();
    const IconComponent = iconMap[activity.category] || DefaultIcon;
    const color = colorMap[activity.category] || "bg-white";
    const date = new Date(activity.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    let expense = "Pas de dépense";
    if (activity.expense) {
        expense = `${activity.expense.amount} €`;
    }

    return (
        <div className="flex mt-14 justify-around">
            {/* Partie gauche - Titre, description, budget, date et formulaires de dépenses et de commentaires */}
            <div className="flex flex-col w-[45%]">
                <div className="flex flex-col bg-white bg-opacity-65 rounded-3xl shadow-lg mb-6">
                    {/* Icône et titre */}
                    <div className="h-3/4 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className={`h-12 w-12 flex items-center justify-center bg-white rounded-full border-4 border-${color} text-${color}`}>
                                    <IconComponent />
                                </div>
                                <h3 className={`ml-4 text-${color} font-bold text-2xl`}>{activity.name}</h3>
                            </div>
                            {/* Actions - Editer et supprimer */}
                            <div className="flex space-x-2">
                                <EditActivityForm categories={categories} activity={activity}>
                                    <RoundIcon title="Modifier l'activité" aria-label="Modifier l'activité" icon={<MdEdit className="text-marron text-2xl" />} className='bg-white h-10 w-10 cursor-pointer' />
                                </EditActivityForm>
                                <RoundIcon icon={<DeleteActivity activityId={activity.id} tripId={activity.destination.tripId} className='text-2xl' />} className='bg-white h-10 w-10 cursor-pointer' />
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-6 text-justify" >{activity.description}</p>
                    </div>

                    {/* Budget et Date */}
                    <div className={`flex justify-between items-center bg-${color} h-1/4 p-4 rounded-b-3xl relative`}>
                        <div className="flex items-center gap-2">
                            <FaMoneyBill className="text-2xl" />
                            <p className="text-lg">{expense}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendar className="text-2xl" />
                            <p className="text-lg">{date}</p>
                        </div>
                        <RoundIcon title="Fait / Pas encore fait" aria-label="Fait / Pas encore fait" icon={<MdDone className={`text-${color} text-5xl`} />} className={`bg-white border-8 border-${color} h-20 w-20 cursor-pointer absolute left-1/2 transform -translate-x-1/2 top-4`} />
                    </div>
                </div>

                {/* Formulaire de dépenses */}
                <ActivityButton className={`mt-10 mb-5 bg-${color} shadow-createtripbutton`} icon={<FaWallet className="text-2xl mx-3" />} title="Ajouter une dépense" textCenter={true} >Créer une dépense</ActivityButton>

                {/* Formulaire de commentaires */}
                <CreateCommentForm activity={activity}>
                    <ActivityButton className={`mb-10 bg-jaune shadow-createtripbutton`} icon={<FaComment className="text-2xl mx-3" />} title="Ajouter un commentaire" textCenter={true} >Ajouter un commentaire</ActivityButton>
                </CreateCommentForm>
            </div>


            {/* Partie droite - Commentaires */}
            <div className="w-[45%]">
                {
                    activity.comment.map((comment, index) => (
                        <div key={index} className="flex flex-col bg-white bg-opacity-65 rounded-3xl shadow-lg mb-6 p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-marron font-bold text-xl">{comment.user.username}</h3>
                                <p className="text-gray-500">{new Date(comment.date).toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}</p>
                            </div>
                            <p className="text-gray-700 mt-2">{comment.content}</p>
                            {username === comment.user.username && <DeleteComment comment={comment} />}
                        </div>
                    ))
                }
            </div>


        </div>

    )
}