import { create } from 'zustand';
import type { Column } from '../types/dataTypes';
import { addColumn, getAllColumns } from '../services/columnFirebaseService';

interface ColumnStore {
  // Data:
  columns: Column[];

  // Actions:
  fetchColumns: () => Promise<void>;
  getColumnById: () => void;
  getColumnsByBoardId: (boardId: string) => Column[];
  addColumn: (column: Omit<Column, 'id'>) => Promise<void>;
  updateColumn: () => void;
  deleteColumn: () => void;
}

const useColumnStore = create<ColumnStore>((set) => ({
  // Data:
  columns: [],

  // Actions:
  fetchColumns: async () => {
    try {
      const columnsData = await getAllColumns();
      set({ columns: columnsData });
    } catch (error) {
      throw error;
    }
  },

  getColumnById: () => {},

  getColumnsByBoardId: (boardId) => {
    const foundColumns: Column[] = useColumnStore
      .getState()
      .columns.filter((c) => c.boardId === boardId);

    return foundColumns;
  },

  addColumn: async (column) => {
    try {
      const newId = await addColumn(column);

      const newColumn: Column = {
        id: newId,
        ...column,
      };

      set((s) => ({ columns: [...s.columns, newColumn] }));
    } catch (error) {
      throw error;
    }
  },

  updateColumn: () => {},

  deleteColumn: () => {},
}));

export default useColumnStore;
