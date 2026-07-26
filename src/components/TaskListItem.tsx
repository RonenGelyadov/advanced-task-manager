import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { memo } from 'react';
import type { Task } from '../types/dataTypes';
import { getDueDateColor, PRIORITY_CONFIG } from '../utils/taskUtils';
import useUserStore from '../store/userStore';
import useBoardStore from '../store/boardStore';
import useColumnStore from '../store/columnStore';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/routes';
import { useTheme } from '../providers/ProjectThemeProvider';

interface TaskListItemProps {
  task: Task;
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  const getUserById = useUserStore((s) => s.getUserbyId);

  const navigate = useNavigate();
  const { isDark } = useTheme();

  const assignee = getUserById(task.assigneeId);
  const priority = PRIORITY_CONFIG[task.priority];
  const board = useBoardStore((s) => s.boards.find((b) => b.id === task.boardId));
  const column = useColumnStore((s) => s.columns.find((c) => c.id === task.columnId));

  const dueDateColor = getDueDateColor(task.dueDate as string);

  return (
    <>
      <Card
        onClick={() => navigate(ROUTES.TASK + '/' + task.id)}
        className="fade-in-up"
        sx={{
          cursor: 'pointer',
          mb: 1,
          '&:hover': { borderColor: 'rgba(99,102,241,0.3)', transform: 'none' },
          '&:hover .row-actions': { opacity: 1 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.5 }}>
          {/* Priority */}
          <Chip
            label={priority.label}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.9rem',
              fontWeight: 700,
              flexShrink: 0,
              color: priority.color,
              bgcolor: priority.bg,
              border: `1px solid ${priority.color}33`,
              '& .MuiChip-label': { px: 0.75 },
            }}
          />

          {/* Title */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              flex: 1,
              fontSize: '1.2rem',
              '&:hover': { color: isDark ? 'primary.light' : 'primary.dark' },
            }}
          >
            {task.title}
          </Typography>

          {/* Board + Column */}
          {board && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
              <Box
                sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: board.color }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                  maxWidth: 120,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {board.title}
              </Typography>
              {column && (
                <>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mx: 1, fontSize: '0.9rem' }}
                  >
                    {'-->'}
                  </Typography>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: column.color,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontSize: '0.9rem' }}
                  >
                    {column.title}
                  </Typography>
                </>
              )}
            </Box>
          )}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0, 0, 0, 0.2)',
            }}
          />

          {/* Due date */}
          {task.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, flexShrink: 0 }}>
              <CalendarTodayIcon sx={{ fontSize: 15, color: dueDateColor }} />
              <Typography
                variant="caption"
                sx={{ color: dueDateColor, fontSize: '0.9rem', fontWeight: 500 }}
              >
                {task.dueDate}
              </Typography>
            </Box>
          )}

          {/* Assignee */}
          {assignee && (
            <Tooltip title={`${assignee.firstName} ${assignee.lastName}`} arrow>
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  bgcolor: assignee.avatarColor,
                  color: 'black',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {assignee.firstName[0] + assignee.lastName[0]}
              </Avatar>
            </Tooltip>
          )}

          {/* Actions */}
          <Box
            className="row-actions"
            onClick={(e) => e.stopPropagation()}
            sx={{
              display: 'flex',
              gap: 0.25,
              opacity: 0,
              transition: 'opacity 0.2s',
              flexShrink: 0,
            }}
          >
            <Tooltip title="Go to board">
              <IconButton
                size="small"
                onClick={() => navigate(ROUTES.BOARD + '/' + task.boardId)}
                sx={{ p: 0.5, color: 'text.secondary' }}
              >
                <OpenInNewIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default memo(TaskListItem);
