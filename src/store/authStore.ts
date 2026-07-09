import { create } from 'zustand';
import type { User } from '../types/dataTypes';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserById } from '../services/UserFirebaseService';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  logOut: () => void;
  logIn: (email: string, password: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>(() => ({
  user: null,
  isAuthenticated: false,
  logOut: () => signOut(auth),
  logIn: async (email, password) => {
    console.log(email, password);
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
});
