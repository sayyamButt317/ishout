"use client";
import "@/src/app/globals.css";
import QueryProvider from "@/src/context/QueryProvider";
import Sidebar from "../../component/sidebar";
import { adminSidebarLinks } from "@/src/constant/sidebaritems";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import WebSocketListener from "@/src/helper/websocket-listener";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // Use selector to prevent unnecessary re-renders
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  // Memoize sidebar links to prevent recreation on every render
  const memoizedSidebarLinks = useMemo(() => adminSidebarLinks, []);

  return (
    <>
      <QueryProvider>
        <WebSocketListener />
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pl-6 mt-8">
          <Sidebar links={memoizedSidebarLinks} />
          <div className="main-content-area px-4 md:px-6 py-4 overflow-x-hidden">
            {children}
          </div>
        </div>
      </QueryProvider>
    </>
  );
}
