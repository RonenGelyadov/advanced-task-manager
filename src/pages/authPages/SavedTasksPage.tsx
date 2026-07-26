import { Box, Divider, Typography } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { memo } from 'react';
import TaskListItem from '../../components/TaskListItem';
import useBoardStore from '../../store/boardStore';
import useTaskStore from '../../store/taskStore';
import useAuthStore from '../../store/authStore';
import { useTheme } from '../../providers/ProjectThemeProvider';

const SavedTasksPage = () => {
  const user = useAuthStore((s) => s.user);
  const tasks = useTaskStore((s) => s.tasks);
  const boards = useBoardStore((s) => s.boards);

  const savedTasks = tasks.filter((t) => t.savedBy.includes(user?.id as string));

  const { isDark } = useTheme();

  const tasksByBoard = boards
    .map((board) => ({
      board,
      tasks: savedTasks.filter((t) => t.boardId === board.id),
    }))
    .filter((g) => g.tasks.length > 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <BookmarkIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Saved Tasks
        </Typography>
        <Box
          sx={{
            ml: 1,
            px: 1.5,
            py: 0.25,
            borderRadius: 10,
            bgcolor: 'rgba(245,158,11,0.15)',
            border: '1px solid rgba(245,158,11,0.25)',
          }}
        >
          <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700 }}>
            {savedTasks.length} saved
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        Tasks you've bookmarked for quick access
      </Typography>

      {savedTasks.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <BookmarkIcon sx={{ fontSize: 64, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            No saved tasks yet
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Click the bookmark icon on any task to save it here
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
                · {tasks.length} saved
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

export default memo(SavedTasksPage);
