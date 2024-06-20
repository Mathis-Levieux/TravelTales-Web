import Header from '../ui/header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isLoggedIn={true} homeIcons={true} />
      {children}
    </>
  );
}
