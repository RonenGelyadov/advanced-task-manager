import { Box, Button, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import AddIcon from '@mui/icons-material/Add';
import { memo, useCallback, useMemo } from 'react';
import useColumnStore from '../store/columnStore';
import useTaskStore from '../store/taskStore';
import useBoardStore from '../store/boardStore';
import useUserStore from '../store/userStore';

const Dashboard = () => {
  const boards = useBoardStore((s) => s.boards);
  const tasks = useTaskStore((s) => s.tasks);
  const columns = useColumnStore((s) => s.columns);
  const usersCount = useUserStore((s) => s.users).length;

  const DASHBOARD_LABELS = useMemo(
    () => [
      { label: 'Total Boards', value: boards.length, color: '#6366f1' },
      { label: 'Total Tasks', value: tasks.length, color: '#ec4899' },
      { label: 'Team Members', value: boards.length, color: '#10b981' },
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

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <GridViewIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Dashboard
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`${boards.length} active boards across your organization`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => alert('New Board')}
          sx={{ px: 3 }}
        >
          New Board
        </Button>
      </Box>
    </Box>
  );
};

export default memo(Dashboard);
