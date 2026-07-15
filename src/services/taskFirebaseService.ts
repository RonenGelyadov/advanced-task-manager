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
import type { Task } from '../types/dataTypes';

const tasksCollectionName = 'tasks';
const tasksCollection = collection(db, tasksCollectionName);

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const querySnapshot = await getDocs(tasksCollection);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Task,
    );
  } catch (error) {
    console.error('Error getting tasks from firestore DB:', error);
    throw error;
  }
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  try {
    const taskDocRef = doc(db, tasksCollectionName, id);
    const taskDocSnap = await getDoc(taskDocRef);

    if (taskDocSnap.exists()) return taskDocSnap.data() as Task;
    else return null;
  } catch (error) {
    console.error('Error getting column:', error);
    throw error;
  }
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<string> => {
  try {
    const newDoc = await addDoc(tasksCollection, task);
    return newDoc.id;
  } catch (error) {
    console.error('Error adding task to firestore DB:', error);
    throw error;
  }
};

export const updateTask = async ({ id, ...task }: Task): Promise<void> => {
  try {
    const taskDocRef = doc(db, tasksCollectionName, id);
    await updateDoc(taskDocRef, task);
  } catch (error) {
    console.error('Error updating task: ', error);
    throw error;
  }
};

export const deleteTaskById = async (id: string): Promise<boolean | null> => {
  try {
    const taskDocRef = doc(db, tasksCollectionName, id);
    await deleteDoc(taskDocRef);
    return true;
  } catch (error) {
    console.error('Error adding task to firestore DB:', error);
    throw error;
  }
};
