import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GameHistoryActionType } from "@/common/core/mj.game";
import type { GameHistoryRecord } from "@/common/core/mj.game";

export const WINNING_ACTIONS = new Set<GameHistoryActionType>([GameHistoryActionType.Zimo, GameHistoryActionType.Hu]);

const DISPLAYABLE_ACTIONS = new Set<GameHistoryActionType>([
  GameHistoryActionType.Chi,
  GameHistoryActionType.Peng,
  GameHistoryActionType.Gang,
  GameHistoryActionType.Angang,
  GameHistoryActionType.Zimo,
  GameHistoryActionType.Hu,
  GameHistoryActionType.Drop,
]);

// Single module-level timer — only one action is displayed at a time
let dismissTimer: ReturnType<typeof setTimeout> | null = null;

interface ActionStoreState {
  lastAction: GameHistoryRecord | null;
  setAction: (record: GameHistoryRecord) => void;
  clearAction: () => void;
  clearAll: () => void;
}

export const useActionStore = create<ActionStoreState>()(
  devtools(
    (set, get) => ({
      lastAction: null,

      setAction: (record) => {
        if (!DISPLAYABLE_ACTIONS.has(record.type)) {
          return;
        }
        if (record.position === null) {
          return;
        }

        if (dismissTimer !== null) {
          clearTimeout(dismissTimer);
          dismissTimer = null;
        }

        set({ lastAction: record });

        if (!WINNING_ACTIONS.has(record.type)) {
          dismissTimer = setTimeout(() => {
            dismissTimer = null;
            get().clearAction();
          }, 1000);
        }
      },

      clearAction: () => set({ lastAction: null }),

      clearAll: () => {
        if (dismissTimer !== null) {
          clearTimeout(dismissTimer);
          dismissTimer = null;
        }
        set({ lastAction: null });
      },
    }),
    { name: "ActionStore" },
  ),
);
