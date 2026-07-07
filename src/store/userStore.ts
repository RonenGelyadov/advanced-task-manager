import { create } from 'zustand';
import type { User } from '../types/dataTypes';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../config/firebase';

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

// onAuthStateChanged(auth, async (currentUser) => {
//   if (currentUser) {
//     const userData = await getUserById(currentUser.uid);
//     if (userData) {
//       setUser(userData);
//     } else {
//       console.error('User data not found in Firestore');
//       setUser(currentUser as any);
//     }
//   } else {
//     setUser(null);
//   }
// });

export default useUserStore;
