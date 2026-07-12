import { memo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../providers/ProjectThemeProvider';
import ROUTES from '../router/routes';

const NotFoundPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        background: isDark
          ? 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 100%)'
          : 'radial-gradient(ellipse at 50% 0%, rgba(150, 150, 255, 0.66) 0%, transparent 70%), linear-gradient(135deg, #ffffff 0%, #beceffff 100%)',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Box sx={{ position: 'relative', lineHeight: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: '8rem', sm: '12rem', md: '16rem' },
            fontWeight: 900,
            fontFamily: '"Inter", sans-serif',
            lineHeight: 1,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: isDark
              ? 'drop-shadow(0 0 60px rgba(99,102,241,0.35))'
              : 'drop-shadow(0 0 40px rgba(99,102,241,0.25))',
            animation: 'float 4s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-12px)' },
            },
            userSelect: 'none',
          }}
        >
          404
        </Typography>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 200, sm: 320, md: 440 },
            height: { xs: 200, sm: 320, md: 440 },
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      </Box>

      <Box sx={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontFamily: '"Inter", sans-serif',
            color: isDark ? 'rgba(255,255,255,0.92)' : 'rgba(15,15,30,0.9)',
            letterSpacing: '-0.02em',
          }}
        >
          Page not found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(15,15,30,0.5)',
            fontFamily: '"Inter", sans-serif',
            lineHeight: 1.7,
          }}
        >
          The URL you visited doesn't match any existing route.
          <br />
          It may have been moved, deleted, or never existed.
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={() => navigate(ROUTES.HOME)}
        sx={{
          mt: 1,
          px: 4,
          py: 1.5,
          borderRadius: '12px',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: '0.95rem',
          textTransform: 'none',
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          boxShadow: isDark
            ? '0 8px 32px rgba(99,102,241,0.4)'
            : '0 8px 32px rgba(99,102,241,0.3)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #5254cc, #d63d88)',
            transform: 'translateY(-2px)',
            boxShadow: isDark
              ? '0 12px 40px rgba(99,102,241,0.55)'
              : '0 12px 40px rgba(99,102,241,0.45)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default memo(NotFoundPage);
