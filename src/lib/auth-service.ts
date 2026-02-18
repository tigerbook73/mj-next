import { client } from "./client";
import type { components } from "@/common/api/apis";
import { socketClient } from "./socket-client";

export type UserProfile = components["schemas"]["UserResponseDto"];

export class AuthService {
  private currentUser: UserProfile | null = null;
  private initialized = false;
  private initPromise: Promise<UserProfile | null> | null = null;
  private listeners = new Set<(user: UserProfile | null) => void>();

  /** Current user profile (null if not authenticated) */
  getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  /** Whether initialize() has completed */
  isInitialized(): boolean {
    return this.initialized;
  }

  /** Subscribe to user state changes. Returns unsubscribe function. */
  subscribe(listener: (user: UserProfile | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.currentUser);
    }
  }

  /**
   * Initialize: restore session from server via GET /api/auth/me.
   * If session is valid, also connects the SocketClient.
   * Idempotent — deduplicates concurrent calls.
   */
  async initialize(): Promise<UserProfile | null> {
    if (this.initialized) return this.currentUser;
    if (!this.initPromise) {
      this.initPromise = this.doInitialize();
    }
    return this.initPromise;
  }

  private async doInitialize(): Promise<UserProfile | null> {
    try {
      const { data, error } = await client.GET("/api/auth/me");
      if (!error && data) {
        this.currentUser = data as UserProfile;
        await this.connectSocketClient();
      }
    } catch {
      // Network error — treat as unauthenticated
    }
    this.initialized = true;
    this.notify();
    return this.currentUser;
  }

  /**
   * Login with email and password.
   * On success: sets currentUser, connects SocketClient, notifies listeners.
   * Returns the user profile, or throws on failure.
   */
  async login(email: string, password: string): Promise<UserProfile> {
    const { data, error } = await client.POST("/api/auth/login", {
      body: { email, password },
    });

    if (error || !data) {
      throw new Error("Invalid email or password. Please try again.");
    }

    // Cookie is set by the server. Fetch full profile.
    const profile = await this.fetchProfile();
    if (!profile) {
      throw new Error("Failed to load user profile. Please try again.");
    }

    await this.connectSocketClient();
    return profile;
  }

  /**
   * Register a new account.
   * On success: sets currentUser, connects SocketClient, notifies listeners.
   * Returns the user profile, or throws on failure.
   */
  async register(
    email: string,
    name: string,
    password: string,
  ): Promise<UserProfile> {
    const { data, error } = await client.POST("/api/auth/register", {
      body: { email, name, password },
    });

    if (error || !data) {
      throw new Error(
        "Registration failed. Please check your information and try again.",
      );
    }

    const profile = await this.fetchProfile();
    if (!profile) {
      throw new Error("Failed to load user profile. Please try again.");
    }

    await this.connectSocketClient();
    return profile;
  }

  /** Logout: disconnect socket, clear server cookie, clear in-memory state */
  async logout(): Promise<void> {
    socketClient.disconnect();
    try {
      await client.POST("/api/auth/logout");
    } catch {
      // Best-effort
    }
    this.currentUser = null;
    this.initialized = true; // Still initialized, just no user
    this.initPromise = null; // Allow re-initialization if needed
    this.notify();
  }

  /** Fetch a short-lived WebSocket token (requires valid cookie) */
  private async getWsToken(): Promise<string | null> {
    try {
      const { data, error } = await client.GET("/api/auth/ws-token");
      if (error || !data) return null;
      return data.token;
    } catch {
      return null;
    }
  }

  // --- Private helpers ---

  /** Fetch profile from server, update in-memory state, notify */
  private async fetchProfile(): Promise<UserProfile | null> {
    try {
      const { data, error } = await client.GET("/api/auth/me");
      if (error || !data) return null;

      this.currentUser = data as UserProfile;
      this.initialized = true;
      this.notify();
      return this.currentUser;
    } catch {
      return null;
    }
  }

  /** Connect SocketClient with a fresh WS token */
  private async connectSocketClient(): Promise<void> {
    const wsToken = await this.getWsToken();
    if (!wsToken) {
      console.warn("Failed to get WS token — socket not connected");
      return;
    }

    socketClient.connect(wsToken);
  }
}

export const authService = new AuthService();
