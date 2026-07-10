import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import AddIcon from '@mui/icons-material/Add';
import { memo, useMemo } from 'react';
import useColumnStore from '../../store/columnStore';
import useTaskStore from '../../store/taskStore';
import useBoardStore from '../../store/boardStore';
import useUserStore from '../../store/userStore';
import Board from '../../components/Board';
import useAuthStore from '../../store/authStore';

const Dashboard = () => {
  const boards = useBoardStore((s) => s.boards);
  const tasks = useTaskStore((s) => s.tasks);
  const columns = useColumnStore((s) => s.columns);
  const usersCount = useUserStore((s) => s.users).length;
  const user = useAuthStore((s) => s.user);

  const DASHBOARD_LABELS = useMemo(
    () => [
      { label: 'Total Boards', value: boards.length, color: '#6366f1' },
      { label: 'Total Tasks', value: tasks.length, color: '#ec4899' },
      { label: 'Team Members', value: usersCount, color: '#10b981' },
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
    [tasks, boards, columns, usersCount],
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
            <GridViewIcon sx={{ color: 'primary.main', fontSize: 35 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Dashboard
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`${boards.length} active boards across your organization`}
          </Typography>
        </Box>
        {user.role === 'admin' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => alert('New Board')}
            sx={{ px: 3 }}
          >
            New Board
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {DASHBOARD_LABELS.map((stat) => (
          <Card
            key={stat.label}
            sx={{ flex: 1, '&:hover': { transform: 'translateY(-2px)' } }}
          >
            <CardContent sx={{ py: 2, px: 2.5 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, color: stat.color, mb: 0.25 }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 500 }}
              >
                {stat.label}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Grid container columns={4} spacing={2.5}>
        {boards.map((b, index) => {
          return (
            <Board
              key={b.id}
              id={b.id}
              title={b.title}
              description={b.description}
              createdAt={b.createdAt}
              color={b.color}
              index={index}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default memo(Dashboard);
