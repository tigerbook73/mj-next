import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { GameEvent, GameRequest, GameResponse } from "./apis.models";

export class GameSocket {
  private socket: Socket;
  private connectedCallback = () => {};
  private disconnectedCallback = () => {};
  private errorCallback = (_err: Error) => {};
  private onReceiveCallback = (_data: GameEvent) => {};

  constructor(url?: string, token?: string) {
    // "undefined" means the URL will be computed from the `window.location` object
    this.socket = io(url, {
      auth: {
        token: token || "",
      },
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", this.onConnected);
    this.socket.on("disconnect", this.onDisconnected);
    this.socket.on("connect_error", this.onConnectError);
    this.socket.on("mj:game", this.onReceived);
  }

  getSocketId() {
    return this.socket.id;
  }

  isConnected() {
    return this.socket.connected;
  }

  private onConnected = () => {
    console.log("Connected to the server");
    this.connectedCallback();
  };

  private onDisconnected = () => {
    console.log("Disconnected from the server");
    this.disconnectedCallback();
  };

  private onReceived = (data: GameEvent) => {
    console.log("Received data:", data);
    this.onReceiveCallback(data);
  };

  private onConnectError = (err: Error) => {
    console.error("Connection error:", err.message);

    if (err.message.includes("Unauthorized")) {
      console.warn("Authentication failed. Token may be invalid or expired.");
      this.errorCallback(err);
    }
  };

  onConnect(callback: () => void) {
    this.connectedCallback = callback;
  }

  onDisconnect(callback: () => void) {
    this.disconnectedCallback = callback;
  }

  onError(callback: (err: Error) => void) {
    this.errorCallback = callback;
  }

  onReceive(callback: (data: GameEvent) => void) {
    this.onReceiveCallback = callback;
  }

  /**
   * Reconnect with a new WS token
   */
  connect(token: string) {
    if (!this.socket) {
      throw new Error("Socket not initialized");
    }
    this.socket.auth = { token };

    this.socket.disconnect();
    this.socket.connect();
  }

  /**
   * Disconnect from the server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  /**
   * Completely destroy the socket instance
   */
  destroy() {
    const socket = this.socket;
    this.socket = null as unknown as Socket; // Clear reference to allow GC

    this.connectedCallback = () => {};
    this.disconnectedCallback = () => {};
    this.errorCallback = (_err: Error) => {};
    this.onReceiveCallback = (_data: GameEvent) => {};

    socket.disconnect();
    socket.removeAllListeners();
  }

  send(data: unknown) {
    if (!this.isConnected()) {
      throw new Error("Socket not initialized");
    }
    this.socket.emit("mj:game", data);
  }

  sendAndWait<T extends GameResponse>(data: GameRequest): Promise<T> {
    if (!this.isConnected()) {
      return Promise.reject({
        type: data.type,
        state: "error",
        message: "There is no connection to the server",
      });
    } else {
      return this.socket.timeout(2000).emitWithAck("mj:game", data);
    }
  }
}
