export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Role = 'admin' | 'member';

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
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarColor: string;
  role: Role;
}
