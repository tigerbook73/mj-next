"use client";

import Room from "@/components/Room";
import { useRouter } from "next/navigation";
import SpeedDial from "@/components/ui-ex/SpeedDial";
import LoadingScreen from "@/components/ui-ex/LoadingScreen";
import { LogOut, PersonStandingIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/lib/auth-service";

export default function LobbyPage() {
  const router = useRouter();
  const { profile, isLoading } = useAuth();
  const games = [1, 2, 3, 4, 5];

  // Handle sign out
  const handleSignOut = async () => {
    await authService.logout();
    router.push("/");
  };

  const actions = [
    {
      icon: <PersonStandingIcon className="h-5 w-5" />,
      label: "Leave Current Room",
      onClick: () => 0,
    },
    {
      icon: <LogOut className="h-5 w-5" />,
      label: "Sign Out",
      onClick: handleSignOut,
    },
  ];

  // Show loading state while verifying authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center gap-16 p-8 sm:p-20">
      <div className="w-full text-center">
        <h1 className="mb-2 text-4xl font-bold">Lobby Page</h1>
        {profile && (
          <p className="text-muted-foreground">Welcome, {profile.email}</p>
        )}
      </div>

      <div className="grid w-full max-w-[1024px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {games.map((i) => (
          <Room key={i} name={`Room ${i}`} />
        ))}
      </div>

      <SpeedDial actions={actions} position="top-right" direction="down" />
    </div>
  );
}
