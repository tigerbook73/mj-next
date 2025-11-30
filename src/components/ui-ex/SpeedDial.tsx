"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpeedDialAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

type Direction = "up" | "down" | "left" | "right";
type Trigger = "click" | "hover";
type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface SpeedDialProps {
  actions: SpeedDialAction[];
  position?: Position;
  className?: string;
  direction?: Direction;
  trigger?: Trigger;
  gap?: number; // 单位：Tailwind 0.25rem
  hoverDelay?: number;
}

export default function SpeedDial({
  actions,
  position = "top-right",
  className,
  direction = "down",
  trigger = "click",
  gap = 3,
  hoverDelay = 300,
}: SpeedDialProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<number | null>(null);

  const isVertical = direction === "up" || direction === "down";

  const positionMap: Record<Position, string> = {
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  };
  const positionClass = positionMap[position] || positionMap["top-right"];

  const directionClass =
    direction === "down"
      ? "flex-col"
      : direction === "up"
        ? "flex-col-reverse"
        : direction === "left"
          ? "flex-row"
          : "flex-row-reverse";

  const offset =
    direction === "up"
      ? 20
      : direction === "down"
        ? -20
        : direction === "left"
          ? 20
          : -20;

  // click 模式外部点击关闭
  useEffect(() => {
    if (trigger === "hover") return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [trigger]);

  // hover 模式
  const hoverHandlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => {
            if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
            setOpen(true);
          },
          onMouseLeave: () => {
            hoverTimeout.current = window.setTimeout(
              () => setOpen(false),
              hoverDelay,
            );
          },
        }
      : {};

  // Tooltip side 方向判断
  const getTooltipSide = () => {
    switch (direction) {
      case "up":
        return "bottom";
      case "down":
        return "top";
      case "left":
        return "right";
      case "right":
        return "left";
      default:
        return "left";
    }
  };

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        {...hoverHandlers}
        className={cn(
          "fixed z-50 flex items-center",
          directionClass,
          positionClass,
          className,
        )}
        style={{ gap: `${gap * 0.25}rem` }}
      >
        {/* 主按钮 */}
        <Button
          size="icon"
          onClick={() => trigger === "click" && setOpen((prev) => !prev)}
          className={cn(
            "bg-primary hover:bg-primary/80 h-12 w-12 rounded-full text-white shadow-lg transition-transform duration-300",
            open ? "rotate-45" : "",
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>

        {/* 动画展开部分 */}
        <AnimatePresence>
          {open &&
            actions.map((action, index) => (
              <motion.div
                key={index}
                initial={
                  isVertical
                    ? { opacity: 0, y: offset }
                    : { opacity: 0, x: offset }
                }
                animate={
                  isVertical ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }
                }
                exit={
                  isVertical
                    ? { opacity: 0, y: offset }
                    : { opacity: 0, x: offset }
                }
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      onClick={() => {
                        action.onClick();
                        if (trigger === "click") setOpen(false);
                      }}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 w-10 rounded-full shadow-md"
                    >
                      {action.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side={getTooltipSide()}>
                    {action.label}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}
