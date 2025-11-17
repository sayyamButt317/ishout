import { create } from "zustand";

type Attachment = {
    type: "image" | "video" | "audio" | "file";
    payload: {
        url: string;
    };
};

type Notification = {
    type: string;
    from_psid: string;
    from_username: string;
    text?: string;
    attachments?: Attachment[];
    image?: string;
    video?: string;
    audio?: string;
    file?: string;
    timestamp: number;
    mid?: string;
};

type Store = {
    notifications: Notification[];
    addNotification: (n: Notification) => void;
    clearNotifications: () => void;
};

export const useNotificationStore = create<Store>((set) => ({
    notifications: [],
    addNotification: (n) =>
        set((state) => ({ notifications: [...state.notifications, n] })),
    clearNotifications: () => set({ notifications: [] }),
}));
