/**
 * Profile data stored for authenticated user
 */
export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface for managing user profile in storage
 */
export interface ProfileStorage {
  /**
   * Get the stored user profile
   */
  getProfile(): UserProfile | null;

  /**
   * Set the user profile
   */
  setProfile(profile: UserProfile): void;

  /**
   * Clear the stored profile
   */
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
