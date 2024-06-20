import Header from './ui/header';
export default function Home() {
  return (
    <>
      <Header isLandingPage={true} />
      <main className="">
        <div className="flex justify-center">
          <h1 className="text-4xl">Welcome to TravelTales</h1>
        </div>
      </main>
    </>
  );
}
