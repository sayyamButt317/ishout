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
    setMessages: (threadId: string, messages: ChatMessage[]) => void;
    addMessage: (threadId: string, msg: ChatMessage) => void;
}

export const useWhatsAppChatStore = create<WhatsAppChatState>((set) => ({
    chats: {},

    setMessages: (threadId, messages) =>
        set((state) => ({
            chats: {
                ...state.chats,
                [threadId]: messages,
            },
        })),

    addMessage: (threadId, msg) =>
        set((state) => {
            const existing = state.chats[threadId] || [];

            if (existing.some((m) => m._id === msg._id)) {
                return state;
            }

            const next = [...existing, msg].sort(
                (a, b) =>
                    new Date(a.timestamp).getTime() -
                    new Date(b.timestamp).getTime()
            );

            return {
                chats: {
                    ...state.chats,
                    [threadId]: next,
                },
            };
        }),

}));
