export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  columnId: string;
  boardId: string;
  title: string;
  description: string;
  assigneeId: string;
  savedBy: string[];
  priority: Priority;
  dueDate?: string;
  createdAt: string;
}

export interface Column {
  id: string;
  boardId: string;
  title: string;
  color: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  color: string;
  memberIds: string[];
  taskCount?: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarColor: string;
  role: 'admin' | 'member';
}
