import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TileCore } from "@/common/core/mj.tile-core";
import { Direction } from "@/lib/game-utils";

// --- TILE_MAP ---
const TILE_MAP: Record<number, string> = {
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
};

// --- TILE ID 常量 ---
const TID = {
  BACK: 0,
  BLANK: 50,
  FRONT: 51,
  EMPTY_SPACE: -1,
} as const;

const PORTRAIT_RATIO = "aspect-[3/4]"; // 正常比例 (高/宽 = 4/3)
const LANDSCAPE_RATIO = "aspect-[4/3]"; // 旋转比例 (宽/高 = 4/3)

// --- 尺寸配置 ---
const portraitSizeClass: Record<string, string> = {
  sm: "w-8",
  md: "w-12",
  lg: "w-16",
  xl: "w-20",
  "1": "w-6",
  "2": "w-8",
  "3": "w-10",
  "4": "w-12",
  "6": "w-16",
  "7": "w-18",
  "8": "w-20",
  "9": "w-24",
};

type TileSize = keyof typeof portraitSizeClass | "auto";

// 旋转时使用的尺寸类 (宽高互换)
const landscapeSizeClass: Record<string, string> = {
  sm: "h-8",
  md: "h-12",
  lg: "h-16",
  xl: "h-20",
  "1": "h-6",
  "2": "h-8",
  "3": "h-10",
  "4": "h-12",
  "5": "h-14",
  "6": "h-16",
  "7": "h-18",
  "8": "h-20",
  "9": "h-24",
};

const rotateClasses: Record<Direction, string> = {
  [Direction.Bottom]: "rotate-0",
  [Direction.Left]: "rotate-90",
  [Direction.Top]: "rotate-180",
  [Direction.Right]: "-rotate-90",
  [Direction.None]: "rotate-0",
};

// 响应式尺寸类 (当未指定 size 时使用)，注意：这里的size需要和上面定义的匹配
const responsivePortraitClasses = "w-6 xs:w-7 sm:w-7 md:w-8";
const responsiveLandscapeClasses = "h-6 xs:h-7 sm:h-7 md:h-8";

/**
 * 根据尺寸和旋转方向，获取容器的尺寸类。
 * 当 size 为 auto 时，使用响应式尺寸类。
 */
function getContainerClasses(size: TileSize, isVertical: boolean): string {
  if (size === "auto") {
    // 未指定尺寸时使用响应式类
    return isVertical
      ? cn(responsiveLandscapeClasses, LANDSCAPE_RATIO)
      : cn(responsivePortraitClasses, PORTRAIT_RATIO);
  }
  return isVertical
    ? cn(landscapeSizeClass[size], LANDSCAPE_RATIO)
    : cn(portraitSizeClass[size], PORTRAIT_RATIO);
}

function getRotateClass(direction: Direction): string {
  return rotateClasses[direction];
}

/**
 * 图像的大小，内部的旋转、居中和对齐类
 */
function getImageClasses(
  size: TileSize | undefined,
  direction: Direction,
): string {
  const sizeClass = size ? portraitSizeClass[size] : responsivePortraitClasses;
  return cn(
    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    "origin-center object-contain",
    getRotateClass(direction),
    sizeClass,
    PORTRAIT_RATIO,
  );
}

// --- cva 变体 ---
const tileVariants = cva(
  // 基础样式
  "relative inline-block select-none overflow-hidden rounded-[15%] border border-gray-900 shadow-md transition-all duration-200",
  {
    variants: {
      hoverable: {
        true: "transform transition-transform duration-200 hover:scale-110",
        false: "",
      },
      selected: {
        true: "-translate-y-1/8 transform duration-200",
        false: "",
      },
      special: {
        normal: "",
        highlighted: "shadow-lg ring-2 ring-yellow-400",
        focused: "shadow-md ring-2 ring-blue-400",
        disabled: "opacity-50 grayscale",
        warning: "ring-2 ring-red-400",
        success: "ring-2 ring-green-400",
      },
    },
    defaultVariants: {
      hoverable: false,
      selected: false,
      special: "normal",
    },
  },
);

export interface TileProps extends VariantProps<typeof tileVariants> {
  tileId: number;
  back?: boolean;
  className?: string;
  onClick?: (tileId: number) => void;
  theme?: "Regular" | "Black";
  size?: TileSize;
  direction?: Direction;
}

// --- 组件主体 ---
export const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  (
    {
      tileId,
      back = false,
      size = "auto",
      hoverable,
      selected,
      special,
      direction = Direction.Bottom,
      className,
      onClick,
      theme = "Regular",
      ...props
    },
    ref,
  ) => {
    const tile = TileCore.fromId(tileId);

    // 确定牌的状态
    const isEmptySpace = tile.tid === TID.EMPTY_SPACE;
    const isBack = back || tile.tid === TID.BACK;
    const isVertical =
      direction === Direction.Left || direction === Direction.Right;

    // 父容器占位尺寸 (已考虑旋转互换)
    // size 未指定时，getContainerClasses 会使用响应式类
    const containerSizeClasses = getContainerClasses(size, isVertical);
    // 旋转图片的原始尺寸
    const imageClasses = getImageClasses(size, direction);

    // 获取文件名
    const tileFileName = TILE_MAP[tile.tid] || TILE_MAP[TID.BLANK];
    const imagePath = `/tiles/${theme}/${tileFileName}.svg`;

    const handleClick = () => {
      if (onClick && !isBack && !isEmptySpace) {
        onClick(tile.id);
      }
    };

    // 1. **空白占位逻辑**：必须应用旋转后的尺寸类
    if (isEmptySpace) {
      return (
        <div
          ref={ref}
          className={cn(containerSizeClasses, className)}
          {...props}
        />
      );
    }

    // 2. **非空白牌的样式**
    const tileClassName = cn(
      tileVariants({
        hoverable: hoverable && !isBack,
        selected: selected && !isBack,
        special,
      }),
      containerSizeClasses, // 应用计算后的尺寸占位类
      // 背景色和边框
      isBack
        ? "border-gray-700 bg-gray-600"
        : theme === "Black"
          ? "bg-gray-800"
          : "bg-white",
      onClick && !isBack && "cursor-pointer",
      className,
    );

    // 3. **渲染**
    return (
      <div
        ref={ref}
        className={tileClassName}
        onClick={handleClick}
        role={onClick && !isBack ? "button" : undefined}
        tabIndex={onClick && !isBack ? 0 : undefined}
        {...props}
      >
        {isBack ? (
          // 渲染牌背
          <div className="h-full w-full" />
        ) : (
          // 渲染牌面
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagePath}
            alt={`Mahjong tile ${getTileName(tile.tid)}`}
            className={imageClasses}
            draggable={false}
          />
        )}
      </div>
    );
  },
);

Tile.displayName = "Tile";

// --- 辅助函数 ---
export const getTileName = (tid: number) => TILE_MAP[tid] || "Unknown";
export const isValidTId = (tid: number) => tid in TILE_MAP;

// --- TILE_CATEGORIES ---
export const TILE_CATEGORIES = {
  CHARACTERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  DOTS: [11, 12, 13, 14, 15, 16, 17, 18, 19],
  BAMBOO: [21, 22, 23, 24, 25, 26, 27, 28, 29],
  WINDS: [31, 32, 33, 34],
  DRAGONS: [35, 36, 37],
  DORA: [41, 42, 43],
  SPECIAL: [50, 51],
} as const;
