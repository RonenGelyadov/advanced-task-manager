import { Box, Divider, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { memo } from 'react';
import useBoardStore from '../../store/boardStore';
import useTaskStore from '../../store/taskStore';
import useAuthStore from '../../store/authStore';
import TaskListItem from '../../components/TaskListItem';
import { useTheme } from '../../providers/ProjectThemeProvider';

const MyTasksPage = () => {
  const user = useAuthStore((s) => s.user);
  const tasks = useTaskStore((s) => s.tasks);
  const boards = useBoardStore((s) => s.boards);

  const myTasks = tasks.filter((t) => t.assigneeId === user?.id);

  const { isDark } = useTheme();

  // Group by board
  const tasksByBoard = boards
    .map((board) => ({
      board,
      tasks: myTasks.filter((t) => t.boardId === board.id),
    }))
    .filter((b) => b.tasks.length > 0);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <AssignmentIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Tasks
        </Typography>
        <Box
          sx={{
            ml: 1,
            px: 1.5,
            py: 0.25,
            borderRadius: 10,
            bgcolor: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.25)',
          }}
        >
          <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700 }}>
            {myTasks.length} tasks
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        All tasks assigned to you across all boards
      </Typography>

      {myTasks.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <AssignmentIcon sx={{ fontSize: 64, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            No tasks assigned to you
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Tasks assigned to you will appear here
          </Typography>
        </Box>
      ) : (
        tasksByBoard.map(({ board, tasks }) => (
          <Box key={board.id} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Box
                sx={{ width: 10, height: 10, borderRadius: '3px', bgcolor: board.color }}
              />
              <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                {board.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                · {tasks.length} task{tasks.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
            <Divider
              sx={{
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                mb: 1.5,
              }}
            />
            {tasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};

export default memo(MyTasksPage);
