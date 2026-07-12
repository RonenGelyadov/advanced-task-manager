import { Box, Button, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { memo } from 'react';
import type { FilterMode, Task } from '../types/dataTypes';
import TaskCard from './TaskCard';

interface ColumnProps {
  title: string;
  color: string;
  filter: FilterMode;
  tasks: Task[];
}

const ColumnCard = ({ title, color, filter, tasks }: ColumnProps) => {
  return (
    <Box sx={{ minWidth: '300px', maxWidth: '300px', flexShrink: 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5,
          px: 0.5,
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
              size="small"
              // onClick={() => setAddTaskCol(col.id)}
              sx={{
                p: 0.5,
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <AddIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete column">
            <IconButton
              size="small"
              // onClick={() => deleteColumn(col.id)}
              sx={{
                p: 0.5,
                color: 'text.secondary',
                '&:hover': { color: 'error.main' },
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 3,
            p: 1.5,
            minHeight: 200,
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
                border: '2px dashed rgba(255,255,255,0.05)',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
              >
                {filter !== 'all' ? 'No tasks matching filter' : 'No tasks yet'}
              </Typography>
              {filter === 'all' && (
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  // onClick={() => setAddTaskCol(col.id)}
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  Add task
                </Button>
              )}
            </Box>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ColumnCard);
