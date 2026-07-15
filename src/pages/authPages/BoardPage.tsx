import { Box, Button, Chip, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Board, FilterMode } from '../../types/dataTypes';
import ROUTES from '../../router/routes';
import FILTERS from '../../data/taskFiltersInBoard';
import { useTheme } from '../../providers/ProjectThemeProvider';
import ColumnCard from '../../components/ColumnCard';
import useColumnStore from '../../store/columnStore';
import useBoardStore from '../../store/boardStore';
import useTaskStore from '../../store/taskStore';
import ColumnDialog from '../../components/ColumnDialog';

const BoardPage = () => {
  const [board, setBoard] = useState<Board | null>(null);
  const [filter, setFilter] = useState<FilterMode>('all');
  const [addColDialog, setAddColDialog] = useState(false);

  const columns = useColumnStore((s) => s.columns);
  const tasks = useTaskStore((s) => s.tasks);

  const { id: boardId } = useParams<{ id: string }>();
  const getBoardById = useBoardStore((s) => s.getBoardById);

  const navigate = useNavigate();
  const { isDark } = useTheme();

  const setDialog = useCallback((isOpen: boolean) => {
    setAddColDialog(isOpen);
  }, []);

  const getBoardData = async () => {
    const data = await getBoardById(boardId);
    if (data) setBoard(data);
    else setBoard(null);
  };

  useEffect(() => {
    getBoardData();
    setAddColDialog(false);
  }, [boardId]);

  if (!board) {
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
            Board not found
          </Typography>
          <Button variant="contained" onClick={() => navigate(ROUTES.DASHBOARD)}>
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ mb: 3, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 5 }}>
          <IconButton
            onClick={() => navigate(ROUTES.DASHBOARD)}
            size="small"
            sx={{
              color: 'text.secondary',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
            }}
          >
            <ArrowBackIcon fontSize="medium" />
          </IconButton>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '3px',
              bgcolor: board.color,
              boxShadow: `0 0 12px ${board.color}66`,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {board.title}
          </Typography>
          <Chip
            label={`16 tasks`}
            size="small"
            sx={{
              bgcolor: `${board.color}22`,
              color: board.color,
              border: `1px solid ${board.color}33`,
              fontWeight: 600,
              fontSize: '0.72rem',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon sx={{ fontSize: 20, color: 'text.secondary', mx: 0.5 }} />
          {FILTERS.map((f) => (
            <Button
              key={f.key}
              size="small"
              startIcon={f.icon}
              onClick={() => setFilter(f.key)}
              variant={filter === f.key ? 'contained' : 'text'}
              sx={{
                px: 1.5,
                py: 0.5,
                fontSize: '0.8rem',
                fontWeight: 500,
                ...(filter !== f.key && {
                  color: 'text.secondary',
                  '&:hover': {
                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  },
                }),
              }}
            >
              {f.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          overflow: 'auto',
          flexWrap: 'wrap',
          pb: 2,
          gap: 3,
          justifyContent: '',
          alignItems: 'flex-start',
        }}
      >
        {columns
          .filter((c) => c.boardId === boardId)
          .map((c) => {
            return (
              <ColumnCard
                key={c.id}
                id={c.id}
                boardId={boardId}
                title={c.title}
                color={c.color}
                filter={filter}
                tasks={tasks.filter((t) => t.columnId === c.id)}
              />
            );
          })}

        {
          <ColumnDialog
            boardId={boardId}
            addColDialog={addColDialog}
            setAddColDialog={setDialog}
          />
        }
      </Box>
    </Box>
  );
};

export default memo(BoardPage);
