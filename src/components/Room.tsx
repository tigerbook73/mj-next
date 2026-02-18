"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Bot, User, UserPlus } from "lucide-react";
import { Card } from "./ui/card";
import { Position } from "@/common/core/mj.game";
import { RoomStatus } from "@/common/models/room.model";
import {
  useRoomStore,
  type RoomModelInStore,
  type SeatModelInStore,
} from "@/store/room-store";
import { socketClient } from "@/lib/socket-client";
import { cn } from "@/lib/utils";
import { UserType } from "@/common";

// Maps each Position to its CSS placement around the table
const SEAT_POSITIONS: Record<number, string> = {
  [Position.North]: "absolute top-0 left-1/2 -translate-x-1/2",
  [Position.East]: "absolute top-1/2 right-0 -translate-y-1/2",
  [Position.South]: "absolute bottom-0 left-1/2 -translate-x-1/2",
  [Position.West]: "absolute top-1/2 left-0 -translate-y-1/2",
};

const SEAT_ORDER = [
  Position.East,
  Position.South,
  Position.West,
  Position.North,
];

const POSITION_LABEL: Record<number, string> = {
  [Position.East]: "东",
  [Position.South]: "南",
  [Position.West]: "西",
  [Position.North]: "北",
};

// North/South span the table width; East/West span the table height
const SEAT_SIZE: Record<number, string> = {
  [Position.North]: "w-[50%] min-w-[100px] h-12",
  [Position.East]: "h-[50%] min-h-[100px] w-12",
  [Position.South]: "w-[50%] min-w-[100px] h-12",
  [Position.West]: "h-[50%] min-h-[100px] w-12",
};

// ---- ChairSlot sub-component ----

type ChairSlotProps = {
  player: SeatModelInStore | undefined;
  position: Position;
  isMe: boolean;
  positionClass: string;
  onDoubleClick: () => void;
};

function ChairSlot({
  player,
  position,
  isMe,
  positionClass,
  onDoubleClick,
}: ChairSlotProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onDoubleClick={onDoubleClick}
          className={cn(
            "@container flex cursor-pointer flex-col items-center justify-center rounded-lg transition-colors",
            SEAT_SIZE[position],
            player
              ? "bg-amber-200 hover:bg-amber-300"
              : "bg-gray-200 hover:bg-gray-300",
            isMe && "ring-2 ring-blue-500 ring-offset-1",
            positionClass,
          )}
        >
          <span className="text-s font-bold leading-none">
            {POSITION_LABEL[position]}
          </span>
          {player?.type === UserType.Human ? (
            <User className="size-[min(70cqw,70cqh)] text-black" />
          ) : player?.type === UserType.Bot ? (
            <Bot className="size-[min(70cqw,70cqh)] text-black" />
          ) : (
            <UserPlus className="size-[min(70cqw,70cqh)] text-gray-400" />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>{player ? player.userName : "Empty"}</TooltipContent>
    </Tooltip>
  );
}

// ---- Room component ----

type RoomProps = {
  room: RoomModelInStore;
};

export default function Room({ room }: RoomProps) {
  const myPosition = useRoomStore((s) => s.myPosition);
  const myRoom = useRoomStore((s) => s.myRoom);

  const handleChairClick = (position: Position) => {
    // if position is bot, join the room (leave previous room if possible)
    // if position is me, leave the position
    // if position is other player, do nothing
    const playerInPosition = room.players.find((p) => p.position === position);
    if (playerInPosition && playerInPosition.type === UserType.Bot) {
      if (myRoom) {
        socketClient.leaveRoom(myRoom.name);
      }
      socketClient.joinRoom(room.name, position);
    } else if (
      playerInPosition &&
      playerInPosition.userName ===
        myRoom?.findPlayerByPosition(position)?.userName &&
      myPosition === position
    ) {
      if (playerInPosition.position === myPosition) {
        // leave current position
        socketClient.leaveRoom(room.name);
      }
      // else do nothing
    } else {
      // do nothing
    }
  };

  const handleEnter = () => {
    socketClient.enterGame(room.name);
  };

  return (
    <TooltipProvider>
      <Card className="flex h-full w-full flex-col items-center justify-center border-black bg-lime-100 p-4">
        <div className="mb-4 text-xl font-semibold">{room.name}</div>

        <div className="relative flex aspect-square w-full max-w-[400px] items-center justify-center">
          {/* Center table */}
          <div className="flex h-[50%] min-h-[100px] w-[50%] min-w-[100px] items-center justify-center rounded-lg bg-teal-600 font-bold text-white">
            {room.state === RoomStatus.Started ? (
              "Playing..."
            ) : (
              <Button
                variant="ghost"
                onClick={handleEnter}
                disabled={!myRoom || myRoom.name !== room.name}
              >
                ENTER
              </Button>
            )}
          </div>

          {SEAT_ORDER.map((position) => {
            const player = room.players.find((p) => p.position === position);
            return (
              <ChairSlot
                key={position}
                player={player}
                position={position}
                isMe={position === myPosition && room.name === myRoom?.name}
                positionClass={SEAT_POSITIONS[position]}
                onDoubleClick={() => handleChairClick(position)}
              />
            );
          })}
        </div>
      </Card>
    </TooltipProvider>
  );
}
