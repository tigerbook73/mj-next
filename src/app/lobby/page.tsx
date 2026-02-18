"use client";

import Room from "@/components/Room";
import SpeedDial from "@/components/ui-ex/SpeedDial";
import { LogOut, PersonStandingIcon } from "lucide-react";
import { authService } from "@/lib/auth-service";
import { useRoomStore } from "@/store/room-store";
import { useUserStore } from "@/store";

export default function LobbyPage() {
  const roomList = useRoomStore((s) => s.roomList);
  const user = useUserStore((s) => s.user);

  // Handle sign out
  const handleSignOut = async () => {
    await authService.logout();
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

  return (
    <div className="flex min-h-screen w-screen flex-col items-center gap-16 p-8 sm:p-20">
      <div className="w-full text-center">
        <h1 className="mb-2 text-4xl font-bold">Lobby Page</h1>
        {user && <p className="text-muted-foreground">Welcome, {user.email}</p>}
      </div>

      <div className="grid w-full max-w-[1024px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {roomList.map((room) => (
          <Room key={room.name} room={room} />
        ))}
      </div>

      <SpeedDial actions={actions} position="top-right" direction="down" />
    </div>
  );
}
