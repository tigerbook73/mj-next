import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth-service";
import type { UserProfile } from "@/lib/profile-storage";

/**
 * useAuth Hook
 *
 * Guards protected pages by verifying authentication with the server.
 * - Checks if a cached profile exists in localStorage
 * - If not found, redirects to sign-in
 * - If found, verifies with the server (cookie-based auth)
 * - If verification fails, redirects to sign-in
 */
export function useAuth() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedProfile = authService.getProfileFromCache();

    if (!cachedProfile) {
      router.push("/");
      return;
    }

    const verify = async () => {
      const verifiedProfile = await authService.verifyAuth();

      if (verifiedProfile) {
        setProfile(verifiedProfile);
      } else {
        router.push("/");
        return;
      }

      setIsLoading(false);
    };

    verify();
  }, [router]);

  return {
    profile,
    isLoading,
  };
}
