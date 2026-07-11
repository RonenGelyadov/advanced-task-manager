import { create } from 'zustand';
import type { User } from '../types/dataTypes';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getUserById } from '../services/UserFirebaseService';

interface AuthStore {
  // Data
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setIsLoading: (isLoading: boolean) => void;
  logOut: () => void;
  logIn: (data: { email: string; password: string }) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setIsLoading: (isLoading) => set({ isLoading: isLoading }),

  logOut: () => signOut(auth),

  logIn: async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  },
}));

export default useAuthStore;

onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    const userData = await getUserById(currentUser.uid);
    if (userData) {
      useAuthStore.setState({ user: userData, isAuthenticated: true });
    } else {
      console.error('User data not found in Firestore');
      useAuthStore.setState({ user: null, isAuthenticated: true });
    }
  } else {
    useAuthStore.setState({ user: null, isAuthenticated: false });
  }

  useAuthStore.setState({ isLoading: false });
});
