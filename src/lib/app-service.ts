import { useAppStatusStore } from "@/store/app-status-store";
import { useGameStore } from "@/store/game-store";
import { useRoomStore } from "@/store/room-store";
import { useUserStore } from "@/store/user-store";
import { useActionStore } from "@/store/action-store";
import { authService } from "./auth-service";
import { eventBus } from "./event-bus";
import { initSocket, socketClient } from "./socket-client";
import { tilePositionRegistry } from "./tile-position-registry";
import { GameEventType, GameHistoryActionType } from "@/common";
import type { GameActionEvent } from "@/common";

export class AppService {
  private initialized = false;

  /**
   * Bootstrap the app: create the socket singleton, wire all event handlers,
   * then kick off auth initialization. Idempotent.
   */
  initialize(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    initSocket();
    this.wireEvents();
    authService.initialize();
  }

  private wireEvents(): void {
    // --- Auth events ---

    eventBus.on("user:pending", () => {
      useAppStatusStore.getState().setReady(false);
    });

    eventBus.on("user:signed-in", (profile) => {
      const { setUser, setSignedIn } = useUserStore.getState();
      setSignedIn(true);
      setUser({ email: profile.email, name: profile.name });
    });

    eventBus.on("user:signed-out", () => {
      const { setSignedIn } = useUserStore.getState();
      const { setGame } = useGameStore.getState();
      setSignedIn(false); // also clears user fields via store logic
      setGame(null);
      useActionStore.getState().clearAll();
      socketClient?.disconnect();
      useAppStatusStore.getState().setReady(true);
    });

    eventBus.on("user:ws-token", (token) => {
      eventBus.emit("socket:pending", undefined);
      socketClient.connect(token);
    });

    // --- Socket events ---

    eventBus.on("socket:pending", () => {
      // Reserved for future loading indicator
    });

    eventBus.on("socket:connected", () => {
      // App readiness is gated on the first data event
    });

    eventBus.on("socket:disconnected", () => {
      // Reserved for future UI feedback / reconnect logic
    });

    eventBus.on("socket:data", (event) => {
      if (event.type === GameEventType.GAME_UPDATED) {
        const { setRoomList, setMyRoom, setMyPosition } =
          useRoomStore.getState();
        const { setGame } = useGameStore.getState();
        const parsedEvent = socketClient.parseEvent(event);

        setRoomList(parsedEvent.data.rooms);
        setMyRoom(socketClient.findMyRoom(parsedEvent));
        setMyPosition(
          socketClient.findMyPlayerModel(parsedEvent)?.position ?? null,
        );
        setGame(socketClient.findMyGame(parsedEvent));

        useAppStatusStore.getState().setReady(true);
      } else if (event.type === GameEventType.ACTION) {
        // only when playing a game, to avoid noise during lobby browsing
        const actionEvent = event as unknown as GameActionEvent;
        const record = actionEvent.data.record;
        useActionStore.getState().setAction(record);

        // Capture the "from" position of tiles before GAME_UPDATED re-renders the DOM.
        // Stored in the registry so that the receiving component can combine it with
        // the landing rect and start the animation atomically.
        const captureFirstTile =
          record.type === GameHistoryActionType.Drop ||
          record.type === GameHistoryActionType.Pick ||
          record.type === GameHistoryActionType.PickReverse;

        if (captureFirstTile) {
          const tileId = record.tiles[0];
          if (tileId !== undefined && tileId >= 0) {
            const el = document.querySelector(`[data-tile-id="${tileId}"]`);
            if (el) {
              tilePositionRegistry.capture(tileId, el.getBoundingClientRect());
            }
          }
        }
      }
    });
  }
}

export const appService = new AppService();
