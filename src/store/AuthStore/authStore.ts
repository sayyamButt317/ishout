import { create } from "zustand";
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuthStore {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    // role: string;
    // setRole: (role: string) => void;
    // access_token: string;
    // setAccessToken: (access_token: string) => void;
    // refresh_token: string;
    // setRefreshToken: (refresh_token: string) => void;
    clearAuth: () => void;
    getField: (field: keyof AuthStore) => any;
    setField: (field: keyof AuthStore, value: AuthStore[keyof AuthStore]) => void;
}


const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set, get) => ({
                isAuthenticated: false,
                setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
                // role: "",
                // setRole: (role: string) => set({ role }),
                // access_token: "",
                // setAccessToken: (access_token: string) => set({ access_token }),
                // refresh_token: "",
                // setRefreshToken: (refresh_token: string) => set({ refresh_token }),
                getField: (field: keyof AuthStore) => get()[field],
                setField: (field: keyof AuthStore, value: AuthStore[keyof AuthStore]) => set({ [field]: value }),
                clearAuth: () => set({ isAuthenticated: false }),
            }),

            {
                name: "auth-storage",
                storage: createJSONStorage(() => localStorage),
            }
        ),
        { name: "AuthStore" }
    )
);

export default useAuthStore;