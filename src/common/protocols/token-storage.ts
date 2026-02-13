export const NO_TOKEN = "no-token";

export interface TokenStorage {
  /**
   * Get the stored authentication token
   */
  getToken(): string;

  /**
   * Set the authentication token
   */
  setToken(token: string | null): void;
}

/**
 * Default implementation using browser localStorage
 */
export class LocalStorageTokenStorage implements TokenStorage {
  private readonly key = "jwt_token";

  getToken(): string {
    return localStorage.getItem(this.key) || NO_TOKEN;
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.key, token);
    } else {
      localStorage.removeItem(this.key);
    }
  }
}
