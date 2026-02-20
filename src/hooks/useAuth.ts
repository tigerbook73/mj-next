import { useEffect, useState } from "react";
import { authService, type UserProfile } from "@/lib/auth-service";
import { eventBus } from "@/lib/event-bus";

/**
 * Provides the current user profile, kept in sync via the event bus.
 * Auth initialization and routing are handled by AppService and AppGuard.
 */
export function useAuth() {
  const [profile, setProfile] = useState<UserProfile | null>(
    authService.getCurrentUser(),
  );

  useEffect(() => {
    const onSignedIn = (user: UserProfile) => setProfile(user);
    const onSignedOut = () => setProfile(null);

    eventBus.on("user:signed-in", onSignedIn);
    eventBus.on("user:signed-out", onSignedOut);

    return () => {
      eventBus.off("user:signed-in", onSignedIn);
      eventBus.off("user:signed-out", onSignedOut);
    };
  }, []);

  return { profile };
}
