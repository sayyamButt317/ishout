'use client';

import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { useNotificationStore } from '@/src/store/notification.store';

function formatNotificationTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export default function NotificationBell() {
  const notifications = useNotificationStore((s) => s.notifications);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const clearAll = useNotificationStore((s) => s.clearAll);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Open notifications"
        >
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="border-white/10 bg-[#0f1014] text-white sm:max-w-md">
        <SheetHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between gap-2 pr-8">
            <SheetTitle className="text-white">Notifications</SheetTitle>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-8 text-xs text-white/70 hover:bg-white/10 hover:text-white"
              >
                <CheckCheck className="mr-1 size-3.5" />
                Read all
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="h-8 text-xs text-red-300 hover:bg-red-500/10 hover:text-red-200"
              >
                <Trash2 className="mr-1 size-3.5" />
                Clear
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto p-4">
          {notifications.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/60">
              No notifications yet.
            </p>
          ) : (
            notifications.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => markAsRead(item.id)}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  item.read
                    ? 'border-white/10 bg-white/3 text-white/70'
                    : 'border-violet-400/30 bg-violet-500/10 text-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{item.title}</p>
                  {!item.read && <span className="mt-1 size-2 rounded-full bg-cyan-300" />}
                </div>
                <p className="mt-1 text-xs text-white/70">{item.message}</p>
                <p className="mt-2 text-[11px] text-white/45">
                  {formatNotificationTime(item.timestamp)}
                </p>
              </button>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
