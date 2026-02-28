"use client";

import { UserType } from "@/common/models/common.types";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { useRoomStore } from "@/store";
import { Position } from "@/common/core/mj.game";
import type { CSSProperties } from "react";
import { useIsCurrentPlayer } from "@/hooks/useIsCurrentPlayer";
import { cn } from "@/lib/utils";

interface PlayerInfoLabelProps {
  direction: Direction;
}

// Label natural height (used to correct edge alignment for rotated left/right labels):
//   H = lineHeight × 2 lines + paddingY × 2 = 2.2vmin × 2 + 0.3vmin × 2 = 5vmin
//   H/2 = 2.5vmin  — update this constant if font/padding values change.
const LABEL_HALF_H = "2.5vmin";

// Width of the label = 50% of the center layer (containing block).
// For left/right, the correct left/right offset that makes the post-rotation
// visual edge flush with the container edge is: H/2 - W/2 = H/2 - 25%
const LEFT_OFFSET = `calc(${LABEL_HALF_H} - 25%)`;

const wrapperStyleByDirection: Record<Direction, CSSProperties> = {
  [Direction.Bottom]: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: "50%",
    transform: "translateX(-50%)",
  },
  [Direction.Top]: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: "50%",
    transform: "translateX(-50%) rotate(180deg)",
  },
  [Direction.Left]: {
    position: "absolute",
    top: "50%",
    left: LEFT_OFFSET,
    width: "50%",
    transform: "translateY(-50%) rotate(90deg)",
  },
  [Direction.Right]: {
    position: "absolute",
    top: "50%",
    right: LEFT_OFFSET,
    width: "50%",
    transform: "translateY(-50%) rotate(-90deg)",
  },
  [Direction.None]: {},
};

export function PlayerInfoLabel({ direction }: PlayerInfoLabelProps) {
  const isCurrentPlayer = useIsCurrentPlayer(direction);

  const myPosition = useRoomStore((state) => state.myPosition);
  const myRoom = useRoomStore((state) => state.myRoom);

  if (myPosition === null || direction === Direction.None) {
    return null;
  }

  const playerPosition = CommonUtil.mapPosition(myPosition as Position, direction);
  const player = myRoom?.findPlayerByPosition(playerPosition);

  if (!player) {
    return null;
  }

  const positionText = CommonUtil.positionToText(playerPosition);
  const playerTextColor = player.type === UserType.Human ? "text-yellow-500" : "text-text";

  return (
    <div style={wrapperStyleByDirection[direction]}>
      <div
        className={cn(
          "bg-green-900/85 text-center",
          playerTextColor,
          isCurrentPlayer && "bg-blue-600/85 ring-2 ring-inset ring-blue-900/60",
        )}
        style={{
          fontSize: "2vmin",
          lineHeight: "2.4vmin",
          padding: "0.4vmin 0.8vmin",
          borderRadius: "0.4vmin",
        }}
      >
        <div className="pm-[1vmin] font-bold text-pink-400">{positionText}</div>
        <div className={`flex items-center justify-center gap-[0.5vmin] ${playerTextColor}`}>{player.userName}</div>
      </div>
    </div>
  );
}
