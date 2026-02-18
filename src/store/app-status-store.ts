import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppStatusState {
  isReady: boolean;
  setReady: (isReady: boolean) => void;
  reset: () => void;
}

const initialState = {
  isReady: false,
};

export const useAppStatusStore = create<AppStatusState>()(
  devtools(
    (set) => ({
      ...initialState,
      setReady: (isReady) => set({ isReady: isReady }, undefined, "setReady"),
      reset: () => set(initialState),
    }),
    { name: "AppStatusStore" },
  ),
);
