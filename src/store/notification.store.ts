import { create } from 'zustand';

export type AppNotification = {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  raw?: unknown;
};

type NotificationState = {
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'read'>) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: crypto.randomUUID(),
          read: false,
        },
        ...state.notifications,
      ].slice(0, 100),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, read: true })),
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    })),
  clearAll: () => set({ notifications: [] }),
}));
