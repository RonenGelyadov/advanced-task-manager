import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Board } from '../types/dataTypes';

const boardsCollectionName = 'boards';
const boardsCollection = collection(db, boardsCollectionName);

export const getAllBoards = async (): Promise<Board[]> => {
  try {
    const querySnapshot = await getDocs(boardsCollection);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Board,
    );
  } catch (error) {
    console.error('Error getting boards from firestore DB:', error);
    throw error;
  }
};

export const getBoardById = async (id: string): Promise<Board | null> => {
  try {
    const userDocRef = doc(db, boardsCollectionName, id);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) return userDocSnap.data() as Board;
    else return null;
  } catch (error) {
    console.error('Error getting board:', error);
    throw error;
  }
};

export const addBoard = async (board: Omit<Board, 'id'>): Promise<string> => {
  try {
    const newDoc = await addDoc(boardsCollection, board);
    return newDoc.id;
  } catch (error) {
    console.error('Error adding board to firestore DB:', error);
    throw error;
  }
};
