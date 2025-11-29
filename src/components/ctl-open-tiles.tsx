"use client";

import { useUIStore } from "@/store";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { use } from "react";
import { Tooltip } from "./ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

export function CtlOpenTiles() {
  const openTiles = useUIStore((state) => state.openTiles);
  const setOpenTiles = useUIStore((state) => state.setOpenTiles);

  const handleChange = (checked: boolean) => {
    if (setOpenTiles) {
      setOpenTiles(checked);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex cursor-pointer items-center space-x-2">
          <Switch
            id="open"
            checked={openTiles}
            onCheckedChange={handleChange}
          />
          <Label htmlFor="open" className="hidden sm:block">
            明牌
          </Label>
        </div>
      </TooltipTrigger>
      <TooltipContent className="cursor-default sm:hidden">明牌</TooltipContent>
    </Tooltip>
  );
}
