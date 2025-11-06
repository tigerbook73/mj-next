"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Room({ name }: { name: string }) {
  return (
    <Link href="/game">
      <Card className="flex min-h-40 flex-col transition-shadow hover:shadow-lg">
        <CardHeader className="flex items-center justify-center text-center">
          <CardTitle>Room {name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-grow items-center justify-center text-center">
          Join Room
        </CardContent>
      </Card>
    </Link>
  );
}
