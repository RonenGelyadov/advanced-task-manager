import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '../types/dataTypes';
//import { addUser, getUserById } from '../services/usersFirebaseService';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

interface UserSignUpData {
  email: string;
  password: string;
  displayName: string;
  avatarColor: string;
}

interface UserContextType {
  user: User | null;
  signUp: (userData: UserSignUpData) => Promise<boolean | undefined>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<boolean | undefined>;
  logout: () => Promise<boolean | undefined>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async ({
    email,
    password,
    displayName,
    avatarColor,
  }: UserSignUpData): Promise<boolean | undefined> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        const newUser: User = {
          id: userCredential.user.uid,
          email,
          displayName,
          avatarColor,
          role: 'member',
        };

        //await addUser(newUser);
        return true;
      }
    } catch (error) {
      throw error;
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean | undefined> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<boolean | undefined> => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      throw error;
    }
  };

  /*useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = await getUserById(currentUser.uid);
        if (userData) {
          setUser(userData);
        } else {
          console.error('User data not found in Firestore');
          setUser(currentUser as any);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);*/

  return (
    <UserContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error('useUser must be used within a UserProvider');

  return context;
};
