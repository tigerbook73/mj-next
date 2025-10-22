import Link from "next/link";

export default function SignIn() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl font-bold">
          Welcome to Mahjong Online
        </h1>
        <div className="max-w-md text-center text-lg">
          Play Mahjong Online with Friends
        </div>
      </header>
      <main className="flex w-80 flex-col items-center gap-8">
        {/* signin: email + password */}
        <div className="w-full max-w-2xl rounded-lg bg-gray-200 p-8 text-center shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Sign In</h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="rounded border border-gray-400 p-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded border border-gray-400 p-2"
            />
            <button
              type="submit"
              className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              <Link href="/lobby">Sign In</Link>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
