import "@/src/app/globals.css";
import QueryProvider from "@/src/context/QueryProvider";
import Sidebar from "../../component/sidebar";
import { adminSidebarLinks } from "@/src/constant/sidebaritems";
import WebSocketListener from "@/src/helper/websocket-listener";
import NotificationBootstrap from "@/src/helper/NotificationBootstrap";
import Image from "next/image";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <NotificationBootstrap />
      <WebSocketListener />

      <div className="min-h-screen flex">
        <Sidebar links={adminSidebarLinks} />
        <div className="flex-1 flex flex-col md:ml-[280px]">
          <main className="flex-1 px-4 py-4 overflow-y-auto 
            mt-14 md:mt-0">
            {children}
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}
