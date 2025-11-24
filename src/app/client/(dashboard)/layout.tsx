"use client";
import React, { useEffect, useMemo, useState } from "react";
import "@/src/app/globals.css";
import QueryProvider from "@/src/context/QueryProvider";
import Sidebar from "../../component/sidebar";
import { employeeSidebarLinks } from "../../../constant/sidebaritems";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist?.onFinishHydration?.(() =>
      setHasHydrated(true)
    );
    setHasHydrated(useAuthStore.persist?.hasHydrated?.() ?? true);

    return () => {
      unsub?.();
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  const memoizedSidebarLinks = useMemo(() => employeeSidebarLinks, []);

  const handleLogout = () => {
    clearAuth();
    router.replace("/auth/login");
  };

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <QueryProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pl-6 mt-8">
        <Sidebar links={memoizedSidebarLinks} onLogout={handleLogout} />
        <div className="main-content-area px-4 md:px-6 py-4 overflow-x-hidden">
          {children}
        </div>
      </div>
    </QueryProvider>
  );
}
