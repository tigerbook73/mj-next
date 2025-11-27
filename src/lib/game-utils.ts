import type { Game } from "@/common/core/mj.game";
import { Position } from "@/common/core/mj.game";
import type { TileId } from "@/common/core/mj.tile-core";

export const Direction = {
  Top: "top",
  Bottom: "bottom",
  Right: "right",
  Left: "left",
  None: "none",
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

const directionTextMap = {
  [Direction.Top]: "上",
  [Direction.Bottom]: "下",
  [Direction.Right]: "右",
  [Direction.Left]: "左",
  [Direction.None]: "无",
};

const positionTexMap = {
  [Position.East]: "东",
  [Position.South]: "南",
  [Position.West]: "西",
  [Position.North]: "北",
  [Position.None]: "无",
};

export class CommonUtil {
  static directionToText(direction: Direction): string {
    return directionTextMap[direction] ?? "未知";
  }

  static positionToText(position: Position): string {
    return positionTexMap[position] ?? "未知";
  }

  static mapPosition(myPosition: Position, direction: Direction): Position {
    if (myPosition === Position.None || direction === Direction.None) {
      return Position.None;
    }

    //        TOP
    // LEFT         RIGHT
    //       BOTTOM (myPostion)
    //
    // Position: East/0 -> South/1 -> West/2 -> North/3
    // bottom => myPosition (fixed)
    // left   => (myPosition + 1 + 4) % 4
    // top    => (myPosition + 2 + 4) % 4
    // right  => (myPosition + 3 + 4) % 4

    if (direction === Direction.Bottom) {
      return ((myPosition + 4) % 4) as Position;
    } else if (direction === Direction.Left) {
      return ((myPosition + 1 + 4) % 4) as Position;
    } else if (direction === Direction.Top) {
      return ((myPosition + 2 + 4) % 4) as Position;
    } else {
      return ((myPosition + 3 + 4) % 4) as Position;
    }
  }

  static mapDirection(
    myPosition: Position,
    position: Position | null,
  ): Direction {
    if (myPosition === null || position === null) {
      return Direction.None;
    }

    //        TOP
    // LEFT         RIGHT
    //       BOTTOM (myPostion)
    //
    // Position: East/0 -> South/1 -> West/2 -> North/3
    // position === myPosition => bottom
    // position === (myPosition + 1) %4 => left
    // position === (myPosition + 2) %4 => top
    // position === (myPosition + 3) %4 => right

    const directionMap = ["bottom", "left", "top", "right"];
    return directionMap[
      ((position - myPosition + 4) % 4) as Position
    ] as Direction;
  }

  static extendArrayToLength<T>(array: T[], length: number, fillValue: T): T[] {
    if (array.length >= length) {
      return array;
    }
    const extendedArray = [...array];
    for (let i = array.length; i < length; i++) {
      extendedArray.push(fillValue);
    }
    return extendedArray;
  }

  /**
   * remove opened tiles from discards
   */
  static updateDiscards(game: Game) {
    // created set for opened tiles
    const openedTiles = new Set<TileId>();

    for (const player of game.players) {
      if (!player) continue;

      for (const openedSet of player.openedSets) {
        openedTiles.add(openedSet.target);
      }
    }

    // remove opened tiles from discards
    for (const discard of game.discards) {
      discard.tiles = discard.tiles.filter((tile) => !openedTiles.has(tile));
    }
  }
}
