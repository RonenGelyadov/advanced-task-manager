import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../providers/ProjectThemeProvider';
import ROUTES from '../../router/routes';
import { PRIORITY_CONFIG } from '../../data/taskUtils';
import type { Task } from '../../types/dataTypes';
import useLoadingStore from '../../store/loadingStore';
import { useShallow } from 'zustand/shallow';
import useTaskStore from '../../store/taskStore';
import useAuthStore from '../../store/authStore';
import useUserStore from '../../store/userStore';
import useBoardStore from '../../store/boardStore';
import useColumnStore from '../../store/columnStore';

const TaskPage = () => {
  const [task, setTask] = useState<Task | null>(null);

  const { getTaskById, toggleSaveTask, deleteTask } = useTaskStore(
    useShallow((s) => ({
      getTaskById: s.getTaskById,
      toggleSaveTask: s.toggleSaveTask,
      deleteTask: s.deleteTask,
    })),
  );

  const user = useAuthStore((s) => s.user);
  const users = useUserStore((s) => s.users);
  const setIsLoading = useLoadingStore((s) => s.setIsLoading);

  const { id } = useParams<{ id: string }>();
  const { isDark } = useTheme();

  const navigate = useNavigate();

  const priorityConfig = task ? PRIORITY_CONFIG[task.priority] : PRIORITY_CONFIG.medium;

  const isSaved = task?.savedBy.includes(user?.id ?? '') ?? false;
  const assignee = users.find((u) => u.id === task?.assigneeId);

  const board = useBoardStore((s) => s.boards.find((b) => b.id === task?.boardId));

  const column = useColumnStore((s) => s.columns.find((c) => c.id === task?.columnId));

  const handleToggleSave = async (taskId: string) => {
    if (!user) return;

    await toggleSaveTask(taskId, user.id);
    const updatedTask = getTaskById(taskId);
    if (updatedTask) setTask(updatedTask);
  };

  const handleDelete = async () => {
    if (!task) return;

    await deleteTask(task.id);
    navigate(ROUTES.BOARD + '/' + task.boardId);
  };

  const getTaskData = () => {
    if (!id) return;

    setIsLoading(true);

    const data = getTaskById(id);
    if (data) setTask(data);
    else setTask(null);

    setIsLoading(false);
  };

  useEffect(() => {
    getTaskData();
  }, []);

  if (!task) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Task not found
          </Typography>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              gap: 1,
              px: 2,
              py: 0.75,
            }}
          >
            <ArrowBackIcon fontSize="small" />
            <Typography variant="body2">Go back</Typography>
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 780, mx: 'auto', p: { xs: 2, md: 4 } }}>
      {/* ── Back button ────────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <IconButton
          onClick={() => navigate(ROUTES.BOARD + '/' + task.boardId)}
          size="small"
          sx={{
            color: 'text.secondary',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
            borderRadius: 2,
            gap: 0.75,
            px: 1.5,
            py: 0.75,
            '&:hover': {
              color: 'text.primary',
              borderColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.2)',
            },
          }}
        >
          <ArrowBackIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Back to board
          </Typography>
        </IconButton>
      </Box>

      {/* ── Header card ────────────────────────────────────── */}
      <Box
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
          bgcolor: 'background.paper',
          overflow: 'hidden',
          mb: 3,
        }}
      >
        {/* Coloured top strip */}
        <Box
          sx={{
            height: 4,
            background: `linear-gradient(90deg, ${priorityConfig.color}, ${priorityConfig.color}44)`,
          }}
        />

        <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
          {/* Priority chip + action buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlagOutlinedIcon sx={{ fontSize: 16, color: priorityConfig.color }} />
              <Chip
                label={priorityConfig.label}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: priorityConfig.color,
                  bgcolor: priorityConfig.bg,
                  border: `1px solid ${priorityConfig.color}33`,
                }}
              />
            </Box>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title={isSaved ? 'Remove from saved' : 'Save task'}>
                <IconButton
                  size="small"
                  onClick={() => task && handleToggleSave(task.id)}
                  sx={{
                    color: isSaved ? '#f59e0b' : 'text.secondary',
                    '&:hover': { color: '#f59e0b' },
                  }}
                >
                  {isSaved ? (
                    <BookmarkIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <BookmarkBorderIcon sx={{ fontSize: 20 }} />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit task">
                <IconButton
                  size="small"
                  //onClick={handleEdit}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  <EditIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Move to column">
                <IconButton
                  size="small"
                  //onClick={handleMoveColumn}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'info.main' },
                  }}
                >
                  <SwapHorizIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete task">
                <IconButton
                  size="small"
                  onClick={handleDelete}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'error.main' },
                  }}
                >
                  <DeleteOutlinedIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Title */}
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.35, mb: 1.5 }}>
            {task.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
            }}
          >
            {task.description || 'No description provided.'}
          </Typography>
        </Box>
      </Box>

      {/* ── Metadata card ──────────────────────────────────── */}
      <Box
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
          bgcolor: 'background.paper',
          p: { xs: 2.5, md: 3 },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: 'text.disabled',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'block',
            mb: 2,
          }}
        >
          Details
        </Typography>

        {/* Assignee */}
        <MetaRow
          icon={<PersonOutlinedIcon sx={{ fontSize: 18 }} />}
          label="Assignee"
          isDark={isDark}
        >
          {assignee ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: assignee.avatarColor,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'black',
                }}
              >
                {assignee.firstName[0] + assignee.lastName[0]}
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {assignee.firstName} {assignee.lastName}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              Unassigned
            </Typography>
          )}
        </MetaRow>

        <MetaDivider isDark={isDark} />

        {/* Board */}
        <MetaRow
          icon={<DashboardCustomizeOutlinedIcon sx={{ fontSize: 18 }} />}
          label="Board"
          isDark={isDark}
        >
          {board ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '3px',
                  bgcolor: board.color,
                  boxShadow: `0 0 8px ${board.color}66`,
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {board.title}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              —
            </Typography>
          )}
        </MetaRow>

        <MetaDivider isDark={isDark} />

        {/* Column */}
        <MetaRow
          icon={<ViewColumnOutlinedIcon sx={{ fontSize: 18 }} />}
          label="Column"
          isDark={isDark}
        >
          {column ? (
            <Chip
              label={column.title}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.72rem',
                fontWeight: 600,
                color: column.color,
                bgcolor: `${column.color}18`,
                border: `1px solid ${column.color}33`,
              }}
            />
          ) : (
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              —
            </Typography>
          )}
        </MetaRow>

        <MetaDivider isDark={isDark} />

        {/* Due date */}
        <MetaRow
          icon={<CalendarTodayIcon sx={{ fontSize: 17 }} />}
          label="Due Date"
          isDark={isDark}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {task.dueDate ?? '—'}
          </Typography>
        </MetaRow>

        <MetaDivider isDark={isDark} />

        {/* Created at */}
        <MetaRow
          icon={<AccessTimeIcon sx={{ fontSize: 18 }} />}
          label="Created"
          isDark={isDark}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {task.createdAt}
          </Typography>
        </MetaRow>
      </Box>
    </Box>
  );
};

/* ─────────────────────────────────────────────────────────────
   Small helpers (defined in same file to keep it self-contained)
───────────────────────────────────────────────────────────── */

interface MetaRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  isDark: boolean;
}

const MetaRow = ({ icon, label, children }: MetaRowProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      py: 1.25,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'text.disabled',
        width: 22,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Typography
      variant="body2"
      sx={{
        color: 'text.secondary',
        fontWeight: 500,
        width: 90,
        flexShrink: 0,
      }}
    >
      {label}
    </Typography>
    <Box sx={{ flex: 1 }}>{children}</Box>
  </Box>
);

const MetaDivider = ({ isDark }: { isDark: boolean }) => (
  <Divider
    sx={{
      borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    }}
  />
);

export default memo(TaskPage);
