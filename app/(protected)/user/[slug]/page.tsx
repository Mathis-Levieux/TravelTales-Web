import Header from "../../../ui/header";
import Profile from "../../../ui/user/user";

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <div>
            <main className="m-auto w-full flex justify-center">
                <p>{params.slug}</p>
                <Profile />
            </main>
        </div>
    );
}