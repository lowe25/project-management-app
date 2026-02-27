import LoginPage from "./login/page";

export default function Home() {
  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold m-[20]">
            Project Management Login
          </h1>
          <LoginPage />
        </div>
      </section>
    </>
  );
}
