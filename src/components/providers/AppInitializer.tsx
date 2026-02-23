"use client";

import { useEffect, useRef } from "react";
import { appService } from "@/lib/app-service";

export function AppInitializer() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) {
return;
}
    isInitialized.current = true;
    appService.initialize();
  }, []);

  return null;
}
