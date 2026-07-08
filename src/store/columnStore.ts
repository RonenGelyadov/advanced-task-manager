import { create } from 'zustand';
import type { Column } from '../types/dataTypes';

interface ColumnStore {
  // Data:
  columns: Column[];

  // Actions:
  getColumns: () => void;
  getColumnById: () => void;
  addColumn: () => void;
  updateColumn: () => void;
  deleteColumn: () => void;
}

const useColumnStore = create<ColumnStore>((set) => ({
  // Data:
  columns: [],

  // Actions:
  getColumns: () => {},

  getColumnById: () => {},

  addColumn: () => {},

  updateColumn: () => {},

  deleteColumn: () => {},
}));

export default useColumnStore;
