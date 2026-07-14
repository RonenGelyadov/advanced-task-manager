import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Column } from '../types/dataTypes';

const columnsCollectionName = 'columns';
const columnsCollection = collection(db, columnsCollectionName);

export const getAllColumns = async (): Promise<Column[]> => {
  try {
    const querySnapshot = await getDocs(columnsCollection);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Column,
    );
  } catch (error) {
    console.error('Error getting columns from firestore DB:', error);
    throw error;
  }
};

export const getColumnById = async (id: string): Promise<Column | null> => {
  try {
    const columnDocRef = doc(db, columnsCollectionName, id);
    const columnDocSnap = await getDoc(columnDocRef);

    if (columnDocSnap.exists()) return columnDocSnap.data() as Column;
    else return null;
  } catch (error) {
    console.error('Error getting column:', error);
    throw error;
  }
};

export const addColumn = async (column: Omit<Column, 'id'>): Promise<string> => {
  try {
    const newDoc = await addDoc(columnsCollection, column);
    return newDoc.id;
  } catch (error) {
    console.error('Error adding column to firestore DB:', error);
    throw error;
  }
};

export const updateColumn = async ({ id, ...column }: Column): Promise<void> => {
  try {
    const columnDocRef = doc(db, columnsCollectionName, id);
    await updateDoc(columnDocRef, column);
  } catch (error) {
    console.error('Error updating column: ', error);
    throw error;
  }
};

export const deleteColumnById = async (id: string): Promise<boolean | null> => {
  try {
    const boardDocRef = doc(db, columnsCollectionName, id);
    await deleteDoc(boardDocRef);
    return true;
  } catch (error) {
    console.error('Error adding column to firestore DB:', error);
    throw error;
  }
};
