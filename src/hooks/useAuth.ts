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

  // Initialize state - always true initially to show loading state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedProfile = authService.getProfileFromCache();

    if (!cachedProfile) {
      router.push("/");
      return;
    }

    // Only verify token if profile exists
    const verifyToken = async () => {
      const verifiedProfile = await authService.verifyToken();

      if (verifiedProfile) {
        setProfile(verifiedProfile);
      } else {
        router.push("/");
        return;
      }

      setIsLoading(false);
    };

    verifyToken();
  }, [router]);

  return {
    profile,
    isLoading,
  };
}
