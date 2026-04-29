
import QueryProvider from "@/src/context/QueryProvider";
import Sidebar from "../../component/sidebar";
import { employeeSidebarLinks } from "../../../constant/sidebaritems";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="min-h-screen flex">
        <Sidebar links={employeeSidebarLinks} />
        <div className="flex-1 flex flex-col md:ml-70">
          <main className="flex-1 px-4 py-4 overflow-y-hidden mt-14 md:mt-0">
            {children}
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}
