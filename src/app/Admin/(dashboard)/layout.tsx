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
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto md:ml-80 p-3 pt-2">
          {children}
        </main>
      </div>
    </QueryProvider>
  );
}
