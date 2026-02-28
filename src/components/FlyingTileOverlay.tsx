"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useAnimationStore } from "@/store";
import { TileCore } from "@/common/core/mj.tile-core";
import { TILE_MAP } from "./Tile";

export function FlyingTileOverlay() {
  const tileId = useAnimationStore((s) => s.tileId);
  const fromRect = useAnimationStore((s) => s.fromRect);
  const toRect = useAnimationStore((s) => s.toRect);
  const clearFlight = useAnimationStore((s) => s.clearFlight);

  if (typeof document === "undefined") {
    return null;
  }
  if (tileId === null || fromRect === null || toRect === null) {
    return null;
  }

  const tile = TileCore.fromId(tileId);
  const fileName = TILE_MAP[tile.tid] ?? "Blank";
  const imagePath = `/tiles/Regular/${fileName}.svg`;

  return createPortal(
    <motion.div
      key={tileId}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
        borderRadius: "15%",
        background: "white",
        border: "1px solid rgb(17 24 39)",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
      initial={{
        x: fromRect.left,
        y: fromRect.top,
        width: fromRect.width,
        height: fromRect.height,
        opacity: 1,
      }}
      animate={{
        x: toRect.left,
        y: toRect.top,
        width: toRect.width,
        height: toRect.height,
        opacity: 0,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={clearFlight}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagePath}
        alt={fileName}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          objectFit: "contain",
        }}
        draggable={false}
      />
    </motion.div>,
    document.body,
  );
}
