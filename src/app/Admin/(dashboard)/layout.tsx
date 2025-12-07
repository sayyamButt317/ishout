import "@/src/app/globals.css";
import QueryProvider from "@/src/context/QueryProvider";
import Sidebar from "../../component/sidebar";
import { adminSidebarLinks } from "@/src/constant/sidebaritems";
import WebSocketListener from "@/src/helper/websocket-listener";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryProvider>
        <WebSocketListener />
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] pl-6 mt-8">
          <Sidebar links={adminSidebarLinks} />
          <div className="main-content-area px-4 md:px-6 py-4 overflow-x-hidden">
            {children}
          </div>
        </div>
      </QueryProvider>
    </>
  );
}
