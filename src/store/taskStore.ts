import { create } from 'zustand';
import type { Task } from '../types/dataTypes';
import { addTask, getAllTasks } from '../services/taskFirebaseService';
import useLoadingStore from './loadingStore';

interface TaskStore {
  // Data:
  tasks: Task[];

  // Actions:
  fetchTasks: () => Promise<void>;
  getTaskById: (taskId: string) => Task;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: () => void;
  deleteTask: () => void;
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

  getTaskById: (taskId) => {
    const foundTask: Task = get().tasks.find((t) => t.id === taskId);
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

  deleteTask: () => {},
}));

export default useTaskStore;
