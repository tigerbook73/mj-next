"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGameStore, useUserStore, useAppStatusStore } from "@/store";
import LoadingScreen from "../ui-ex/LoadingScreen";

export function AppGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const game = useGameStore((state) => state.game);
  const { isReady } = useAppStatusStore();

  const isSignedIn = !!user.email;
  const isAppReady = isReady;

  useEffect(() => {
    if (!isAppReady) {
      return;
    }

    // Routing logic - only runs when the app is fully ready
    if (!isSignedIn && pathname !== "/" && pathname !== "/signup") {
      router.replace("/");
    } else if (isSignedIn && game && pathname !== "/game") {
      router.replace("/game");
    } else if (isSignedIn && !game && pathname !== "/lobby") {
      router.replace("/lobby");
    }
  }, [isAppReady, isSignedIn, game, pathname, router]);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
