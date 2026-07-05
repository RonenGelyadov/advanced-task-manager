import {
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes';

interface BoardNavItemProps {
  id: string;
  title: string;
  description: string;
  boardColor: string;
  taskCount: number;
  isDark: boolean;
}

const BoardNavItem = ({
  id,
  title,
  description,
  boardColor,
  taskCount,
  isDark,
}: BoardNavItemProps) => {
  const navigate = useNavigate();
  const active = location.pathname === ROUTES.BOARD + `/${id}`;

  return (
    <ListItem key={id} disablePadding sx={{ mb: 0.5 }}>
      <Tooltip title={description} placement="right" arrow>
        <ListItemButton
          onClick={() => navigate(`/boards/${id}`)}
          sx={{
            borderRadius: 2,
            px: 1.5,
            py: 0.75,
            background: active ? 'rgba(99,102,241,0.1)' : 'transparent',
            border: active ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
            '&:hover': {
              background: active
                ? 'rgba(99,102,241,0.15)'
                : isDark
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(0,0,0,0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 28 }}>
            <FiberManualRecordIcon sx={{ fontSize: '0.8rem', color: boardColor }} />
          </ListItemIcon>
          <ListItemText
            primary={title}
            sx={{
              fontSize: '0.82rem',
              fontWeight: active ? 600 : 400,
              color: active ? 'primary.light' : 'text.secondary',
              noWrap: 'true',
            }}
          />
          <Chip
            label={taskCount}
            size="small"
            sx={{
              height: 18,
              fontSize: '0.65rem',
              fontWeight: 600,
              bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
              color: 'text.secondary',
              '& .MuiChip-label': { px: 0.75 },
            }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default memo(BoardNavItem);
