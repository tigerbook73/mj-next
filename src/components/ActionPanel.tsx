"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tile } from "./Tile";
import { Direction } from "@/lib/game-utils";
import { TileCore } from "@/common/core/mj.tile-core";
import type { TileId } from "@/common/core/mj.tile-core";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ActionItem =
  | {
      type: "pass";
      onAction: () => void;
    }
  | {
      type: "hu";
      latestTile: TileId;
      onAction: () => void;
    }
  | {
      type: "zimo";
      tiles: [TileId];
      onAction: () => void;
    }
  | {
      type: "peng";
      /** The discarded tile being claimed */
      latestTile: TileId;
      /** Two hand tiles used for the Peng */
      tiles: [TileId, TileId];
      onAction: () => void;
    }
  | {
      type: "gang";
      /** The discarded tile being claimed */
      latestTile: TileId;
      /** Three hand tiles used for the Gang */
      tiles: [TileId, TileId, TileId];
      onAction: () => void;
    }
  | {
      type: "angang";
      /** All valid sets of 4 tiles the player can declare for Angang */
      options: [TileId, TileId, TileId, TileId][];
      onAction: (tiles: [TileId, TileId, TileId, TileId]) => void;
    }
  | {
      type: "chi";
      /** Pairs of hand tile IDs that form valid Chi sequences with latestTile */
      options: [TileId, TileId][];
      /** The discarded tile being claimed */
      latestTile: TileId;
      onAction: (tiles: [TileId, TileId]) => void;
    }
  | {
      type: "drop";
      tileId: TileId;
      onAction: () => void;
    };

// ---------------------------------------------------------------------------
// Label map
// ---------------------------------------------------------------------------

const actionLabels: Record<ActionItem["type"], string> = {
  chi: "吃",
  peng: "碰",
  gang: "杠",
  hu: "胡",
  angang: "暗杠",
  pass: "过",
  drop: "出牌",
  zimo: "自摸",
};

const buttonBaseClasses =
  "text-md rounded-xl bg-amber-500 px-4 py-3 font-bold text-white shadow hover:bg-amber-400 active:scale-95";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface SimpleCardProps {
  label: string;
  onAction: () => void;
}

function SimpleCard({ label, onAction }: SimpleCardProps) {
  return (
    <div className="flex flex-col items-center">
      <button onClick={onAction} className={buttonBaseClasses}>
        {label}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------

interface ChiCardProps {
  action: Extract<ActionItem, { type: "chi" }>;
}

function ChiCard({ action }: ChiCardProps) {
  const [optionIndex, setOptionIndex] = useState(0);

  const currentOption = action.options[optionIndex] ?? action.options[0];

  const cycleOption = () => {
    if (action.options.length > 1) {
      setOptionIndex((prev) => (prev + 1) % action.options.length);
    }
  };

  // Sort all three tiles by rank so the sequence always renders in order
  const sortedTiles = [
    { tileId: action.latestTile, isLatest: true },
    { tileId: currentOption[0], isLatest: false },
    { tileId: currentOption[1], isLatest: false },
  ].sort((a, b) => TileCore.fromId(a.tileId).index - TileCore.fromId(b.tileId).index);

  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={() => action.onAction(currentOption)} className={cn(buttonBaseClasses, "mb-3")}>
        {actionLabels.chi}
      </button>
      <div
        className={cn("flex items-end gap-0.5", action.options.length > 1 && "cursor-pointer")}
        onClick={cycleOption}
        title={action.options.length > 1 ? "点击切换吃牌方式" : undefined}
      >
        {sortedTiles.map(({ tileId, isLatest }) => (
          <Tile
            key={tileId}
            tileId={tileId}
            direction={Direction.Bottom}
            size="md"
            special={isLatest ? "highlighted" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

interface AnGangCardProps {
  action: Extract<ActionItem, { type: "angang" }>;
}

function AnGangCard({ action }: AnGangCardProps) {
  const [optionIndex, setOptionIndex] = useState(0);

  const currentOption = action.options[optionIndex] ?? action.options[0];

  const cycleOption = () => {
    if (action.options.length > 1) {
      setOptionIndex((prev) => (prev + 1) % action.options.length);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={() => action.onAction(currentOption)} className={cn(buttonBaseClasses, "mb-3")}>
        {actionLabels.angang}
      </button>
      <div
        className={cn("flex items-end gap-0.5", action.options.length > 1 && "cursor-pointer")}
        onClick={cycleOption}
        title={action.options.length > 1 ? "点击切换暗杠方式" : undefined}
      >
        {currentOption.map((tileId) => (
          <Tile key={tileId} tileId={tileId} direction={Direction.Bottom} size="md" />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

interface DropCardProps {
  action: Extract<ActionItem, { type: "drop" }>;
}

function DropCard({ action }: DropCardProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={action.onAction} className={cn(buttonBaseClasses, "mb-3")}>
        {actionLabels.drop}
      </button>
      <Tile tileId={action.tileId} direction={Direction.Bottom} size="md" />
    </div>
  );
}

// ---------------------------------------------------------------------------

interface TiledCardProps {
  label: string;
  latestTile?: TileId;
  handTiles: readonly TileId[];
  onAction: () => void;
}

/** Renders a button + sorted tile row, highlighting the claimed tile. */
function TiledCard({ label, latestTile, handTiles, onAction }: TiledCardProps) {
  const sortedTiles = [
    ...(latestTile !== undefined ? [{ tileId: latestTile, isLatest: true }] : []),
    ...handTiles.map((tileId) => ({ tileId, isLatest: false })),
  ].sort((a, b) => TileCore.fromId(a.tileId).index - TileCore.fromId(b.tileId).index);

  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={onAction} className={cn(buttonBaseClasses, "mb-3")}>
        {label}
      </button>
      <div className="flex items-end gap-0.5">
        {sortedTiles.map(({ tileId, isLatest }) => (
          <Tile
            key={tileId}
            tileId={tileId}
            direction={Direction.Bottom}
            size="md"
            special={isLatest ? "highlighted" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ActionPanel
// ---------------------------------------------------------------------------

interface ActionPanelProps {
  actions: ActionItem[];
  className?: string;
}

export function ActionPanel({ actions, className }: ActionPanelProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex w-full items-start justify-evenly gap-1 rounded-xl bg-black/10 px-4 py-3 shadow-xl",
        className,
      )}
    >
      {actions.map((action, index) => {
        if (action.type === "chi") {
          return <ChiCard key={`${action.type}-${index}`} action={action} />;
        }
        if (action.type === "angang") {
          return <AnGangCard key={`${action.type}-${index}`} action={action} />;
        }
        if (action.type === "drop") {
          return <DropCard key={`${action.type}-${index}`} action={action} />;
        }
        if (action.type === "hu") {
          return (
            <TiledCard
              key={`${action.type}-${index}`}
              label={actionLabels.hu}
              latestTile={action.latestTile}
              handTiles={[]}
              onAction={action.onAction}
            />
          );
        }
        if (action.type === "zimo") {
          return (
            <TiledCard
              key={`${action.type}-${index}`}
              label={actionLabels.zimo}
              handTiles={[action.tiles[0]]}
              onAction={action.onAction}
            />
          );
        }
        if (action.type === "peng") {
          return (
            <TiledCard
              key={`${action.type}-${index}`}
              label={actionLabels.peng}
              latestTile={action.latestTile}
              handTiles={action.tiles}
              onAction={action.onAction}
            />
          );
        }
        if (action.type === "gang") {
          return (
            <TiledCard
              key={`${action.type}-${index}`}
              label={actionLabels.gang}
              latestTile={action.latestTile}
              handTiles={action.tiles}
              onAction={action.onAction}
            />
          );
        }
        return (
          <SimpleCard key={`${action.type}-${index}`} label={actionLabels[action.type]} onAction={action.onAction} />
        );
      })}
    </div>
  );
}
