import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { memo, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: ReactElement;
  isDark: boolean;
}

const MainNavItem = ({ path, label, icon, isDark }: NavItem) => {
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  return (
    <ListItem disablePadding sx={{ mb: 0.5 }}>
      <ListItemButton
        onClick={() => navigate(path)}
        sx={{
          borderRadius: 2,
          px: 1.5,
          py: 1,
          background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
          border: isActive ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
          '&:hover': {
            background: isActive
              ? 'rgba(99,102,241,0.2)'
              : isDark
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(0,0,0,0.04)',
          },
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              minWidth: 32,
              color: isActive
                ? isDark
                  ? 'primary.light'
                  : 'primary.dark'
                : 'text.secondary',
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={label}
          sx={{
            fontSize: '1rem',
            fontWeight: isActive ? 800 : 400,
            color: isActive
              ? isDark
                ? 'primary.light'
                : 'primary.dark'
              : 'text.secondary',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default memo(MainNavItem);
