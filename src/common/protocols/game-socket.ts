import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { GameEvent, GameRequest, GameResponse } from "./apis.models";

export class GameSocket {
  public socket: Socket | null = null;
  public connected = false;
  public connectedCallback = () => {};
  public disconnectedCallback = () => {};
  public errorCallback = (err: Error) => {
    void err;
  };

  constructor(url?: string, token?: string) {
    // "undefined" means the URL will be computed from the `window.location` object
    this.socket = io(url, {
      auth: {
        token: token || "",
      },
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", this.onConnected.bind(this));
    this.socket.on("disconnect", this.onDisconnected.bind(this));
    this.socket.on("connect_error", this.onConnectError.bind(this));
  }

  private onConnected() {
    this.connected = true;
    console.log("Connected to the server");
    this.connectedCallback();
  }

  private onDisconnected() {
    this.connected = false;
    console.log("Disconnected from the server");
    this.disconnectedCallback();
  }

  private onConnectError(err: Error) {
    console.error("Connection error:", err.message);

    if (err.message.includes("Unauthorized")) {
      console.warn("Authentication failed. Token may be invalid or expired.");
      this.errorCallback(err);
    }
  }

  onConnect(callback: () => void) {
    this.connectedCallback = callback;
  }

  onDisconnect(callback: () => void) {
    this.disconnectedCallback = callback;
  }

  onError(callback: (err: Error) => void) {
    this.errorCallback = callback;
  }

  /**
   * Reconnect with a new WS token
   */
  connect(token: string) {
    if (this.socket) {
      (this.socket.io.opts as any).auth = { token };

      if (this.socket.connected) {
        this.socket.disconnect().connect();
      } else {
        this.socket.connect();
      }
    }
  }

  send(data: unknown) {
    this.socket?.emit("mj:game", data);
  }

  sendAndWait<T extends GameResponse>(data: GameRequest): Promise<T> {
    if (!this.socket) {
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      return Promise.reject({
        type: data.type,
        state: "error",
        message: "There is no connection to the server",
      });
    } else {
      return this.socket.timeout(2000).emitWithAck("mj:game", data);
    }
  }

  onReceive(callback: (data: GameEvent) => void) {
    this.socket?.on("mj:game", callback);
    return callback;
  }

  offReceive(callback: (data: GameEvent) => void) {
    this.socket?.off("mj:game", callback);
  }
}
