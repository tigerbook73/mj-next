"use client";

import { PlayerTilesLeft } from "@/components/player-tiles-left";
import { PlayerTilesBottom } from "@/components/player-tiles-bottom";
import { PlayerTilesRight } from "@/components/player-tiles-right";
import { PlayerTilesTop } from "@/components/player-tiles-top";
import SpeedDial from "@/components/ui-ex/speed-dial";
import { Button } from "@/components/ui/button";
import { LogOut, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WallTiles } from "@/components/wall-tiles";
import { Direction } from "@/lib/game-utils";
import { DiscardTiles } from "@/components/discard-tiles";
import { useUIStore } from "@/store";
import { useEffect, useRef } from "react";

export default function Game() {
  // Define grid proportions as variables for easy adjustment
  const outerEdge = "grid-cols-[10%_1fr_10%] grid-rows-[10%_1fr_10%]"; // Outer player edge width/height
  const middleEdge = "grid-cols-[15%_1fr_15%] grid-rows-[15%_1fr_15%]"; // Middle wall edge width/height
  const innerEdge = "grid-cols-[20%_60%_20%] grid-rows-[20%_60%_20%]"; // Inner discard edge width/height

  const router = useRouter();
  const actions = [
    {
      icon: <PersonStandingIcon className="h-5 w-5" />,
      label: "Quit Game",
      onClick: () => router.push("/lobby"),
    },
    {
      icon: <LogOut className="h-5 w-5" />,
      label: "Sign Out",
      onClick: () => router.push("/"),
    },
  ];

  // get width of this component and set UI store tile size accordingly
  const setTileSize = useUIStore((state) => state.setTileSize);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !setTileSize) return;

    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth / 20;
        setTileSize(width);

        //
        console.log("Setting tile size to:", `${width}px`);
      }
    };

    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    updateSize();

    return () => observer.disconnect();
  }, [setTileSize]);

  return (
    // Outer container: full screen, center content
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      {/* Player layer (outer 3x3 grid) */}
      <div
        className={`grid aspect-square min-h-[300px] w-[98vmin] min-w-[300px] ${outerEdge} overflow-hidden bg-green-800 font-mono text-sm text-white ring-2 ring-indigo-900`}
      >
        {/* First row */}
        <div className="flex items-center justify-center">{/* P-TL */}</div>
        <div className="flex items-center justify-center">
          <PlayerTilesTop />
        </div>
        <div className="flex items-center justify-center">{/* P-TR */}</div>
        {/* Second row */}
        <div className="flex items-center justify-center">
          <PlayerTilesLeft />
        </div>

        {/* Wall layer (middle 3x3 grid) */}
        <div
          className={`grid ${middleEdge} overflow-hidden bg-green-700 ring-2 ring-green-500`}
        >
          {/* First row */}
          <div className="flex items-center justify-center text-xs">W-TL</div>
          <div className="flex items-center justify-center text-xs">
            <WallTiles direction={Direction.Top} />
          </div>
          <div className="flex items-center justify-center text-xs">W-TR</div>

          {/* Second row */}
          <div className="flex items-center justify-center text-xs">
            <WallTiles direction={Direction.Left} />
          </div>

          {/* Discard layer (inner 3x3 grid) */}
          <div
            className={`grid ${innerEdge} overflow-hidden bg-cyan-700 ring-2 ring-lime-500`}
          >
            {/* First row */}
            <div className="flex items-center justify-center text-[10px]">
              {/* D-TL */}
            </div>
            <div className="flex items-center justify-center text-[10px]">
              <DiscardTiles direction={Direction.Top} />
            </div>
            <div className="flex items-center justify-center text-[10px]">
              {/* D-TR */}
            </div>

            {/* Second row */}
            <div className="flex items-center justify-center text-[10px]">
              <DiscardTiles direction={Direction.Left} />
            </div>
            <div className="flex items-center justify-center bg-gray-300 text-[10px]">
              <Button variant="default" size="sm" className="aspect-square">
                <Link href="/lobby">Quit </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center text-[10px]">
              <DiscardTiles direction={Direction.Right} />
            </div>

            {/* Third row */}
            <div className="flex items-center justify-center text-[10px]">
              {/* D-BL */}
            </div>
            <div className="flex h-full w-full items-center justify-center text-[10px]">
              <DiscardTiles direction={Direction.Bottom} />
            </div>
            <div className="flex items-center justify-center text-[10px]">
              {/* D-BR */}
            </div>
          </div>

          <div className="flex items-center justify-center text-xs">
            <WallTiles direction={Direction.Right} />
          </div>

          {/* Third row */}
          <div className="flex items-center justify-center text-xs">W-BL</div>
          <div className="flex items-center justify-center text-xs">
            <WallTiles direction={Direction.Bottom} />
          </div>
          <div className="flex items-center justify-center text-xs">W-BR</div>
        </div>

        <div className="flex items-center justify-center">
          <PlayerTilesRight />
        </div>

        {/* Third row */}
        <div className="flex items-center justify-center">P-BL</div>
        <div ref={containerRef} className="flex items-center justify-center">
          <PlayerTilesBottom />
        </div>
        <div className="flex items-center justify-center">P-BR</div>
      </div>

      <SpeedDial actions={actions} position="top-right" direction="down" />
    </div>
  );
}
