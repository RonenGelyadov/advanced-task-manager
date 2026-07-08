import { useMemo } from 'react';
import useColumnStore from '../store/columnStore';
import useTaskStore from '../store/taskStore';

const tasks = useTaskStore((s) => s.tasks);
const columns = useColumnStore((s) => s.columns);

const DASHBOARD_LABELS = useMemo(
  () => [
    { label: 'Total Boards', value: 4, color: '#6366f1' },
    { label: 'Total Tasks', value: 15, color: '#ec4899' },
    { label: 'Team Members', value: 5, color: '#10b981' },
    {
      label: 'Completed',
      value: `${
        tasks.filter((t) => {
          const c = columns.find((c) => c.id === t.columnId);
          return c?.title === 'Done' || c?.title === 'Resolved';
        }).length
      }`,
      color: '#f59e0b',
    },
  ],
  [tasks, columns],
);

export default DASHBOARD_LABELS;
