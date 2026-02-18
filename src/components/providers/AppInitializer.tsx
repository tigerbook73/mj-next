"use client";

import { useEffect, useRef } from "react";
import { GameEvent } from "@/common";
import { initSocket } from "@/lib/socket-client";
import {
  useGameStore,
  useRoomStore,
  useUserStore,
  useAppStatusStore,
} from "@/store";
import { authService } from "@/lib/auth-service";

export function AppInitializer() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) {
      return;
    }
    isInitialized.current = true;

    const { setReady } = useAppStatusStore.getState();

    const client = initSocket();
    if (!client) {
      return;
    }
    client.onReceive((event: GameEvent) => {
      const { setRoomList, setMyRoom, setMyPosition } = useRoomStore.getState();
      const { setGame } = useGameStore.getState();
      const parsedEvent = client.parseEvent(event);

      setRoomList(parsedEvent.data.rooms);
      setMyRoom(client.findMyRoom(parsedEvent));
      setMyPosition(client.findMyPlayerModel(parsedEvent)?.position ?? null);
      setGame(client.findMyGame(parsedEvent));

      setReady(true);
    });

    authService.subscribe((user) => {
      const { setUser, setSignedIn } = useUserStore.getState();
      const { setGame } = useGameStore.getState();

      setSignedIn(!!user); // Update signed-in status, which also clears user if false

      if (user) {
        setUser({ email: user.email, name: user.name });
      } else {
        setGame(null);
      }
    });

    authService.initialize();
  }, []);

  return null;
}
