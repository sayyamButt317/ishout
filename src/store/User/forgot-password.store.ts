import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ForgotPasswordStore {
    user_id: string;
    otp: string;
    new_password: string;
    confirm_password: string;
    setUserId: (user_id: string) => void;
    setOtp: (otp: string) => void;
    setNewPassword: (new_password: string) => void;
    setConfirmPassword: (confirm_password: string) => void;
}

export const useForgotPasswordStore = create<ForgotPasswordStore>()(
    devtools(
        persist(
            (set) => ({
                user_id: "",
                otp: "",
                new_password: "",
                confirm_password: "",
                setUserId: (user_id) => set({ user_id }),
                setOtp: (otp) => set({ otp }),
                setNewPassword: (new_password) => set({ new_password }),
                setConfirmPassword: (confirm_password) => set({ confirm_password }),
            }),
            {
                name: "forgot-password-storage",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
