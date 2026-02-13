import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { GameEvent, GameRequest, GameResponse } from "./apis.models";
import { NO_TOKEN, LocalStorageTokenStorage, type TokenStorage } from "./token-storage";

export class GameSocket {
  public socket: Socket | null = null;
  public connected = false;
  public connectedCallback = () => {};
  public disconnectedCallback = () => {};
  public errorCallback = (err: Error) => {
    void err;
  };
  private tokenStorage: TokenStorage;

  constructor(url?: string, tokenStorage?: TokenStorage) {
    this.tokenStorage = tokenStorage || new LocalStorageTokenStorage();
    // Get JWT token from storage or use NO_TOKEN for backward compatibility
    const token = this.getAuthToken();

    // "undefined" means the URL will be computed from the `window.location` object
    this.socket = io(url, {
      auth: {
        token,
      },
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", this.onConnected.bind(this));
    this.socket.on("disconnect", this.onDisconnected.bind(this));
    this.socket.on("connect_error", this.onConnectError.bind(this));
  }

  private getAuthToken(): string {
    return this.tokenStorage.getToken();
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

    // If token is invalid and not NO_TOKEN, try to fallback to guest
    if (err.message.includes("Unauthorized") && this.getAuthToken() !== NO_TOKEN) {
      console.warn("Authentication failed. Token may be invalid or expired.");
      this.errorCallback(err);
      // Optionally clear the token and reconnect as guest
      // this.tokenStorage.setToken(null);
      // this.updateAuth(null);
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
   * Update the socket authentication token and reconnect
   * Call this after successful login/logout
   */
  updateAuth(token: string | null) {
    const authToken = token || NO_TOKEN;
    this.tokenStorage.setToken(token);
    if (this.socket) {
      (this.socket.io.opts as any).auth = { token: authToken };

      // If currently connected, reconnect with new token
      if (this.socket.connected) {
        this.socket.disconnect().connect();
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
