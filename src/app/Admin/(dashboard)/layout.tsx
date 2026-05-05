import QueryProvider from '@/src/context/QueryProvider';
import WebSocketListener from '@/src/helper/websocket-listener';
import NotificationBootstrap from '@/src/helper/NotificationBootstrap';
import AdminSidebar from '../../component/AdminSidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <NotificationBootstrap />
      <WebSocketListener />
      <div className="flex  min-h-screen h-full">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden md:ml-80 p-3 border-amber-200 pt-2 h-full">{children}</main>
      </div>
    </QueryProvider>
  );
}
