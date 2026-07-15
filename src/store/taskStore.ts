import { create } from 'zustand';
import type { Task } from '../types/dataTypes';
import { addTask, deleteTaskById, getAllTasks } from '../services/taskFirebaseService';
import useLoadingStore from './loadingStore';

interface TaskStore {
  // Data:
  tasks: Task[];

  // Actions:
  fetchTasks: () => Promise<void>;
  getTaskById: (id: string) => Task;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: () => void;
  deleteTask: (id: string) => Promise<void>;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  // Data:
  tasks: [],

  // Actions:
  fetchTasks: async () => {
    try {
      const tasksData = await getAllTasks();
      set({ tasks: tasksData });
    } catch (error) {
      throw error;
    }
  },

  getTaskById: (id) => {
    const foundTask: Task = get().tasks.find((t) => t.id === id);
    return foundTask;
  },

  addTask: async (task) => {
    useLoadingStore.getState().setIsLoading(true);
    try {
      const newId = await addTask(task);

      const newTask: Task = {
        id: newId,
        ...task,
      };
      set((s) => ({ tasks: [...s.tasks, newTask] }));
    } catch (error) {
      throw error;
    } finally {
      useLoadingStore.getState().setIsLoading(false);
    }
  },

  updateTask: () => {},

  deleteTask: async (id) => {
    useLoadingStore.getState().setIsLoading(true);
    try {
      const isDeleted = await deleteTaskById(id);

      if (isDeleted) {
        const newTasks = get().tasks.filter((t) => t.id !== id);
        set({ tasks: newTasks });
      }
    } catch (error) {
      throw error;
    } finally {
      useLoadingStore.getState().setIsLoading(false);
    }
  },
}));

export default useTaskStore;
