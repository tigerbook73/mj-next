import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <div className="min-h-screen w-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
        <h1 className="mb-4 text-center text-4xl font-bold">Lobby Page</h1>
        <div className="w-160 mb-4 flex flex-row items-center justify-between gap-4">
          {/* create 4 links using for loop */}
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="flex h-40 w-40 flex-row items-center justify-between rounded-lg bg-gray-200 p-4 text-center shadow-md"
            >
              <Link
                href={`/game`}
                className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
              >
                Enter Game {i + 1}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
