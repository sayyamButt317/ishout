"use client";

import { useEffect } from "react";
import { useNotificationSound } from "./notificationSound";

export default function NotificationBootstrap() {
  const { unlockOnce } = useNotificationSound();

  useEffect(() => {
    const unlock = () => {
      unlockOnce();
      document.removeEventListener("click", unlock);
    };

    document.addEventListener("click", unlock);
    return () => document.removeEventListener("click", unlock);
  }, [unlockOnce]);

  return null;
}
