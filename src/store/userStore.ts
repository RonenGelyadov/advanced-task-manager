import { create } from 'zustand';
import type { User } from '../types/dataTypes';

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    if (user) {
      set({ user: user, isAuthenticated: true });
    } else set({ user: null, isAuthenticated: false });
  },
}));

export default useUserStore;
