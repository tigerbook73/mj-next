import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function LobbyPage() {
  const games = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex min-h-screen w-screen flex-col items-center gap-16 p-8 sm:p-20">
      <h1 className="mb-4 text-center text-4xl font-bold">Lobby Page</h1>

      <div className="grid w-full max-w-[1024px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {games.map((i) => (
          <Link key={i} href="/game">
            <Card className="flex min-h-40 flex-col transition-shadow hover:shadow-lg">
              <CardHeader className="flex items-center justify-center text-center">
                <CardTitle>Game {i}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-grow items-center justify-center text-center">
                Enter Game {i}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
