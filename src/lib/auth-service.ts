import { client } from "./client";
import {
  LocalStorageProfileStorage,
  type UserProfile,
} from "./profile-storage";

const profileStorage = new LocalStorageProfileStorage();

/**
 * AuthService handles authentication-related operations.
 *
 * JWT tokens are managed as HTTP-only cookies by the server.
 * The client cannot read or set tokens directly — it relies on
 * the browser cookie jar for REST auth, and fetches short-lived
 * WS tokens via `/api/auth/ws-token` for WebSocket connections.
 */
export class AuthService {
  /**
   * Fetch user profile from server and store it locally.
   * Called after successful sign-in or sign-up.
   * The auth cookie is already set by the login/register response.
   */
  async fetchAndStoreProfile(): Promise<UserProfile | null> {
    try {
      const { data, error } = await client.GET("/api/auth/me");

      if (error || !data) {
        console.error("Failed to fetch profile:", error);
        return null;
      }

      profileStorage.setProfile(data as UserProfile);
      return data as UserProfile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }

  /**
   * Verify auth validity by fetching profile from server.
   * Returns the profile if the cookie is still valid, null otherwise.
   */
  async verifyAuth(): Promise<UserProfile | null> {
    try {
      const { data, error } = await client.GET("/api/auth/me");

      if (error || !data) {
        console.error("Auth verification failed:", error);
        profileStorage.clearProfile();
        return null;
      }

      profileStorage.setProfile(data as UserProfile);
      return data as UserProfile;
    } catch (error) {
      console.error("Error verifying auth:", error);
      profileStorage.clearProfile();
      return null;
    }
  }

  /**
   * Get cached profile from localStorage.
   * This is a weak check — the cookie may have expired.
   * Always follow up with verifyAuth() for protected routes.
   */
  getProfileFromCache(): UserProfile | null {
    return profileStorage.getProfile();
  }

  /**
   * Logout: clear server cookie and local profile cache.
   */
  async logout(): Promise<void> {
    try {
      await client.POST("/api/auth/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    }
    profileStorage.clearProfile();
  }

  /**
   * Fetch a short-lived WebSocket token from the server.
   * Requires a valid auth cookie.
   */
  async getWsToken(): Promise<string | null> {
    try {
      const { data, error } = await client.GET("/api/auth/ws-token");

      if (error || !data) {
        console.error("Failed to fetch WS token:", error);
        return null;
      }

      return data.token;
    } catch (error) {
      console.error("Error fetching WS token:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
