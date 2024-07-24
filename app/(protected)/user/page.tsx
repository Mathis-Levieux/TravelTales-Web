import { getUser } from "@/app/lib/data";
import Profile from '@/app/ui/user/user';
import type { User } from "@/app/lib/types";

export default async function Page() {

    const user: User = await getUser();

    return (
        <div>
            <main className="container m-auto w-full flex justify-center">
                <Profile user={user} />
            </main>
        </div>
    );
}