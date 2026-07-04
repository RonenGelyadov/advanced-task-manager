import { create } from 'zustand';
import type { Board, Column, Task } from '../types/dataTypes';

interface AppData {
  // Data
  tasks: Task[];
  columns: Column[];
  boards: Board[];

  // Actions
}

const useAppStore = create<AppData>((set) => ({
  // Data
  tasks: [],
  columns: [],
  boards: [],

  // Actions
}));

export default useAppStore;
