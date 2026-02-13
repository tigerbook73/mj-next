import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth-service";
import type { UserProfile } from "@/lib/profile-storage";

/**
 * useAuth Hook
 *
 * Checks if user is authenticated and verifies token validity
 * - Synchronously checks if profile exists in localStorage
 * - If not found, triggers redirect to sign-in via useEffect
 * - If found, verifies token with server
 * - If verification fails, redirects to sign-in
 *
 * Usage:
 * const { profile, isLoading, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const router = useRouter();

  // Check synchronously BEFORE hooks to avoid render flash
  const cachedProfile = authService.getProfileFromCache();

  // Initialize state - always true initially to show loading state
  // This prevents rendering content before auth is verified
  const [profile, setProfile] = useState<UserProfile | null>(cachedProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cachedProfile);

  useEffect(() => {
    // If no cached profile, redirect immediately
    if (!cachedProfile) {
      router.push("/");
      return;
    }

    // Only verify token if profile exists
    const verifyToken = async () => {
      const verifiedProfile = await authService.verifyToken();

      if (verifiedProfile) {
        setProfile(verifiedProfile);
        setIsAuthenticated(true);
      } else {
        // Verification failed, redirect to sign-in
        router.push("/");
        return;
      }

      setIsLoading(false);
    };

    verifyToken();
  }, [cachedProfile, router]);

  return {
    profile,
    isLoading,
    isAuthenticated,
  };
}
