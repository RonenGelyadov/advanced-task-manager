import { create } from 'zustand';
import type { Task } from '../types/dataTypes';
import {
  addTask,
  deleteTaskById,
  getAllTasks,
  updateTask,
} from '../services/taskFirebaseService';
import useLoadingStore from './loadingStore';

interface TaskStore {
  // Data:
  tasks: Task[];

  // Actions:
  fetchTasks: () => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  moveTask: (taskId: string, columnId: string) => Promise<void>;
  toggleSaveTask: (taskId: string, userId: string) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
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
    const foundTask: Task | undefined = get().tasks.find((t) => t.id === id);
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

  moveTask: async (taskId, columnId) => {
    const foundTask = get().tasks.find((t) => t.id === taskId);
    if (!foundTask || foundTask.columnId === columnId) return;

    const movedTask = { ...foundTask, columnId };

    set({ tasks: get().tasks.map((t) => (t.id === taskId ? movedTask : t)) });

    try {
      await updateTask(movedTask);
    } catch (error) {
      set({ tasks: get().tasks.map((t) => (t.id === taskId ? foundTask : t)) });
      throw error;
    }
  },

  toggleSaveTask: async (taskId, userId) => {
    try {
      const foundTask = get().tasks.find((t) => t.id === taskId);
      if (!foundTask) return;

      const isUserIncluded = foundTask.savedBy.includes(userId);

      let newSavedList: string[];

      if (isUserIncluded) {
        newSavedList = foundTask.savedBy.filter((id) => id !== userId);
      } else {
        newSavedList = [...foundTask.savedBy, userId];
      }

      const newTask = {
        ...foundTask,
        savedBy: newSavedList,
      };

      await get().updateTask(newTask);
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (task) => {
    try {
      await updateTask(task);

      const newTasks = get().tasks.map((t) => (t.id === task.id ? task : t));

      set({ tasks: newTasks });
    } catch (error) {
      throw error;
    }
  },

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
