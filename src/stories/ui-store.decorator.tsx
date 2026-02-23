import { useUIStore } from "@/store";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UIStoreDecorator = (Story: any, context: any) => {
  const setOpenTiles = useUIStore((state) => state.setOpenTiles);
  const openTiles = context.args.openTiles;

  const setTileSize = useUIStore((state) => state.setTileSize);
  const tileSize = context.args.tileSize;
  if (setTileSize) {
setTileSize(40);
}

  useEffect(() => {
    if (setOpenTiles && typeof openTiles === "boolean") {
      setOpenTiles(openTiles);
    }
  }, [openTiles, setOpenTiles]);

  useEffect(() => {
    if (setTileSize && typeof tileSize === "number") {
      setTileSize(tileSize);
    }
  }, [tileSize, setTileSize]);

  return <Story />;
};
