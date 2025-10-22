import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <div className="grid min-h-screen w-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
        <h1 className="text-center text-4xl font-bold">Lobby Page</h1>
        <Link
          href="/game"
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Enter Game
        </Link>
      </div>
    </>
  );
}
