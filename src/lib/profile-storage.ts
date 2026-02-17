import type { components } from "@/common/api/apis";

/**
 * Profile data stored for authenticated user.
 * Alias for the OpenAPI-generated UserResponseDto.
 */
export type UserProfile = components["schemas"]["UserResponseDto"];

/**
 * Interface for managing user profile in storage
 */
export interface ProfileStorage {
  getProfile(): UserProfile | null;
  setProfile(profile: UserProfile): void;
  clearProfile(): void;
}

/**
 * Default implementation using browser localStorage
 */
export class LocalStorageProfileStorage implements ProfileStorage {
  private readonly key = "user_profile";

  getProfile(): UserProfile | null {
    try {
      const profile = localStorage.getItem(this.key);
      return profile ? JSON.parse(profile) : null;
    } catch {
      return null;
    }
  }

  setProfile(profile: UserProfile): void {
    localStorage.setItem(this.key, JSON.stringify(profile));
  }

  clearProfile(): void {
    localStorage.removeItem(this.key);
  }
}
