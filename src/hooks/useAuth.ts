import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService, type UserProfile } from "@/lib/auth-service";

/**
 * Initializes auth session, provides profile state, and handles reactive logout.
 * Route protection is handled by middleware — this hook focuses on
 * session initialization (profile + WebSocket) and logout redirection.
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
      authService.initialize().then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    return unsub;
  }, [router]);

  return { profile, isLoading };
}
