import { create } from 'zustand';
import type { Column } from '../types/dataTypes';

interface ColumnStore {
  // Data:
  columns: Column[];

  // Actions:
  getColumns: () => void;
  getColumnById: () => void;
  getColumnsByBoardId: (boardId: string) => Column[];
  addColumn: () => void;
  updateColumn: () => void;
  deleteColumn: () => void;
}

const useColumnStore = create<ColumnStore>(() => ({
  // Data:
  columns: [],

  // Actions:
  getColumns: () => {},

  getColumnById: () => {},

  getColumnsByBoardId: (boardId) => {
    const foundColumns: Column[] = useColumnStore
      .getState()
      .columns.filter((c) => c.boardId === boardId);

    return foundColumns;
  },

  addColumn: () => {},

  updateColumn: () => {},

  deleteColumn: () => {},
}));

export default useColumnStore;
