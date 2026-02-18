import { SocketClient, GameSocket } from "@/common";

declare global {
  interface Window {
    __GLOBAL_SOCKET_CLIENT__?: SocketClient;
  }
}

/**
 * 导出的实例变量。
 * 在服务端它是 undefined，在客户端初始化后变为单例。
 */
export let socketClient: SocketClient;

/**
 * 初始化 Socket 实例。
 * 采用惰性初始化，确保只在浏览器端运行，且在开发环境下支持热更新（HMR）单例。
 */
export const initSocket = (token?: string) => {
  // 1. 安全守卫：确保不在服务端运行
  if (typeof window === "undefined") return;

  // 2. 避免重复初始化逻辑
  if (socketClient) return socketClient;

  const url = process.env.NEXT_PUBLIC_WS_URL;

  // 3. 开发环境特殊处理：将实例挂载到 window 避免 HMR 导致重复连接
  if (process.env.NODE_ENV === "development") {
    if (!window.__GLOBAL_SOCKET_CLIENT__) {
      console.log("[Socket] Creating new development instance...");
      const gameSocket = new GameSocket(url, token);
      window.__GLOBAL_SOCKET_CLIENT__ = new SocketClient(gameSocket);
    } else {
      console.log("♻️ [Socket] Reusing existing development instance (HMR).");
    }

    socketClient = window.__GLOBAL_SOCKET_CLIENT__;
  } else {
    // 4. 生产环境直接创建单例
    const gameSocket = new GameSocket(url, token);
    socketClient = new SocketClient(gameSocket);
  }

  return socketClient;
};
