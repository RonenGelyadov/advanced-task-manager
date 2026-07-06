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
import useUserStore from '../../store/userStore';

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
  const { isDark, toggleMode } = useTheme();
  const user = useUserStore((s) => s.user);

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
              transition: 'transform 0.3s ease, color 0.2s',
              '&:hover': { transform: 'rotate(20deg)' },
            }}
          >
            {isDark ? (
              <LightModeIcon sx={{ color: 'warning.main' }} fontSize="medium" />
            ) : (
              <DarkModeIcon sx={{ color: 'primary.dark' }} fontSize="medium" />
            )}
          </IconButton>
        </Tooltip>

        <Avatar
          sx={{
            bgcolor: user?.avatarColor || 'primary.main',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'black',
          }}
        >
          {user?.displayName[0] || ''}
        </Avatar>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: 'text.primary', fontSize: '0.8rem' }}
        >
          {user?.displayName || 'user'}
        </Typography>
        <IconButton
          size="small"
          sx={{
            gap: 0.5,
            color: 'error.main',
            mt: 0.5,
            p: 1,
            border: '1px solid',
            borderRadius: 1,
            '&:hover': { bgcolor: 'rgba(255, 17, 0, 0.2)' },
          }}
        >
          <LogoutIcon fontSize="medium" />
          <Typography variant="body2">SIGN OUT</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);
