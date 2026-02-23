import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlayerActionDisplay } from "@/components/PlayerActionDisplay";
import { UIStoreDecorator } from "./ui-store.decorator";
import { Direction, CommonUtil } from "@/lib/game-utils";
import { Position, GameHistoryRecord, GameHistoryActionType } from "@/common/core/mj.game";
import { useRoomStore } from "@/store/room-store";
import { useActionStore } from "@/store/action-store";

// Tile IDs (TileCore instance IDs):
// Man1: 0-3, Man2: 4-7, Man3: 8-11, Man4: 12-15, Man5: 16-19

// myPosition=East(0) + direction=Bottom → absolutePosition=East(0)
const MY_POSITION = Position.East;

const makeDecorator = (record: GameHistoryRecord) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ActionDecorator(Story: any, context: any) {
    const direction = (context.args.direction as Direction) ?? Direction.Bottom;
    // Compute the absolute position that matches the current direction so the
    // component's position check (lastAction.position === absolutePosition) passes.
    const absolutePosition = CommonUtil.mapPosition(MY_POSITION, direction);
    const adjustedRecord = new GameHistoryRecord(
      record.type,
      absolutePosition,
      record.tiles,
      record.target,
    );

    const setMyPosition = useRoomStore((state) => state.setMyPosition);
    setMyPosition(MY_POSITION);
    // Bypass setAction (which starts an auto-dismiss timer) and set state directly
    useActionStore.setState({ lastAction: adjustedRecord });
    return (
      <div className="relative flex h-40 w-[500px] items-center justify-center">
        <Story />
      </div>
    );
  }
  return ActionDecorator;
};

const meta = {
  title: "Components/PlayerActionDisplay",
  component: PlayerActionDisplay,
  parameters: { layout: "centered" },
  decorators: [UIStoreDecorator],
  argTypes: {
    direction: {
      control: "select",
      options: [Direction.Bottom, Direction.Top, Direction.Left, Direction.Right],
    },
  },
  args: {
    direction: Direction.Bottom,
    // Center the absolute-positioned element within the relative story wrapper
    className: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerActionDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** 出牌 — no label, shows the discarded tile only */
export const Drop: Story = {
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Drop, MY_POSITION, [8]))],
};

/** 碰 — amber label + 3 tiles (2 hand + 1 claimed) */
export const Peng: Story = {
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Peng, MY_POSITION, [9, 10], 8))],
};

/** 吃 — amber label + 3 tiles (2 hand + 1 claimed) */
export const Chi: Story = {
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Chi, MY_POSITION, [0, 4], 8))],
};

/** 杠 — amber label + 4 tiles (3 hand + 1 claimed) */
export const Gang: Story = {
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Gang, MY_POSITION, [9, 10, 11], 8))],
};

/** 暗杠 — amber label + 4 hand tiles (no claimed tile) */
export const Angang: Story = {
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Angang, MY_POSITION, [8, 9, 10, 11]))],
};

/** 胡 — red label + 1 claimed tile */
export const Hu: Story = {
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Hu, MY_POSITION, [], 8))],
};

/** 自摸 — red label + 1 picked tile */
export const Zimo: Story = {
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Zimo, MY_POSITION, [8]))],
};

/** winningOnly=true filters out non-winning actions (nothing renders for Peng) */
export const WinningOnlyFiltered: Story = {
  args: { winningOnly: true },
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Peng, MY_POSITION, [9, 10], 8))],
};

/** winningOnly=true allows Hu through */
export const WinningOnlyHu: Story = {
  args: { winningOnly: true },
  decorators: [makeDecorator(new GameHistoryRecord(GameHistoryActionType.Hu, MY_POSITION, [], 8))],
};
