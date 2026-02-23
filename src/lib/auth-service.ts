import { client } from "./client";
import type { components } from "@/common/api/apis";
import { eventBus } from "./event-bus";

export type UserProfile = components["schemas"]["UserResponseDto"];

export class AuthService {
  private currentUser: UserProfile | null = null;
  private initialized = false;
  private initPromise: Promise<UserProfile | null> | null = null;

  /** Current user profile (null if not authenticated) */
  getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  /** Whether initialize() has completed */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Initialize: restore session from server via GET /api/auth/me.
   * Idempotent — deduplicates concurrent calls.
   */
  async initialize(): Promise<UserProfile | null> {
    if (this.initialized) {
return this.currentUser;
}
    if (!this.initPromise) {
      this.initPromise = this.doInitialize();
    }
    return this.initPromise;
  }

  private async doInitialize(): Promise<UserProfile | null> {
    eventBus.emit("user:pending", undefined);
    try {
      const profile = await this.fetchProfile();
      if (!profile) {
        eventBus.emit("user:signed-out", undefined);
        return null;
      }
      this.currentUser = profile;
      eventBus.emit("user:signed-in", profile);
      await this.fetchAndEmitWsToken();
    } catch {
      eventBus.emit("user:signed-out", undefined);
    } finally {
      this.initialized = true;
    }
    return this.currentUser;
  }

  /**
   * Login with email and password.
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

    eventBus.emit("user:signed-in", profile);
    await this.fetchAndEmitWsToken();
    return profile;
  }

  /**
   * Register a new account.
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

    eventBus.emit("user:signed-in", profile);
    await this.fetchAndEmitWsToken();
    return profile;
  }

  /** Logout: clear server cookie, clear in-memory state, notify */
  async logout(): Promise<void> {
    try {
      await client.POST("/api/auth/logout");
    } catch {
      // Best-effort
    }
    this.currentUser = null;
    this.initialized = true; // Still initialized, just no user
    this.initPromise = null; // Allow re-initialization if needed
    eventBus.emit("user:signed-out", undefined);
  }

  // --- Private helpers ---

  /** Fetch profile from server, update in-memory state */
  private async fetchProfile(): Promise<UserProfile | null> {
    try {
      const { data, error } = await client.GET("/api/auth/me");
      if (error || !data) {
return null;
}
      this.currentUser = data as UserProfile;
      this.initialized = true;
      return this.currentUser;
    } catch {
      return null;
    }
  }

  /** Fetch a short-lived WebSocket token and emit it */
  private async fetchAndEmitWsToken(): Promise<void> {
    try {
      const { data, error } = await client.GET("/api/auth/ws-token");
      if (error || !data) {
        console.warn("Failed to get WS token — socket will not connect");
        return;
      }
      eventBus.emit("user:ws-token", data.token);
    } catch {
      console.warn("Failed to get WS token — socket will not connect");
    }
  }
}

export const authService = new AuthService();
