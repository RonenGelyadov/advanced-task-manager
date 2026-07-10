import { create } from 'zustand';
import type { Board } from '../types/dataTypes';
import { BOARDS } from '../data/mockData';

interface BoardStore {
  // Data:
  boards: Board[];

  // Actions:
  getBoards: () => void;
  getBoardById: (boardId: string) => Board;
  getBoardTaskCount: () => number;
  addBoard: (board: Omit<Board, 'id'>) => void;
  updateBoard: () => void;
  deleteBoard: (boardId: string) => void;
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

  addBoard: () => {},

  updateBoard: () => {},

  deleteBoard: () => {},
}));

export default useBoardStore;
