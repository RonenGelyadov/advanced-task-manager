import { create } from 'zustand';
import type { Board } from '../types/dataTypes';
import { BOARDS } from '../data/mockData';
import { addBoard } from '../services/boardFirebaseService';

interface BoardStore {
  // Data:
  boards: Board[];

  // Actions:
  getBoards: () => void;
  getBoardById: (boardId: string) => Board;
  getBoardTaskCount: () => number;
  addBoard: (board: Omit<Board, 'id'>) => Promise<void>;
  updateBoard: () => Promise<void>;
  deleteBoard: (boardId: string) => Promise<void>;
}

const useBoardStore = create<BoardStore>((set, get) => ({
  // Data:
  boards: BOARDS,

  // Actions:
  getBoards: () => {},

  getBoardById: (id) => {
    const foundBoard = get().boards.find((b) => b.id === id);
    return foundBoard;
  },

  getBoardTaskCount: () => {
    const found = get().boards.length;
    return found;
  },

  addBoard: async (board) => {
    try {
      const newId = await addBoard(board);

      const newBoard: Board = {
        id: newId,
        ...board,
      };

      set((s) => ({ boards: [...s.boards, newBoard] }));
    } catch (error) {
      throw error;
    }
  },

  updateBoard: async () => {},

  deleteBoard: async (boardId) => {},
}));

export default useBoardStore;
