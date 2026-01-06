import { create } from "zustand";

export interface ChatMessage {
    _id?: string;
    thread_id?: string;
    sender: "AI" | "USER" | "ADMIN";
    username?: string
    message: string;
    timestamp: string;
}

interface WhatsAppChatState {
    chats: Record<string, ChatMessage[]>;
    unread: Record<string, number>;
    setMessages: (threadId: string, messages: ChatMessage[]) => void;
    addMessage: (threadId: string, msg: ChatMessage, active?: boolean) => void;
    markRead: (threadId: string) => void;
}
export const useWhatsAppChatStore = create<WhatsAppChatState>((set) => ({
    chats: {},
    unread: {},

    setMessages: (threadId, messages) =>
        set((state) => ({
            chats: { ...state.chats, [threadId]: messages },
            unread: { ...state.unread, [threadId]: 0 },
        })),

    addMessage: (threadId, msg, active = false) =>
        set((state) => {
            const existing = state.chats[threadId] || [];

            const unreadInc =
                msg.sender === "USER" && !active ? 1 : 0;

            return {
                chats: {
                    ...state.chats,
                    [threadId]: [...existing, msg],
                },
                unread: {
                    ...state.unread,
                    [threadId]: (state.unread[threadId] || 0) + unreadInc,
                },
            };
        }),

    markRead: (threadId) =>
        set((state) => ({
            unread: { ...state.unread, [threadId]: 0 },
        })),
}));