import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  // auth state
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;

  // user info
  user: { email: string; name: string };
  setUser: (user: { email: string; name: string }) => void;

  // reset
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      signedIn: false,
      setSignedIn: (signedIn) =>
        set(
          signedIn
            ? { signedIn }
            : { signedIn, user: { email: "", name: "" } },
          undefined,
          "setSignedIn",
        ),

      user: { email: "", name: "" },
      setUser: (user) => set({ user }, undefined, "setUser"),

      reset: () =>
        set(
          { signedIn: false, user: { email: "", name: "" } },
          undefined,
          "reset",
        ),
    }),
    { name: "UserStore" },
  ),
);
