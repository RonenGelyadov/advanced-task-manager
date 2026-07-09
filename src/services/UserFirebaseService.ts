import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from '../types/dataTypes';

const usersCollectionName = 'users';
const usersCollection = collection(db, usersCollectionName);

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const querySnapshot = await getDocs(usersCollection);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as User,
    );
  } catch (error) {
    console.error('Error getting users from firestore DB:', error);
    throw error;
  }
};

export const addUser = async (user: User): Promise<void> => {
  try {
    const userDocRef = doc(db, usersCollectionName, user.id);

    await setDoc(userDocRef, user);
  } catch (error) {
    console.error('Error adding user to firestore DB:', error);
    throw error;
  }
};
