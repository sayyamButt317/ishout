import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { IMessage } from "../types/readymadeinfluencers-type";


interface ChatState {
  message: string;
  isThinking: boolean;
  chatHistory: IMessage[];

  setMessage: (message: string) => void;
  setIsThinking: (isThinking: boolean) => void;
  setChatHistory: (chatHistory: IMessage[]) => void;
  clearMessages: () => void;
}

const ChatStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        message: "",
        isThinking: false,
        chatHistory: [],

        setChatHistory: (chatHistory: IMessage[]) => set({ chatHistory: chatHistory }),
        setIsThinking: (isThinking: boolean) => set({ isThinking: isThinking }),
        setMessage: (value: string) => set({ message: String(value ?? "") }),
        clearMessages: () => set({ message: "" }),
        clearChatHistory: () => set({ chatHistory: [] }),
      }),
      {
        name: 'chat-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default ChatStore;