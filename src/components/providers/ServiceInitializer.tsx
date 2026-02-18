"use client";

import { useEffect, useRef } from "react";
import { GameEvent } from "@/common";
import { initSocket } from "@/lib/socket-client";
import { useGameStore, useRoomStore, useUserStore } from "@/store";
import { authService } from "@/lib/auth-service";
import { useRouter, usePathname } from "next/navigation";

export function ServiceInitializer() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const game = useGameStore((state) => state.game);

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
      const { setGame } = useGameStore.getState();
      if (user) {
        setUser({ email: user.email, name: user.name });
      }
      setSignedIn(!!user);
      if (!user) {
        setGame(null);
      }
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

  // 根据用户登录状态和游戏状态进行路由导航
  useEffect(() => {
    // 如果用户未登录，重定向到登录页或注册页
    if (!user.email && pathname !== "/" && pathname !== "/signup") {
      router.push("/");
    } else if (user.email && game && pathname !== "/game") {
      // 用户已登录且有游戏，重定向到游戏页
      router.push("/game");
    } else if (user.email && !game && pathname !== "/lobby") {
      // 用户已登录但没有游戏，重定向到大厅
      router.push("/lobby");
    }
  }, [user, game, pathname, router]);

  return null;
}
