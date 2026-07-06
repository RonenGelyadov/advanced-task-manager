import type { User } from '../types/dataTypes';
import type { Board } from '../types/dataTypes';

export const USERS: User[] = [
  {
    id: 'u1',
    email: 'ronen@taskflow.io',
    displayName: 'Ronen Cohen',
    avatarColor: '#6366f1',
    role: 'admin',
  },
  {
    id: 'u2',
    email: 'michal@taskflow.io',
    displayName: 'Michal Levi',
    avatarColor: '#ec4899',
    role: 'member',
  },
  {
    id: 'u3',
    email: 'avi@taskflow.io',
    displayName: 'Avi Golan',
    avatarColor: '#f59e0b',
    role: 'member',
  },
  {
    id: 'u4',
    email: 'sarah@taskflow.io',
    displayName: 'Sarah Ben-David',
    avatarColor: '#10b981',
    role: 'member',
  },
  {
    id: 'u5',
    email: 'yossi@taskflow.io',
    displayName: 'Yossi Abraham',
    avatarColor: '#3b82f6',
    role: 'member',
  },
];

export const BOARDS: Board[] = [
  {
    id: 'dflkgfue5675e6hhhnadk',
    title: 'Board 1',
    description: 'asd  kldjld AFGGF AasXczFDG xcadadssa',
    color: 'blue',
    memberIds: [],
  },
  {
    id: 'dflkghsdgfsnadk',
    title: 'Board 1',
    description: 'asdk Dldjl dfdbhfbadadssa',
    color: 'yellow',
    memberIds: [],
  },
  {
    id: 'dflkghsfetfernadk',
    title: 'Board 1',
    description: 'asdkldA DGjldadadsdFG DFG FDgsdghsdfhbfgsbhsfgsa',
    color: 'red',
    memberIds: [],
  },
  {
    id: 'dflkgh546grttbhfnadk',
    title: 'Board 1',
    description: 'aDCVasdkld FDGH ldadadsNYJK FJ FGHGSsa',
    color: 'green',
    memberIds: [],
  },
];
