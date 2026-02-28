"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useUIStore } from "@/store";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TileCore } from "@/common/core/mj.tile-core";
import { Direction } from "@/lib/game-utils";

// --- TILE MAP ---
export const TILE_MAP: Record<number, string> = {
  1: "Man1",
  2: "Man2",
  3: "Man3",
  4: "Man4",
  5: "Man5",
  6: "Man6",
  7: "Man7",
  8: "Man8",
  9: "Man9",
  11: "Pin1",
  12: "Pin2",
  13: "Pin3",
  14: "Pin4",
  15: "Pin5",
  16: "Pin6",
  17: "Pin7",
  18: "Pin8",
  19: "Pin9",
  21: "Sou1",
  22: "Sou2",
  23: "Sou3",
  24: "Sou4",
  25: "Sou5",
  26: "Sou6",
  27: "Sou7",
  28: "Sou8",
  29: "Sou9",
  31: "Ton",
  32: "Nan",
  33: "Shaa",
  34: "Pei",
  35: "Haku",
  36: "Hatsu",
  37: "Chun",
  41: "Man5-Dora",
  42: "Pin5-Dora",
  43: "Sou5-Dora",
  50: "Blank",
  51: "Front",
  0: "Back",
} as const;

const TID = {
  BACK: 0,
  BLANK: 50,
  FRONT: 51,
  EMPTY_SPACE: -1,
} as const;

const ASPECT_PORTRAIT = "aspect-[3/4]";
const ASPECT_LANDSCAPE = "aspect-[4/3]";

const sizeScale = {
  xs: 60,
  sm: 80,
  md: 100,
  lg: 120,
  xl: 140,
} as const;

type TileSize = keyof typeof sizeScale | number;

const rotateClasses: Record<Direction, string> = {
  [Direction.Bottom]: "rotate-0",
  [Direction.Left]: "rotate-90",
  [Direction.Top]: "rotate-180",
  [Direction.Right]: "-rotate-90",
  [Direction.None]: "rotate-0",
};

// --- cva ---
const tileVariants = cva(
  "relative inline-block select-none overflow-hidden rounded-[15%] border border-gray-900 shadow-md",
  {
    variants: {
      hoverable: {
        true: "hover:scale-110",
        false: "",
      },
      special: {
        normal: "",
        highlighted: "ring-2 ring-yellow-400",
        focused: "ring-2 ring-blue-400",
        disabled: "opacity-50 grayscale",
        warning: "scale-130 z-10 ring-2 ring-red-400",
        success: "ring-2 ring-green-400",
      },
    },
    defaultVariants: {
      hoverable: false,
      special: "normal",
    },
  },
);

export interface TileProps extends VariantProps<typeof tileVariants> {
  tileId: number;
  back?: boolean;
  taken?: boolean;
  selected?: boolean;
  className?: string;
  onClick?: (tileId: number) => void;
  onDoubleClick?: (tileId: number) => void;
  theme?: "Regular" | "Black";
  size?: TileSize;
  direction?: Direction;
  style?: React.CSSProperties;
}

// ============================================================================
//                                 COMPONENT
// ============================================================================
export const Tile = ({
  tileId,
  back = false,
  taken = false,
  size = "md",
  hoverable,
  selected,
  special,
  direction = Direction.Bottom,
  className,
  onClick,
  onDoubleClick,
  theme = "Regular",
  ...props
}: TileProps) => {
  const storeTileSize = useUIStore((state) => state.tileSize);
  const openTiles = useUIStore((state) => state.openTiles);

  // Memoized TileCore and path
  const tile = React.useMemo(() => TileCore.fromId(tileId), [tileId]);

  const isBack = tile.tid === TID.BACK || (back && !openTiles);
  const isEmpty = tile.tid === TID.EMPTY_SPACE;
  const isVertical = direction === Direction.Left || direction === Direction.Right;

  // Aspect ratio
  const aspectClass = isVertical ? ASPECT_LANDSCAPE : ASPECT_PORTRAIT;

  // Final pixel size
  const scale = (storeTileSize * (typeof size === "number" ? size : sizeScale[size])) / 100;

  const containerStyle = {
    [isVertical ? "height" : "width"]: scale,
    ...props.style,
  } as React.CSSProperties;

  const imageStyle = { width: scale };

  const rotate = rotateClasses[direction];

  const fileName = TILE_MAP[tile.tid] ?? TILE_MAP[TID.BLANK];
  const imagePath = `/tiles/${theme}/${fileName}.svg`;

  const clickable = !!onClick && !isBack && !isEmpty;

  const handleClick = () => clickable && onClick?.(tile.id);
  const handleDoubleClick = () => clickable && onDoubleClick?.(tile.id);

  // --- Empty tile (pure spacing)
  if (isEmpty) {
    return <div className={cn(aspectClass, className)} style={containerStyle} {...props} />;
  }

  return (
    <motion.div
      className={cn(
        tileVariants({ hoverable, special }),
        aspectClass,
        isBack ? "border-gray-700 bg-teal-600" : theme === "Black" ? "bg-gray-800" : "bg-white",
        clickable && "cursor-pointer",
        className,
      )}
      data-tile-id={tileId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: selected ? "-20%" : "0%" }}
      transition={{ opacity: { duration: 0.4 } }}
      style={containerStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {isBack ? (
        <div className="h-full w-full" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imagePath}
          alt={fileName}
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "origin-center object-contain",
            rotate,
            ASPECT_PORTRAIT,
          )}
          style={imageStyle}
          draggable={false}
        />
      )}
      {taken && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500/50">
          <X className="h-full w-full text-red-600" strokeWidth={3} />
        </div>
      )}
    </motion.div>
  );
};

Tile.displayName = "Tile";

// --- Helpers ---
export const getTileName = (tid: number) => TILE_MAP[tid] ?? "Unknown";
export const isValidTId = (tid: number) => tid in TILE_MAP;

export const TILE_CATEGORIES = {
  CHARACTERS: [0, 4, 8, 12, 16, 20, 24, 28, 32],
  DOTS: [36, 40, 44, 48, 52, 56, 60, 64, 68],
  BAMBOO: [72, 76, 80, 84, 88, 92, 96, 100, 104],
  WINDS: [108, 112, 116, 120],
  DRAGONS: [124, 128, 132],
  DORA: [136, 140, 144],
  SPECIAL: [148, 152],
} as const;
