import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, type UserProfile } from "@/lib/auth-service";

/**
 * Guards protected pages.
 * Waits for AuthService initialization, redirects to "/" if unauthenticated.
 */
export function useAuth() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(
    authService.getCurrentUser(),
  );
  const [isLoading, setIsLoading] = useState(!authService.isInitialized());

  useEffect(() => {
    const unsub = authService.subscribe((user) => {
      setProfile(user);
      if (!user && authService.isInitialized()) {
        router.push("/");
      }
    });

    if (!authService.isInitialized()) {
      authService.initialize().then((user) => {
        setIsLoading(false);
        if (!user) router.push("/");
      });
    } else if (!authService.getCurrentUser) {
      router.push("/");
    } else {
      setIsLoading(false);
    }

    return unsub;
  }, [router]);

  return { profile, isLoading };
}
