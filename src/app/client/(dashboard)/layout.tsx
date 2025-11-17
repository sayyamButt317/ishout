"use client";
import React, { useEffect } from "react";
import "@/src/app/globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/src/context/QueryProvider";
import Sidebar from "../../component/sidebar";
import { employeeSidebarLinks } from "../../../constant/sidebaritems";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { useRouter } from "next/navigation";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { getField, clearAuth } = useAuthStore();

  useEffect(() => {
    if (!getField("isAuthenticated")) {
      router.replace("/auth/login");
    }
  }, [getField, router]);

  const handleLogout = () => {
    clearAuth();
    router.replace("/auth/login");
  };

  return (
    <div className="">
      <Toaster />
      <QueryProvider>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pl-6 mt-8">
          <Sidebar links={employeeSidebarLinks} onLogout={handleLogout} />
          <div className="main-content-area px-4 md:px-6 py-4 overflow-x-hidden">
            {children}
          </div>
        </div>
      </QueryProvider>
    </div>
  );
}
