// store/useUserStore.ts
import { create } from 'zustand';

interface UserState {
  userLoggedIn: boolean;
  theUser: string | null;
  setUserLoggedIn: (loggedIn: boolean) => void;
  setTheUser: (user: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userLoggedIn: false,
  theUser: null,
  setUserLoggedIn: (loggedIn) => set({ userLoggedIn: loggedIn }),
  setTheUser: (user) => set({ theUser: user }),
}));
