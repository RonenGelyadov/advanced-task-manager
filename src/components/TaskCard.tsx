import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { memo, useState } from 'react';
import type { Task } from '../types/dataTypes';
import useUserStore from '../store/userStore';
import useAuthStore from '../store/authStore';
import useColumnStore from '../store/columnStore';
import { useShallow } from 'zustand/shallow';
import { getPriorityColor, PRIORITY_CONFIG } from '../data/taskUtils';
import { useTheme } from '../providers/ProjectThemeProvider';
import useTaskStore from '../store/taskStore';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/routes';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({
  task: {
    id,
    assigneeId,
    boardId,
    columnId,
    priority,
    dueDate,
    savedBy,
    title,
    description,
  },
}: TaskCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [moveAnchor, setMoveAnchor] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { isDark } = useTheme();

  const currentUser = useAuthStore((s) => s.user);
  const assignee = useUserStore((s) =>
    s.users.find((u) => u.id === assigneeId),
  );
  const boardCols = useColumnStore(
    useShallow((s) => s.getColumnsByBoardId(boardId)),
  );

  const { deleteTask, toggleSaveTask } = useTaskStore(
    useShallow((s) => ({
      toggleSaveTask: s.toggleSaveTask,
      deleteTask: s.deleteTask,
    })),
  );

  const isSaved = savedBy.includes(useAuthStore((s) => s.user.id));
  const taskPriority = PRIORITY_CONFIG[priority];
  const dueDateColor = getPriorityColor(dueDate);

  return (
    <>
      <Card
        onClick={() => navigate(`${ROUTES.TASK}/${id}`)}
        elevation={2}
        className="fade-in-up"
        sx={{
          mb: 1.5,
          cursor: 'pointer',
          position: 'relative',
          '&:hover': {
            borderColor: 'rgba(99,102,241,0.3)',
            transform: 'translateY(-1px)',
          },
          '&:hover .task-actions': { opacity: 1 },
          bgcolor: isDark ? 'background.paper' : 'background.default',
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
              sx={{
                display: 'flex',
                gap: 0.25,
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Tooltip title={isSaved ? 'Remove from saved' : 'Save task'}>
                <IconButton
                  size="small"
                  onClick={() => toggleSaveTask(id, currentUser.id)}
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
                onClick={(e) => setMenuAnchor(e.currentTarget)}
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
              <Tooltip
                title={`${assignee.firstName} ${assignee.lastName}`}
                arrow
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Avatar
                    sx={{
                      width: 22,
                      height: 22,
                      bgcolor: assignee.avatarColor,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: 'black',
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
                  sx={{
                    color: dueDateColor,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                  }}
                >
                  {dueDate}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            //setEditOpen(true);
            setMenuAnchor(null);
          }}
          sx={{ gap: 1.5, fontSize: '0.85rem' }}
        >
          <EditIcon fontSize="small" sx={{ color: 'text.secondary' }} /> Edit
          task
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setMoveAnchor(e.currentTarget);
            setMenuAnchor(null);
          }}
          sx={{ gap: 1.5, fontSize: '0.85rem' }}
        >
          <SwapHorizIcon fontSize="small" sx={{ color: 'text.secondary' }} />{' '}
          Move to column
        </MenuItem>
        <Divider
          sx={{
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          }}
        />
        <MenuItem
          onClick={() => {
            deleteTask(id);
            setMenuAnchor(null);
          }}
          sx={{ gap: 1.5, fontSize: '0.85rem', color: 'error.main' }}
        >
          <DeleteIcon fontSize="small" /> Delete task
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={moveAnchor}
        open={Boolean(moveAnchor)}
        onClose={() => setMoveAnchor(null)}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            px: 2,
            py: 1,
            display: 'block',
            fontWeight: 600,
          }}
        >
          Move to column
        </Typography>
        <Divider
          sx={{
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          }}
        />
        {boardCols
          .filter((c) => c.id !== columnId)
          .map((col) => (
            <MenuItem
              key={col.id}
              onClick={() => {
                //moveTask(task.id, col.id);
                setMoveAnchor(null);
              }}
              sx={{ gap: 1.5, fontSize: '0.85rem' }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: col.color,
                }}
              />
              {col.title}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default memo(TaskCard);
