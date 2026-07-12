import { Box, Button, Chip, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Board, FilterMode } from '../../types/dataTypes';
import ROUTES from '../../router/routes';
import FILTERS from '../../data/taskFiltersInBoard';
import { useTheme } from '../../providers/ProjectThemeProvider';
import Column from '../../components/Column';
import useColumnStore from '../../store/columnStore';
import useBoardStore from '../../store/boardStore';
import useTaskStore from '../../store/taskStore';

const BoardPage = () => {
  const [board, setBoard] = useState<Board | null>(null);
  const [filter, setFilter] = useState<FilterMode>('all');
  const [addColDialog, setAddColDialog] = useState(false);
  const [newColName, setNewColName] = useState('');

  const { id: boardId } = useParams<{ id: string }>();
  const getBoardById = useBoardStore((s) => s.getBoardById);
  const getTasksByColumnId = useTaskStore((s) => s.getTasksByColumnId);
  const getColumnsByBoardId = useColumnStore((s) => s.getColumnsByBoardId);
  const addColumn = useColumnStore((s) => s.addColumn);

  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleAddColumn = () => {};

  const getBoardData = async () => {
    const data = await getBoardById(boardId);
    if (data) setBoard(data);
    else setBoard(null);
  };

  useEffect(() => {
    getBoardData();
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <IconButton
            onClick={() => navigate(ROUTES.DASHBOARD)}
            size="small"
            sx={{
              color: 'text.secondary',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
            }}
          >
            <ArrowBackIcon fontSize="small" />
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
          flex: 1,
          overflow: 'auto',
          pb: 2,
          gap: '16px',
          paddingBottom: '16px',
          alignItems: 'flex-start',
        }}
      >
        {getColumnsByBoardId(boardId).map((c) => {
          return (
            <Column
              key={c.id}
              title={c.title}
              color={c.color}
              filter={filter}
              tasks={getTasksByColumnId(c.id)}
            />
          );
        })}

        <Box sx={{ minWidth: 500, flexShrink: 0 }}>
          {addColDialog ? (
            <Box
              sx={{
                background: 'rgba(255,255,255,0.03)',
                border: isDark
                  ? '1px solid rgba(99,102,241,0.3)'
                  : '1px solid rgba(99,102,241,0.3)',
                borderRadius: 3,
                p: 4,
              }}
            >
              <TextField
                autoFocus
                fullWidth
                size="small"
                placeholder="Column name..."
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                // onKeyDown={(e) => {
                //   if (e.key === 'Enter') handleAddColumn();
                //   if (e.key === 'Escape') setAddingCol(false);
                // }}
                sx={{ mb: 1.5 }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<CheckIcon />}
                  //onClick={handleAddColumn}
                  disabled={!newColName.trim()}
                >
                  Add
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setAddColDialog(false)}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Button
              fullWidth
              startIcon={<AddIcon />}
              onClick={() => setAddColDialog(true)}
              sx={{
                py: 1.5,
                color: 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: isDark
                  ? '2px dashed rgba(255,255,255,0.1)'
                  : '2px dashed rgba(0,0,0,0.1)',
                borderRadius: 3,
                '&:hover': {
                  border: '2px dashed rgba(99,102,241,0.4)',
                  color: isDark ? 'primary.light' : 'primary.dark',
                  background: 'rgba(99,102,241,0.1)',
                },
              }}
            >
              Add Column
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(BoardPage);
