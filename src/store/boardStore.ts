import { create } from 'zustand';
import type { Board } from '../types/dataTypes';
import {
  addBoard,
  deleteBoardById,
  getAllBoards,
  getBoardById,
  updateBoard,
} from '../services/boardFirebaseService';

interface BoardStore {
  // Data:
  boards: Board[];

  // Actions:
  fetchBoards: () => Promise<void>;
  getBoardById: (boardId: string) => Promise<Board>;
  getBoardTaskCount: () => number;
  addBoard: (board: Omit<Board, 'id'>) => Promise<void>;
  updateBoard: (board: Omit<Board, 'createdAt'>) => Promise<void>;
  deleteBoard: (boardId: string) => Promise<void>;
}

const useBoardStore = create<BoardStore>((set, get) => ({
  // Data:
  boards: [],

  // Actions:
  fetchBoards: async () => {
    try {
      const boardsData = await getAllBoards();
      set({ boards: boardsData });
    } catch (error) {
      throw error;
    }
  },

  getBoardById: async (id) => {
    // const foundBoard = get().boards.find((b) => b.id === id);
    const foundBoard = await getBoardById(id);

    return foundBoard;
  },

  getBoardTaskCount: () => {
    const count = get().boards.length;
    return count;
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

  updateBoard: async (board) => {
    try {
      const foundBoard = get().boards.find((b) => b.id === board.id);

      if (foundBoard) {
        const newData = {
          ...foundBoard,
          ...board,
        };

        await updateBoard(newData);

        const newBoards = get().boards.map((b) => (b.id === newData.id ? newData : b));
        set({ boards: newBoards });
      }
    } catch (error) {
      throw error;
    }
  },

  deleteBoard: async (boardId) => {
    try {
      await deleteBoardById(boardId);
    } catch (error) {
      throw error;
    }
  },
}));

export default useBoardStore;
