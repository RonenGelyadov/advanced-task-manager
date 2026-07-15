import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { memo, useState } from 'react';
import type { FilterMode, Task } from '../types/dataTypes';
import TaskCard from './TaskCard';
import { useTheme } from '../providers/ProjectThemeProvider';
import useColumnStore from '../store/columnStore';
import TaskDialog from './TaskDialog';

interface ColumnProps {
  id: string;
  boardId: string;
  title: string;
  color: string;
  filter: FilterMode;
  tasks: Task[];
}

const ColumnCard = ({ id, boardId, title, color, filter, tasks }: ColumnProps) => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const deleteColumn = useColumnStore((s) => s.deleteColumn);
  const { isDark } = useTheme();

  return (
    <Box
      sx={{
        minWidth: 400,
        maxWidth: 400,
        minHeight: 250,
        flexShrink: 0,
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        border: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(99,102,241,0.5)',
        borderRadius: 3,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 0.5,
          px: 0.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '3px',
                bgcolor: color,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
              {title}
            </Typography>
            <Chip
              label={tasks.length}
              size="small"
              sx={{
                height: 18,
                minWidth: 24,
                fontSize: '0.65rem',
                fontWeight: 700,
                bgcolor: `${color}22`,
                color: color,
                '& .MuiChip-label': { px: 0.75 },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 0.25 }}>
            <Tooltip title="Add task">
              <IconButton
                size="large"
                onClick={() => setTaskDialogOpen(true)}
                sx={{
                  p: 0.5,
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <AddIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete column">
              <IconButton
                size="large"
                onClick={() => deleteColumn(id)}
                sx={{
                  p: 0.5,
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main' },
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            border: isDark
              ? '1px solid rgba(255,255,255,0.05)'
              : '1px solid rgba(0,0,0,0.05)',
            borderRadius: 3,
            p: 1.5,
            maxHeight: 'calc(100vh - 280px)',
            overflow: 'auto',
          }}
        >
          {tasks.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                gap: 1,
                border: isDark
                  ? '1px dashed rgba(255,255,255,0.1)'
                  : '1px dashed rgba(0,0,0,0.1)',
                borderRadius: 2,
                scrollBehavior: 'smooth',
                scrollbarGutter: 'stable',
                overflow: 'auto',
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
              >
                {filter !== 'all' ? 'No tasks matching filter' : 'No tasks yet'}
              </Typography>
            </Box>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </Box>
      </Box>

      {taskDialogOpen && (
        <TaskDialog
          columnId={id}
          boardId={boardId}
          open={taskDialogOpen}
          onClose={() => setTaskDialogOpen(false)}
        />
      )}
    </Box>
  );
};

export default memo(ColumnCard);
