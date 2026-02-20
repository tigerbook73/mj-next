import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HandTilesBottom } from "@/components/HandTilesBottom";
import { UIStoreDecorator } from "./ui-store.decorator";
import { Game, Position } from "@/common";
import { useGameStore, useRoomStore } from "@/store";
import { getFakeEvent } from "@/test/helper";

// Base raw game data from the test helper
const rawGame = getFakeEvent().data.rooms[0].game;

type AnyStory = React.ComponentType;

/**
 * Builds a Storybook decorator that:
 *  - Sets the game store to a (possibly overridden) fake game
 *  - Sets myPosition in the room store so HandTilesBottom knows which seat is "mine"
 */
const makeDecorator = (
  gameOverrides: Record<string, unknown>,
  myPosition: Position,
) => {
  function StoryDecorator(Story: AnyStory) {
    const setGame = useGameStore((state) => state.setGame);
    const setMyPosition = useRoomStore((state) => state.setMyPosition);

    const game = Game.fromJSON({ ...rawGame, ...gameOverrides });
    setGame(game);
    setMyPosition(myPosition);

    return <Story />;
  }
  return StoryDecorator;
};

const meta = {
  title: "Components/HandTilesBottom",
  component: HandTilesBottom,
  parameters: {
    layout: "centered",
  },
  decorators: [UIStoreDecorator],
  tags: ["autodocs"],
} satisfies Meta<typeof HandTilesBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * My turn to act (WaitingAction, myPosition = South = current player).
 * Click any hand tile to select it → 出牌 button appears in the ActionPanel.
 */
export const MyTurn: Story = {
  decorators: [makeDecorator({}, Position.South)],
};

/**
 * Another player (South) has just discarded tile 97 (Sou7 / 七条).
 * I am East (position 0). My hand contains two Sou7 (ids 98, 99).
 * Expected ActionPanel: [碰] [过]
 *   - 碰 is available (2 matching tiles in hand)
 *   - 吃 is unavailable (only the next player after South = West can Chi)
 *   - 杠 is unavailable (need 3 matching tiles, I only have 2)
 */
export const WaitingPassWithPeng: Story = {
  decorators: [
    makeDecorator(
      {
        state: "waiting-pass",
        current: 1, // South (position 1) just discarded
        latestTile: 97, // Sou7 — East hand has 98 & 99 (two more Sou7)
      },
      Position.East,
    ),
  ],
};

/**
 * Another player (South) has just discarded. I am West (position 2).
 * West is the "next" player after South, so Chi is possible if the tiles align.
 * South discarded tile 46 (Pin3 / 三筒). West hand has Pin3(44), Pin3(45),
 * and Pin6(57), Pin7(63). Expected ActionPanel: [碰] [过]
 * (No chi: West lacks Pin1/Pin2/Pin4/Pin5 for a sequence with Pin3)
 */
export const WaitingPassNextPlayer: Story = {
  decorators: [
    makeDecorator(
      {
        state: "waiting-pass",
        current: 1, // South just discarded
        latestTile: 46, // Pin3 — West hand has Pin3(44, 45) → can 碰
      },
      Position.West,
    ),
  ],
};
