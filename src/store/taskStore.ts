import { create } from 'zustand';
import type { Task } from '../types/dataTypes';

interface TaskStore {
  // Data:
  tasks: Task[];

  // Actions:
  fetchTasks: () => void;
  getTaskById: (taskId: string) => Task;
  getTasksByBoardId: (boardId: string) => Task[];
  addTask: () => void;
  updateTask: () => void;
  deleteTask: () => void;
}

const useTaskStore = create<TaskStore>((set, get) => ({
  // Data:
  tasks: [],

  // Actions:
  fetchTasks: () => {},

  getTaskById: (taskId) => {
    const foundTask: Task = get().tasks.find((t) => t.id === taskId);
    return foundTask;
  },

  getTasksByBoardId: (boardId) => {
    const foundTasks: Task[] = get().tasks.filter((t) => t.boardId === boardId);

    return foundTasks;
  },

  addTask: () => {},

  updateTask: () => {},

  deleteTask: () => {},
}));

export default useTaskStore;
