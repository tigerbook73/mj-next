"use client";

import { useEffect, useRef } from "react";
import { GameEvent } from "@/common";
import { initSocket } from "@/lib/socket-client";
import { useGameStore, useRoomStore, useUserStore } from "@/store";
import { authService } from "@/lib/auth-service";

export function ServiceInitializer() {
  // 使用 useRef 确保在 React 严格模式下逻辑只执行一次
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) {
      return;
    }

    // 1. 初始化 Socket 实例并获取
    const client = initSocket();
    if (!client) {
      return;
    }

    // 2. 绑定事件回调
    client.onReceive((event: GameEvent) => {
      // 保持 getState() 获取最新状态的写法很好，无需改变
      const { setRoomList, setMyRoom, setMyPosition } = useRoomStore.getState();
      const { setGame } = useGameStore.getState();

      const parsedEvent = client.parseEvent(event);

      setRoomList(parsedEvent.data.rooms);
      setMyRoom(client.findMyRoom(parsedEvent));
      setMyPosition(client.findMyPlayerModel(parsedEvent)?.position ?? null);
      setGame(client.findMyGame(parsedEvent));
    });

    authService.subscribe((user) => {
      const { setUser, setSignedIn } = useUserStore.getState();
      if (user) {
        setUser({ email: user.email, name: user.name });
      }
      setSignedIn(!!user);
    });
    authService.initialize();

    isInitialized.current = true;

    // 3. 清理函数
    return () => {
      // 注意：在单页应用中，Layout 通常不会销毁。
      // 如果你要处理用户登出，可以在这里断开。
      // client.disconnect();
    };
  }, []);

  return null;
}
