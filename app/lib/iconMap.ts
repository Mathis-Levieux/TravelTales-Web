import { FaPersonWalking } from "react-icons/fa6";
import { MdOutlineCastle } from "react-icons/md";
import { GiKnifeFork, GiShoppingBag } from "react-icons/gi";
import { IconType } from 'react-icons';  // Import IconType for typing

// Define a mapping between activity categories and their corresponding icons (as components)
const iconMap: { [key: string]: IconType } = {
    food: GiKnifeFork,
    shopping: GiShoppingBag,
    sightseeing: MdOutlineCastle,
    sport: FaPersonWalking,
};

export default iconMap;
