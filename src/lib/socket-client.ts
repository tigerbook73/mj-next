import { SocketClient, GameSocket } from "@/common";

export const socketClient: SocketClient = new SocketClient(
  new GameSocket(process.env.NEXT_PUBLIC_WS_URL || undefined),
);
