import { create } from 'zustand';
import type { User } from '../types/dataTypes';

interface UserStore {
  users: User[];

  getUsers: () => void;
  addUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],

  getUsers: () => {},
  addUser: () => {},
}));

export default useUserStore;
