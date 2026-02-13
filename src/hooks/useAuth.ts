import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth-service";
import type { UserProfile } from "@/lib/profile-storage";

/**
 * useAuth Hook
 *
 * Checks if user is authenticated and verifies token validity
 * - On first load, checks if profile exists in localStorage
 * - If found, verifies token with server
 * - If verification fails or no profile found, redirects to sign-in
 *
 * Usage:
 * const { profile, isLoading, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // First check if profile exists in cache
      const cachedProfile = authService.getProfileFromCache();

      if (!cachedProfile) {
        // No cached profile, redirect to sign-in
        setIsAuthenticated(false);
        setProfile(null);
        setIsLoading(false);
        return;
      }

      // Profile exists in cache, verify with server
      const verifiedProfile = await authService.verifyToken();

      if (verifiedProfile) {
        setProfile(verifiedProfile);
        setIsAuthenticated(true);
      } else {
        // Verification failed, redirect to sign-in
        setIsAuthenticated(false);
        setProfile(null);
        router.push("/");
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  return {
    profile,
    isLoading,
    isAuthenticated,
  };
}
