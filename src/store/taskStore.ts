import { create } from 'zustand';
import type { Task } from '../types/dataTypes';

interface TaskStore {
  // Data:
  tasks: Task[];

  // Actions:
  fetchTasks: () => void;
  getTaskById: (taskId: string) => Task;
  getTasksByColumnId: (columnId: string) => Task[];
  getTasksByBoardId: (boardId: string) => Task[];
  addTask: () => void;
  updateTask: () => void;
  deleteTask: () => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  // Data:
  tasks: [],

  // Actions:
  fetchTasks: () => {},

  getTaskById: (taskId) => {
    const foundTask: Task = useTaskStore.getState().tasks.find((t) => t.id === taskId);
    return foundTask;
  },

  getTasksByColumnId: (columnId) => {
    const foundTasks: Task[] = useTaskStore
      .getState()
      .tasks.filter((t) => t.columnId === columnId);

    return foundTasks;
  },

  getTasksByBoardId: (boardId) => {
    const foundTasks: Task[] = useTaskStore
      .getState()
      .tasks.filter((t) => t.boardId === boardId);

    return foundTasks;
  },

  addTask: () => {},

  updateTask: () => {},

  deleteTask: () => {},
}));

export default useTaskStore;
