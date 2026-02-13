import { client, tokenStorage } from "./client";
import {
  LocalStorageProfileStorage,
  type UserProfile,
} from "./profile-storage";

const profileStorage = new LocalStorageProfileStorage();

/**
 * AuthService handles authentication-related operations:
 * - Fetching and storing user profile
 * - Verifying token validity
 * - Clearing auth data
 */
export class AuthService {
  /**
   * Fetch user profile from server and store it
   * Called after successful sign-in or sign-up
   */
  async storeProfileAfterAuth(): Promise<UserProfile | null> {
    try {
      const { data, error } = await client.GET("/api/auth/profile");

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
   * Verify token validity by fetching profile from server
   * Used to check if cached token is still valid
   * Returns null if verification fails, otherwise returns the profile
   */
  async verifyToken(): Promise<UserProfile | null> {
    try {
      const { data, error } = await client.GET("/api/auth/profile");

      if (error || !data) {
        console.error("Token verification failed:", error);
        this.logout();
        return null;
      }

      profileStorage.setProfile(data as UserProfile);
      return data as UserProfile;
    } catch (error) {
      console.error("Error verifying token:", error);
      this.logout();
      return null;
    }
  }

  /**
   * Get cached profile from localStorage
   */
  getProfileFromCache(): UserProfile | null {
    return profileStorage.getProfile();
  }

  /**
   * Clear all auth data (token and profile)
   */
  logout(): void {
    tokenStorage.setToken(null);
    profileStorage.clearProfile();
  }

  /**
   * Check if user is authenticated (has token and profile in localStorage)
   */
  isAuthenticated(): boolean {
    return !!tokenStorage.getToken() && !!profileStorage.getProfile();
  }
}

export const authService = new AuthService();
