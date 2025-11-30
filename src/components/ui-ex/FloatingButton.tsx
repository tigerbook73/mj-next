"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingButtonProps extends React.ComponentProps<typeof Button> {
  /** 图标（默认 Plus） */
  icon?: React.ReactNode;
  /** tooltip 文字（可选） */
  label?: string;
  /** 自定义位置（默认 top-6 right-6） */
  positionClass?: string;
  className?: string;
}

export default function FloatingButton({
  icon,
  label,
  positionClass,
  className,
  ...props
}: FloatingButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        "fixed z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg",
        "bg-primary hover:bg-primary/80 text-white",
        "hover:cursor-pointer",
        positionClass,
        className,
      )}
    >
      {icon}
      {label && <span className="sr-only">{label}</span>}
    </Button>
  );
}
