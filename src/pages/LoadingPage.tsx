import { Box, CircularProgress, Typography } from '@mui/material';
import { memo } from 'react';
import { useTheme } from '../providers/ProjectThemeProvider';

const LoadingPage = () => {
  const { isDark } = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        background: isDark
          ? 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 100%)'
          : 'radial-gradient(ellipse at 50% 0%, rgba(150, 150, 255, 0.66) 0%, transparent 70%), linear-gradient(135deg, #ffffff 0%, #beceffff 100%)',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDark
            ? '0 8px 32px rgba(99,102,241,0.4)'
            : '0 8px 32px rgba(99,101,241,0.6)',
          animation: 'pulse-logo 2s ease-in-out infinite',
          '@keyframes pulse-logo': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.06)' },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#fff',
            fontFamily: '"Inter", sans-serif',
            lineHeight: 1,
          }}
        >
          T
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={100}
          thickness={3}
          sx={{ color: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)' }}
        />
        <CircularProgress
          size={100}
          thickness={3}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            circle: {
              stroke: 'url(#spinner-gradient)',
              strokeLinecap: 'round',
            },
          }}
        />
        <svg width={0} height={0} style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          letterSpacing: '0.05em',
          fontFamily: '"Inter", sans-serif',
          animation: 'fade-pulse 2s ease-in-out infinite',
          '@keyframes fade-pulse': {
            '0%, 100%': { opacity: 0.6 },
            '50%': { opacity: 1 },
          },
        }}
      >
        Loading…
      </Typography>
    </Box>
  );
};

export default memo(LoadingPage);
