import { FaBagShopping, FaBurger, FaPersonWalking } from "react-icons/fa6";
import { IconType } from 'react-icons';
import { FaEllipsisH, FaLandmark, FaTree } from "react-icons/fa";

const iconMap: { [key: string]: IconType } = {
    food: FaBurger,
    shopping: FaBagShopping,
    culture: FaLandmark,
    sport: FaPersonWalking,
    other: FaEllipsisH,
    nature: FaTree,
};

export default iconMap;
