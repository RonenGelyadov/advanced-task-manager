import { Box, Typography, Avatar, Divider } from '@mui/material';
import { memo } from 'react';
import useAuthStore from '../../store/authStore';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { useTheme } from '../../providers/ProjectThemeProvider';

const HomePage = () => {
  const { isDark } = useTheme();
  const user = useAuthStore((s) => s.user);

  const greeting = () => {
    const hour = new Date().getHours();
    switch (true) {
      case hour < 5:
        return 'Good night';
      case hour < 12:
        return 'Good morning';
      case hour < 18:
        return 'Good afternoon';
      case hour < 22:
        return 'Good evening';
      default:
        return 'Good night';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        gap: 3,
        textAlign: 'center',
        px: 2,
      }}
    >
      {user && (
        <Avatar
          sx={{
            color: 'black',
            width: 200,
            height: 200,
            bgcolor: user.avatarColor,
            fontSize: '5rem',
            fontWeight: 700,
            boxShadow: isDark
              ? '0 8px 32px rgba(99,102,241,0.4)'
              : '0 8px 32px rgba(99,102,241,0.6)',
          }}
        >
          {user.firstName[0]}
          {user.lastName[0]}
        </Avatar>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            mb: 2,
          }}
        >
          <WavingHandIcon sx={{ color: '#f59e0b', fontSize: 50 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {greeting()},{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {user ? user.firstName : 'guest'}
            </Box>
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 18 }}>
          Welcome back to TaskHub. Here's where your work begins.
        </Typography>
      </Box>

      <Divider
        sx={{
          width: 150,
          borderColor: 'rgba(99, 101, 241, 0.6)',
          borderWidth: 2,
          borderRadius: 1,
        }}
      />

      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', fontSize: 14, opacity: 0.85 }}
      >
        Use the sidebar to navigate between your boards, tasks, and more.
      </Typography>
    </Box>
  );
};

export default memo(HomePage);
