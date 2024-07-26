import { getUser } from "@/app/lib/data";
import Profile from '@/app/ui/user/user';
import type { User } from "@/app/lib/types";
import Header from "@/app/ui/header";

export default async function Page() {

    const user: User = await getUser();

    return (
        <>
            <Header isLoggedIn={true} homeIcons={true} />
            <main className="container m-auto w-full flex justify-center">
                <Profile user={user} />
            </main>
        </>
    );
}