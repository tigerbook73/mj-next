export const NO_TOKEN = "no-token";

export interface TokenStorage {
  /**
   * Get the stored authentication token
   */
  getToken(): string;

  /**
   * Set the authentication token with optional expiration time
   * @param token The authentication token or null to clear
   * @param expiresIn Expiration time in seconds
   */
  setToken(token: string | null, expiresIn?: number): void;
}

/**
 * Default implementation using browser localStorage
 */
class LocalStorageTokenStorage implements TokenStorage {
  private readonly key = "jwt_token";
  private readonly expiryKey = "jwt_token_expiry";

  getToken(): string {
    if (this.isTokenExpired()) {
      this.setToken(null);
      return NO_TOKEN;
    }
    return localStorage.getItem(this.key) || NO_TOKEN;
  }

  setToken(token: string | null, expiresIn?: number): void {
    if (token) {
      localStorage.setItem(this.key, token);
      if (expiresIn) {
        const expiryTime = Date.now() + expiresIn * 1000;
        localStorage.setItem(this.expiryKey, expiryTime.toString());
      } else {
        localStorage.removeItem(this.expiryKey);
      }
    } else {
      localStorage.removeItem(this.key);
      localStorage.removeItem(this.expiryKey);
    }
  }

  private getTokenExpiry(): number | null {
    const expiry = localStorage.getItem(this.expiryKey);
    return expiry ? parseInt(expiry, 10) : null;
  }

  private isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) return false;
    return Date.now() > expiry;
  }
}

export const localTokenStorage = new LocalStorageTokenStorage();
