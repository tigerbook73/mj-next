"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Tile } from "./Tile";
import { CommonUtil, Direction } from "@/lib/game-utils";
import { JSX } from "react";
import { useTileFlightStore, useGameStore, useRoomStore } from "@/store";
import { tilePositionRegistry } from "@/lib/tile-position-registry";

const flexClasses: Record<Direction, string> = {
  [Direction.Bottom]: "flex-row",
  [Direction.Top]: "flex-row-reverse",
  [Direction.Left]: "flex-col",
  [Direction.Right]: "flex-col-reverse",
  [Direction.None]: "flex-row",
};

const scaleClasses: Record<Direction, string> = {
  [Direction.Bottom]: "origin-top-left scale-100 -mt-2",
  [Direction.Top]: "origin-bottom-right scale-100 -mb-2",
  [Direction.Left]: "origin-top-right scale-100 -mr-2",
  [Direction.Right]: "origin-bottom-left scale-100 -ml-2",
  [Direction.None]: "",
};

interface OpenSetTilesProps {
  direction: Direction;
  className?: string;
}

export function OpenSetTiles({
  direction,
  className,
}: OpenSetTilesProps): JSX.Element {
  const game = useGameStore((state) => state.game)!;
  const myPosition = useRoomStore((state) => state.myPosition)!;

  const position = CommonUtil.mapPosition(myPosition, direction);
  const player = game.players[position]!;

  const openSets = player.openedSets;

  const containerRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(openSets.length);

  // When a new meld set appears, fly each tile from its captured "from" position
  // (hand or discard) to its landing slot in the meld area simultaneously.
  useLayoutEffect(() => {
    const prev = prevLengthRef.current;
    prevLengthRef.current = openSets.length;

    if (openSets.length <= prev) {
      return;
    }

    const newSet = openSets[openSets.length - 1];
    if (!newSet) {
      return;
    }

    for (const tid of newSet.tiles) {
      const fromRect = tilePositionRegistry.get(tid);
      if (!fromRect) {
        continue;
      }
      const el = containerRef.current?.querySelector(`[data-tile-id="${tid}"]`);
      if (!el) {
        continue;
      }
      tilePositionRegistry.delete(tid);
      // Claimed discard tile is always face-up; hand tiles are face-up for the
      // bottom player and back-face for opponents.
      const isHandTile = tid !== newSet.target;
      const back = isHandTile && direction !== Direction.Bottom;
      useTileFlightStore.getState().startFlight(tid, fromRect, el.getBoundingClientRect(), back);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSets.length]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-2",
        flexClasses[direction],
        scaleClasses[direction],
        className,
      )}
    >
      {openSets.map((set, index) => (
        <div key={index} className={cn("flex", flexClasses[direction])}>
          {set.tiles.map((tid) => (
            <Tile
              key={tid}
              tileId={tid}
              direction={direction}
              size={80}
              special={set.target === tid ? "success" : "normal"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
