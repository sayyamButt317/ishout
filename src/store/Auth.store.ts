import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string;
  userRole: string;

  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;

  setUserRole: (role: string) => void;
  clearUserRole: () => void;
}

const AuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: '',
        userRole: '',

        setAccessToken: (token:string) => set({ accessToken: token }),
        clearAccessToken: () => set({ accessToken: '' }),

        setUserRole: (role:string) => set({ userRole: role }),
        clearUserRole: () => set({ userRole: '' }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default AuthStore;
