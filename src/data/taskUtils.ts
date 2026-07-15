import { isPast, isToday } from 'date-fns';

export const PRIORITY_CONFIG = {
  low: { label: 'Low', color: '#64748b', bg: 'rgba(100,116,139,0.15)' },
  medium: { label: 'Medium', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  high: { label: 'High', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
  critical: { label: 'Critical', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
};

export const getPriorityColor = (date: string): string => {
  if (!date) return '#64748b';
  else {
    const [day, month, year] = date.split('.').map(Number);
    const dateObj = new Date(year, month - 1, day);

    return isToday(new Date(dateObj))
      ? '#f59e0b'
      : isPast(new Date(dateObj))
        ? '#ef4444'
        : '#64748b';
  }
};
