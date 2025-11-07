"use client";

import SpeedDial from "@/components/ui-ex/speed-dial";
import { Button } from "@/components/ui/button";
import { LogOut, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Game() {
  // Define grid proportions as variables for easy adjustment
  const outerEdge = "grid-cols-[10%_1fr_10%] grid-rows-[10%_1fr_10%]"; // Outer player edge width/height
  const middleEdge = "grid-cols-[15%_1fr_15%] grid-rows-[15%_1fr_15%]"; // Middle wall edge width/height
  const innerEdge = "grid-cols-[20%_1fr_20%] grid-rows-[20%_1fr_20%]"; // Inner discard edge width/height

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

  return (
    // Outer container: full screen, center content
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300">
      {/* Player layer (outer 3x3 grid) */}
      <div
        className={`grid aspect-square min-h-[300px] w-[95vmin] min-w-[300px] ${outerEdge} overflow-hidden bg-green-700 font-mono text-sm text-white`}
      >
        {/* First row */}
        <div className="flex items-center justify-center bg-yellow-500">
          P-TL
        </div>
        <div className="flex items-center justify-center bg-yellow-600">
          P-T
        </div>
        <div className="flex items-center justify-center bg-yellow-500">
          P-TR
        </div>

        {/* Second row */}
        <div className="flex items-center justify-center bg-yellow-600">
          P-L
        </div>

        {/* Wall layer (middle 3x3 grid) */}
        <div className={`grid ${middleEdge} overflow-hidden bg-green-500`}>
          {/* First row */}
          <div className="flex items-center justify-center bg-green-400 text-xs">
            W-TL
          </div>
          <div className="flex items-center justify-center bg-green-300 text-xs">
            W-T
          </div>
          <div className="flex items-center justify-center bg-green-400 text-xs">
            W-TR
          </div>

          {/* Second row */}
          <div className="flex items-center justify-center bg-green-300 text-xs">
            W-L
          </div>

          {/* Discard layer (inner 3x3 grid) */}
          <div className={`grid ${innerEdge} overflow-hidden bg-blue-300`}>
            {/* First row */}
            <div className="flex items-center justify-center bg-blue-400 text-[10px]">
              D-TL
            </div>
            <div className="flex items-center justify-center bg-blue-300 text-[10px]">
              D-T
            </div>
            <div className="flex items-center justify-center bg-blue-400 text-[10px]">
              D-TR
            </div>

            {/* Second row */}
            <div className="flex items-center justify-center bg-blue-300 text-[10px]">
              D-L
            </div>
            <div className="flex items-center justify-center bg-blue-50 text-[10px]">
              <Button variant="default" size="sm" className="aspect-square">
                <Link href="/lobby">Quit </Link>
              </Button>
            </div>
            <div className="flex items-center justify-center bg-blue-300 text-[10px]">
              D-R
            </div>

            {/* Third row */}
            <div className="flex items-center justify-center bg-blue-400 text-[10px]">
              D-BL
            </div>
            <div className="flex items-center justify-center bg-blue-300 text-[10px]">
              D-B
            </div>
            <div className="flex items-center justify-center bg-blue-400 text-[10px]">
              D-BR
            </div>
          </div>

          <div className="flex items-center justify-center bg-green-300 text-xs">
            W-R
          </div>

          {/* Third row */}
          <div className="flex items-center justify-center bg-green-400 text-xs">
            W-BL
          </div>
          <div className="flex items-center justify-center bg-green-300 text-xs">
            W-B
          </div>
          <div className="flex items-center justify-center bg-green-400 text-xs">
            W-BR
          </div>
        </div>

        <div className="flex items-center justify-center bg-yellow-600">
          P-R
        </div>

        {/* Third row */}
        <div className="flex items-center justify-center bg-yellow-500">
          P-BL
        </div>
        <div className="flex items-center justify-center bg-yellow-600">
          P-B
        </div>
        <div className="flex items-center justify-center bg-yellow-500">
          P-BR
        </div>
      </div>

      <SpeedDial actions={actions} position="top-right" direction="down" />
    </div>
  );
}
