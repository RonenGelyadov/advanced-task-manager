import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Board } from '../types/dataTypes';

const boardsCollectionName = 'boards';
const boardsCollection = collection(db, boardsCollectionName);

export const getAllBoards = async (): Promise<Board[]> => {
  try {
    const q = query(boardsCollection, orderBy('title', 'asc'));

    const querySnapshot = await getDocs(q);

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
    const boardDocRef = doc(db, boardsCollectionName, id);
    const boardDocSnap = await getDoc(boardDocRef);

    if (boardDocSnap.exists()) return boardDocSnap.data() as Board;
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

export const updateBoard = async ({ id, ...board }: Board): Promise<void> => {
  try {
    const boardDocRef = doc(db, boardsCollectionName, id);
    await updateDoc(boardDocRef, board);
  } catch (error) {
    console.error('Error updating board: ', error);
    throw error;
  }
};

export const deleteBoardbyId = async (id: string): Promise<void> => {
  try {
    const boardDocRef = doc(db, boardsCollectionName, id);
    await deleteDoc(boardDocRef);
  } catch (error) {
    console.error('Error adding board to firestore DB:', error);
    throw error;
  }
};
