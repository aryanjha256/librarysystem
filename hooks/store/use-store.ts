import { User } from "@prisma/client";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));
