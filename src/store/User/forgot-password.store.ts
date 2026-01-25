import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ForgotPasswordStore {
    user_id: string;
    email: string;
    otp: string;
    new_password: string;
    confirm_password: string;
    token: string;
    reset_token: string;
    setUserId: (user_id: string) => void;
    setEmail: (email: string) => void;
    setOtp: (otp: string) => void;
    setNewPassword: (new_password: string) => void;
    setConfirmPassword: (confirm_password: string) => void;
    setToken: (token: string) => void;
    setResetToken: (reset_token: string) => void;
}

export const useForgotPasswordStore = create<ForgotPasswordStore>()(
    devtools(
        persist(
            (set, get) => ({
                user_id: "",
                email: "",
                otp: "",
                new_password: "",
                confirm_password: "",
                token: "",
                reset_token: "",
                setResetToken: (reset_token: string) => set({ reset_token }),
                setUserId: (user_id: string) => set({ user_id }),
                setEmail: (email: string) => set({ email }),
                setOtp: (otp: string) => set({ otp }),
                setNewPassword: (new_password: string) => set({ new_password }),
                setConfirmPassword: (confirm_password: string) => set({ confirm_password }),
                setToken: (token: string) => set({ token }),
                getField: (field: keyof ForgotPasswordStore) => get()[field],
                setField: (field: keyof ForgotPasswordStore, value: ForgotPasswordStore[keyof ForgotPasswordStore]) => set({ [field]: value }),
            }),
            {
                name: "forgot-password-storage",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
