import type { User } from '../types/dataTypes';
import type { Board } from '../types/dataTypes';

export const USERS: User[] = [
  {
    id: 'u1',
    email: 'ronen@taskflow.io',
    firstName: 'Ronen',
    lastName: 'Cohen',
    avatarColor: '#6366f1',
    role: 'admin',
  },
  {
    id: 'u2',
    email: 'michal@taskflow.io',
    firstName: 'Michal',
    lastName: 'Levi',
    avatarColor: '#ec4899',
    role: 'member',
  },
  {
    id: 'u3',
    email: 'avi@taskflow.io',
    firstName: 'Avi',
    lastName: 'Golan',
    avatarColor: '#f59e0b',
    role: 'member',
  },
  {
    id: 'u4',
    email: 'sarah@taskflow.io',
    firstName: 'Sarah',
    lastName: 'Ben-David',
    avatarColor: '#10b981',
    role: 'member',
  },
  {
    id: 'u5',
    email: 'yossi@taskflow.io',
    firstName: 'Yossi',
    lastName: 'Abraham',
    avatarColor: '#3b82f6',
    role: 'member',
  },
];

export const BOARDS: Board[] = [
  {
    id: 'board-crypto-wallet-2026',
    title: 'Crypto Wallet App',
    description:
      'Development roadmap, UI/UX designs, and smart contract integration tasks.',
    color: '#4A7BB0',
    createdAt: '2026-06-20',
  },
  {
    id: 'board-marketing-q3',
    title: 'Q3 Marketing Campaign',
    description:
      'Social media schedule, content creation, and influencer outreach tracking.',
    color: '#D99426',
    createdAt: '2026-03-18',
  },
  {
    id: 'board-bug-tracker',
    title: 'Critical Bug Tracker',
    description: 'High-priority production bugs, hotfixes, and QA verification pipeline.',
    color: '#CE5A5A',
    createdAt: '2025-11-02',
  },
  {
    id: 'board-personal-goals',
    title: 'Personal Learning & Growth',
    description: 'Books to read, Next.js tutorials to watch, and side project ideas.',
    color: '#4E9F75',
    createdAt: '2026-04-21',
  },
];
