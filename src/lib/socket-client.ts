import { SocketClient, GameSocket } from "@/common";
import { eventBus } from "./event-bus";

declare global {
  interface Window {
    __GLOBAL_SOCKET_CLIENT__?: SocketClient;
  }
}

/**
 * Exported singleton. Undefined on the server; set after initSocket() on the client.
 */
export let socketClient: SocketClient;

/**
 * Initialize the SocketClient singleton and wire its callbacks to the event bus.
 * Lazily initialized, browser-only, HMR-safe in development.
 */
export const initSocket = () => {
  // Guard: server-side
  if (typeof window === "undefined") return;

  // Already initialized
  if (socketClient) return socketClient;

  const url = process.env.NEXT_PUBLIC_WS_URL;

  if (process.env.NODE_ENV === "development") {
    if (!window.__GLOBAL_SOCKET_CLIENT__) {
      console.log("[Socket] Creating new development instance...");
      window.__GLOBAL_SOCKET_CLIENT__ = new SocketClient(new GameSocket(url));
    } else {
      console.log("♻️ [Socket] Reusing existing development instance (HMR).");
    }
    socketClient = window.__GLOBAL_SOCKET_CLIENT__;
  } else {
    socketClient = new SocketClient(new GameSocket(url));
  }

  // Forward socket lifecycle events to the event bus.
  // SocketClient supports only one callback per event; this is the sole registration site.
  socketClient.onConnect(() => eventBus.emit("socket:connected", undefined));
  socketClient.onDisconnect(() =>
    eventBus.emit("socket:disconnected", undefined),
  );
  socketClient.onReceive((data) => eventBus.emit("socket:data", data));

  return socketClient;
};
