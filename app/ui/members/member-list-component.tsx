import { User } from "@/app/lib/types";
import RoundIcon from "../round-icon";
import { FaClock, FaUser } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default async function MemberComponent({ user }: { user: User }) {


    return (
        <div className="flex items-center md:gap-5 gap-2 justify-center">
            <RoundIcon icon={user.verified ? <FaUser className="text-marron text-3xl" /> : <FaClock className="text-gray-500 text-3xl" />} className={`${user.verified ? "border-jaune" : "border-gray-500"} border-8 h-16 w-16`} />
            <button className={`font-semibold rounded-full p-2 flex items-center opacity-85 md:w-2/3 w-4/5 ${user.verified ? "bg-jaune" : "bg-gray-500"}`} title={"Inviter un voyageur"}>
                <div className="bg-white rounded-l-full flex w-full py-3 ml-1">
                    <span className={"md:ml-10 ml-5 font-bold"}>{user.username}</span>
                </div>
                <div className="flex items-center justify-center rounded-full ms-3 me-1">
                    <RoundIcon icon={<IoMdMail className={`${user.verified ? "text-marron" : "text-gray-500"} text-2xl`} />} className="h-14 w-14" />
                </div>
            </button>
        </div>
    );
}
