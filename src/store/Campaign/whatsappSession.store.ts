import { create } from "zustand";

interface Session {
    thread_id: string;
    last_message: string;
    last_active: string;
}

interface SessionState {
    sessions: Record<string, Session>;
    updateSession: (threadId: string, data: Partial<Session>) => void;
}

export const useWhatsAppSessionStore = create<SessionState>((set) => ({
    sessions: {},
    updateSession: (threadId, data) =>
        set((state) => ({
            sessions: {
                ...state.sessions,
                [threadId]: {
                    ...state.sessions[threadId],
                    thread_id: threadId,
                    ...data,
                },
            },
        })),
}));
