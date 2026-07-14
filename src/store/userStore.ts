import { create } from 'zustand';
import type { User } from '../types/dataTypes';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addUser, getAllUsers } from '../services/UserFirebaseService';

interface UserStore {
  users: User[];

  fetchUsers: () => Promise<void>;

  registerUser: (user: Omit<User, 'id' | 'role'> & { password: string }) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const usersData = await getAllUsers();
      set({ users: usersData });
    } catch (error) {
      throw error;
    }
  },

  registerUser: async ({ email, password, ...user }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        const newUser: User = {
          id: userCredential.user.uid,
          email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarColor: user.avatarColor,
          role: 'member',
        };

        await addUser(newUser);
        set((s) => ({ users: [...s.users, newUser] }));
      }
    } catch (error) {
      throw error;
    }
  },
}));

export default useUserStore;
