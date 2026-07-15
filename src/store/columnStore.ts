import { create } from 'zustand';
import type { Column } from '../types/dataTypes';
import {
  addColumn,
  deleteColumnById,
  getAllColumns,
} from '../services/columnFirebaseService';
import useLoadingStore from './loadingStore';

interface ColumnStore {
  // Data:
  columns: Column[];

  // Actions:
  fetchColumns: () => Promise<void>;
  getColumnsByBoardId: (boardId: string) => Column[];
  addColumn: (column: Omit<Column, 'id'>) => Promise<void>;
  updateColumn: () => void;
  deleteColumn: (columnId: string) => Promise<void>;
}

const useColumnStore = create<ColumnStore>((set, get) => ({
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

  getColumnsByBoardId: (boardId) => {
    const foundColumns: Column[] = get().columns.filter((c) => c.boardId === boardId);

    return foundColumns;
  },

  addColumn: async (column) => {
    useLoadingStore.getState().setIsLoading(true);
    try {
      const newId = await addColumn(column);

      const newColumn: Column = {
        id: newId,
        ...column,
      };

      set((s) => ({ columns: [...s.columns, newColumn] }));
    } catch (error) {
      throw error;
    } finally {
      useLoadingStore.getState().setIsLoading(false);
    }
  },

  updateColumn: () => {},

  deleteColumn: async (columnId) => {
    useLoadingStore.getState().setIsLoading(true);
    try {
      const isDeleted = await deleteColumnById(columnId);

      if (isDeleted) {
        const newColumns = get().columns.filter((c) => c.id !== columnId);
        set({ columns: newColumns });
      }
    } catch (error) {
      throw error;
    } finally {
      useLoadingStore.getState().setIsLoading(false);
    }
  },
}));

export default useColumnStore;
