import { memo } from 'react';
import type { Task } from '../types/dataTypes';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { isPast, isToday } from 'date-fns';
import useUserStore from '../store/userStore';
import useAuthStore from '../store/authStore';

const PRIORITY_CONFIG = {
  low: { label: 'Low', color: '#64748b', bg: 'rgba(100,116,139,0.15)' },
  medium: { label: 'Medium', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  high: { label: 'High', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
  critical: { label: 'Critical', color: '#ec4899', bg: 'rgba(236,72,153,0.15)' },
};

const getPriorityColor = (date: string): string => {
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

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({
  task: { assigneeId, priority, dueDate, savedBy, title, description },
}: TaskCardProps) => {
  const assignee = useUserStore((s) => s.users.find((u) => u.id === assigneeId));
  const isSaved = savedBy.includes(useAuthStore((s) => s.user.id));
  const taskPriority = PRIORITY_CONFIG[priority];

  const dueDateColor = getPriorityColor(dueDate);

  return (
    <Card
      className="fade-in-up"
      sx={{
        mb: 1.5,
        cursor: 'pointer',
        position: 'relative',
        '&:hover': { borderColor: 'rgba(99,102,241,0.3)', transform: 'translateY(-1px)' },
        '&:hover .task-actions': { opacity: 1 },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* Priority + Actions row */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.25,
          }}
        >
          <Chip
            label={taskPriority.label}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              color: taskPriority.color,
              bgcolor: taskPriority.bg,
              border: `1px solid ${taskPriority.color}33`,
            }}
          />
          <Box
            className="task-actions"
            sx={{ display: 'flex', gap: 0.25, opacity: 1, transition: 'opacity 0.2s' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Tooltip title={isSaved ? 'Remove from saved' : 'Save task'}>
              <IconButton
                size="small"
                //onClick={() => toggleSaveTask(task.id, currentUser.id)}
                sx={{ p: 0.5, color: isSaved ? '#f59e0b' : 'text.secondary' }}
              >
                {isSaved ? (
                  <BookmarkIcon sx={{ fontSize: 20 }} />
                ) : (
                  <BookmarkBorderIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </Tooltip>
            <IconButton
              size="small"
              //onClick={(e) => setMenuAnchor(e.currentTarget)}
              sx={{ p: 0.5, color: 'text.secondary' }}
            >
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '0.875rem',
            mb: 0.75,
            lineHeight: 1.4,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        {description && (
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              display: 'block',
              mb: 1.25,
              lineHeight: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        )}

        {/* Footer: assignee + due date */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 0.5,
          }}
        >
          {assignee ? (
            <Tooltip title={`${assignee.firstName} ${assignee.lastName}`} arrow>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Avatar
                  sx={{
                    width: 22,
                    height: 22,
                    bgcolor: assignee.avatarColor,
                    fontSize: '0.6rem',
                    fontWeight: 700,
                  }}
                >
                  {assignee.firstName[0] + assignee.lastName[0]}
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontSize: '0.72rem' }}
                >
                  {assignee.firstName}
                </Typography>
              </Box>
            </Tooltip>
          ) : (
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontSize: '0.72rem' }}
            >
              Unassigned
            </Typography>
          )}

          {dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <CalendarTodayIcon sx={{ fontSize: 11, color: dueDateColor }} />
              <Typography
                variant="caption"
                sx={{ color: dueDateColor, fontSize: '0.7rem', fontWeight: 500 }}
              >
                {dueDate}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(TaskCard);
