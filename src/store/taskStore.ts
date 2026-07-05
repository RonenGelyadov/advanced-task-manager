import { create } from 'zustand';
import type { Task } from '../types/dataTypes';

interface TaskStore {
  // Data:
  tasks: Task[];

  // Actions:
  getTasks: () => void;
  getTaskById: () => void;
  addTask: () => void;
  updateTask: () => void;
  deleteTask: () => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  // Data:
  tasks: [],

  // Actions:
  getTasks: () => {},

  getTaskById: () => {},

  addTask: () => {},

  updateTask: () => {},

  deleteTask: () => {},
}));

export default useTaskStore;
