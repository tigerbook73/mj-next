import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl font-bold">
          Welcome to Mahjong Online
        </h1>
        <div className="max-w-md text-center text-lg">
          Play Mahjong Online with Friends
        </div>
      </header>
      <main className="flex w-80 flex-col items-center gap-8">
        <div className="w-full max-w-2xl rounded-lg bg-gray-200 p-8 text-center shadow-md">
          <Link className="text-xl" href="/signin">
            Sign In
          </Link>
        </div>
        <div className="w-full max-w-2xl rounded-lg bg-gray-200 p-8 text-center shadow-md">
          <Link className="text-xl" href="/signup">
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
