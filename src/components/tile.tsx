import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Tile mapping - based on the SVG files available
const TILE_MAP: Record<number, string> = {
  // Characters (Man) 1-9
  1: "Man1", 2: "Man2", 3: "Man3", 4: "Man4", 5: "Man5", 6: "Man6", 7: "Man7", 8: "Man8", 9: "Man9",
  // Dots (Pin) 11-19  
  11: "Pin1", 12: "Pin2", 13: "Pin3", 14: "Pin4", 15: "Pin5", 16: "Pin6", 17: "Pin7", 18: "Pin8", 19: "Pin9",
  // Bamboo (Sou) 21-29
  21: "Sou1", 22: "Sou2", 23: "Sou3", 24: "Sou4", 25: "Sou5", 26: "Sou6", 27: "Sou7", 28: "Sou8", 29: "Sou9",
  // Winds 31-34
  31: "Ton", 32: "Nan", 33: "Shaa", 34: "Pei",
  // Dragons 35-37
  35: "Haku", 36: "Hatsu", 37: "Chun",
  // Dora tiles 41-43
  41: "Man5-Dora", 42: "Pin5-Dora", 43: "Sou5-Dora",
  // Special tiles
  50: "Blank", 51: "Front",
  // Back tile
  0: "Back"
};

const tileVariants = cva(
  "relative inline-block transition-all duration-200 select-none cursor-pointer",
  {
    variants: {
      size: {
        sm: "w-8 h-11",
        md: "w-12 h-16", 
        lg: "w-16 h-22",
        xl: "w-20 h-28",
        "1": "w-6 h-8",
        "2": "w-8 h-11", 
        "3": "w-10 h-14",
        "4": "w-12 h-16",
        "6": "w-16 h-22",
        "7": "w-18 h-24",
        "8": "w-20 h-28",
        "9": "w-24 h-32",
      },
      hoverable: {
        true: "hover:brightness-110 hover:scale-105",
        false: "",
      },
      selected: {
        true: "transform -translate-y-2 brightness-110 shadow-lg",
        false: "",
      },
      special: {
        normal: "",
        highlighted: "ring-2 ring-yellow-400 shadow-lg",
        focused: "ring-2 ring-blue-400 shadow-md",
        disabled: "opacity-50 grayscale",
        warning: "ring-2 ring-red-400",
        success: "ring-2 ring-green-400",
      },
      direction: {
        "0": "rotate-0",
        "90": "rotate-90",
        "180": "rotate-180", 
        "270": "-rotate-90",
        "-90": "-rotate-90",
      }
    },
    defaultVariants: {
      size: "md",
      hoverable: false,
      selected: false,
      special: "normal",
      direction: "0",
    },
  }
);

export interface TileProps extends VariantProps<typeof tileVariants> {
  /** Unique identifier for the tile. If invalid, shows empty space */
  tileId: number;
  /** Whether to show back or front of tile */
  back?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: (tileId: number) => void;
  /** Theme variant - Regular or Black tiles */
  theme?: "Regular" | "Black";
}

export const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  ({ 
    tileId, 
    back = false, 
    size, 
    hoverable, 
    selected, 
    special, 
    direction,
    className,
    onClick,
    theme = "Regular",
    ...props 
  }, ref) => {
    // Determine which tile to show
    const getTileFileName = (): string => {
      if (back) return "Back";
      
      const tileName = TILE_MAP[tileId];
      return tileName || "Blank";
    };

    // Handle invalid tiles by showing empty space
    const isValidTile = back || TILE_MAP[tileId];
    const tileFileName = getTileFileName();
    const imagePath = `/tiles/${theme}/${tileFileName}.svg`;

    const handleClick = () => {
      if (onClick && !back) {
        onClick(tileId);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          tileVariants({ 
            size, 
            hoverable: hoverable && !back, 
            selected: selected && !back, 
            special, 
            direction 
          }),
          onClick && !back && "cursor-pointer",
          className
        )}
        onClick={handleClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !back ? 0 : undefined}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && onClick && !back) {
            e.preventDefault();
            handleClick();
          }
        }}
        {...props}
      >
        {isValidTile ? (
          <img
            src={imagePath}
            alt={back ? "Tile back" : `Mahjong tile ${tileFileName}`}
            className="w-full h-full object-contain"
            draggable={false}
          />
        ) : (
          // Empty space for invalid tiles - maintains layout
          <div className="w-full h-full" />
        )}
      </div>
    );
  }
);

Tile.displayName = "Tile";

// Utility functions for tile management
export const getTileName = (tileId: number): string => {
  return TILE_MAP[tileId] || "Unknown";
};

export const isValidTileId = (tileId: number): boolean => {
  return tileId in TILE_MAP;
};

// Tile categories for easy grouping
export const TILE_CATEGORIES = {
  CHARACTERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  DOTS: [11, 12, 13, 14, 15, 16, 17, 18, 19],
  BAMBOO: [21, 22, 23, 24, 25, 26, 27, 28, 29],
  WINDS: [31, 32, 33, 34],
  DRAGONS: [35, 36, 37],
  DORA: [41, 42, 43],
  SPECIAL: [50, 51],
} as const;