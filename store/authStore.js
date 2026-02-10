import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      // isCheckingUser : true,
      setCurrentUser: (user) => set({ currentUser: user }),
      // setIsCheckingUser : () => set((state) => ({isCheckingUser: !state.isCheckingUser})),
      logout: () => set({ currentUser: null }),
    }),
    {
      name: "auth-store", // localStorage key
    }
  )
);

export default useAuthStore;
