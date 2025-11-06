"use client";

import Room from "@/components/room";

export default function LobbyPage() {
  const games = [1, 2, 3, 4, 5];

  return (
    <div className="flex min-h-screen w-screen flex-col items-center gap-16 p-8 sm:p-20">
      <h1 className="mb-4 text-center text-4xl font-bold">Lobby Page</h1>

      <div className="grid w-full max-w-[1024px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {games.map((i) => (
          <Room key={i} name={`Room ${i}`} />
        ))}
      </div>
    </div>
  );
}
