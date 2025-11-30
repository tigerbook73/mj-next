"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { User2, UserPlus } from "lucide-react";
import Link from "next/link";
import { Card } from "./ui/card";

type Chair = {
  id: number;
  player?: string;
};

type RoomProps = {
  name: string;
  chairs?: Chair[];
  gameStarted?: boolean;
};

export default function Room({
  name,
  chairs = [
    { id: 1, player: "Player 1" },
    { id: 2 },
    { id: 3, player: "Player 3" },
    { id: 4 },
  ],
  gameStarted = false,
}: RoomProps) {
  const [currentChairs] = useState(chairs);

  const renderChairIcon = (chair: Chair) => {
    return chair.player ? (
      <User2 className="h-6 w-6 text-black" />
    ) : (
      <UserPlus className="h-6 w-6 text-gray-400" />
    );
  };

  const handleStart = () => {
    console.log("Start Game clicked!");
    // 这里未来可以改为触发实际逻辑（例如 emit socket 或 setState）
  };

  return (
    <TooltipProvider>
      <Card className="flex h-full w-full flex-col items-center justify-center border-black bg-lime-100 p-4">
        <div className="mb-4 text-xl font-semibold">{name}</div>

        <div className="relative flex aspect-square w-full max-w-[400px] items-center justify-center">
          {/* 中间桌子区域 */}
          <div className="flex h-[40%] min-h-[100px] w-[40%] min-w-[100px] items-center justify-center rounded-lg bg-teal-600 font-bold text-white">
            {gameStarted ? (
              "Playing..."
            ) : (
              <Link href="/game" className="hover:underline">
                <Button variant="ghost" onClick={handleStart}>
                  START
                </Button>
              </Link>
            )}
          </div>

          {currentChairs.map((chair, index) => {
            const positions = [
              "absolute top-0 left-1/2 -translate-x-1/2",
              "absolute top-1/2 right-0 -translate-y-1/2",
              "absolute bottom-0 left-1/2 -translate-x-1/2",
              "absolute top-1/2 left-0 -translate-y-1/2",
            ];

            const chairBg = chair.player ? "bg-amber-200" : "bg-gray-200";
            const chairHoverBg = chair.player
              ? "hover:bg-amber-300"
              : "hover:bg-gray-300";

            return (
              <Tooltip key={chair.id}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full ${chairBg} ${positions[index]} transition-colors ${chairHoverBg}`}
                  >
                    {renderChairIcon(chair)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{chair.player || "Empty"}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </Card>
    </TooltipProvider>
  );
}
