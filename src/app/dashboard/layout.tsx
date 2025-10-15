"use client";
import "@/src/app/globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/src/context/QueryProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
