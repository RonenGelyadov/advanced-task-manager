import { create } from 'zustand';
import type { User } from '../types/dataTypes';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addUser } from '../services/UserFirebaseService';

interface UserStore {
  users: User[];

  fetchUsers: () => void;

  registerUser: (user: Omit<User, 'id' | 'role'> & { password: string }) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],

  fetchUsers: () => {},

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
