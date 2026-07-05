import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../../providers/ProjectThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { memo } from 'react';

interface NavbarProps {
  onMenuToggle: () => void;
}

const displayName = 'Ronen';

const Navbar = ({ onMenuToggle }: NavbarProps) => {
  const { isDark, toggleMode } = useTheme();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <IconButton onClick={onMenuToggle} size="small" sx={{ color: 'text.secondary' }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>
              T
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}
          >
            Task Manager
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Theme Toggle */}
        <Tooltip title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}>
          <IconButton
            size="medium"
            onClick={toggleMode}
            sx={{
              color: 'text.secondary',
              transition: 'transform 0.3s ease, color 0.2s',
              '&:hover': { transform: 'rotate(20deg)' },
            }}
          >
            {isDark ? (
              <LightModeIcon sx={{ color: 'text.primary' }} fontSize="medium" />
            ) : (
              <DarkModeIcon sx={{ color: 'text.primary' }} fontSize="medium" />
            )}
          </IconButton>
        </Tooltip>

        <Avatar
          sx={{
            width: 28,
            height: 28,
            bgcolor: 'yellow',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'black',
          }}
        >
          {displayName[0]}
        </Avatar>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: 'text.primary', fontSize: '0.8rem' }}
        >
          {displayName}
        </Typography>
        <Tooltip title="Log out">
          <IconButton
            size="small"
            sx={{ gap: 1.5, color: isDark ? 'error.light' : 'error.dark', mt: 0.5 }}
          >
            <LogoutIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);
