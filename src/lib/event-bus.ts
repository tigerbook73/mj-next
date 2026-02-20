import mitt from "mitt";
import type { UserProfile } from "./auth-service";
import type { GameEvent } from "@/common";

export type AppEvents = {
  "user:pending": undefined;
  "user:signed-in": UserProfile;
  "user:signed-out": undefined;
  "user:ws-token": string;
  "socket:pending": undefined;
  "socket:connected": undefined;
  "socket:disconnected": undefined;
  "socket:data": GameEvent;
};

export const eventBus = mitt<AppEvents>();
