import Nav from "../ui/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div>
                <Nav />
            </div>
            <div>
                {children}
            </div>
        </>
    );
}