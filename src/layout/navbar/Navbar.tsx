import {
  AppBar,
  Avatar,
  Box,
  Divider,
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
import useUserStore from '../../store/authStore';
import useAuthStore from '../../store/authStore';

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
  const { isDark, toggleMode } = useTheme();
  const user = useUserStore((s) => s.user);
  const logOut = useAuthStore((s) => s.logOut);
  const setIsLoading = useAuthStore((s) => s.setIsLoading);

  const handleSignOut = () => {
    setIsLoading(true);
    logOut();
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <IconButton
          onClick={onMenuToggle}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
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
            <Typography
              sx={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}
            >
              T
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}
          >
            TaskHub
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Tooltip
          title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
        >
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

        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{
            borderColor: isDark
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(0, 0, 0, 0.2)',
          }}
        />

        <Avatar
          sx={{
            bgcolor: user?.avatarColor || 'primary.light',
            fontSize: '1rem',
            fontWeight: 600,
            ml: 1,
            color: 'black',
          }}
        >
          {user.firstName[0] + user.lastName[0]}
        </Avatar>
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.*rem' }}
        >
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <IconButton
          size="small"
          onClick={handleSignOut}
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
