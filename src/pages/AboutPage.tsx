import { Box, Typography, Divider, Stack, Chip } from '@mui/material';
import { memo } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useTheme } from '../providers/ProjectThemeProvider';

const FEATURES = [
  { icon: <DashboardIcon fontSize="small" />, label: 'Board Management' },
  { icon: <PeopleAltIcon fontSize="small" />, label: 'Team Collaboration' },
  { icon: <CheckCircleIcon fontSize="small" />, label: 'Task Tracking' },
  { icon: <BookmarkBorderIcon fontSize="small" />, label: 'Saved Tasks' },
];

const AboutPage = () => {
  const { isDark } = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        gap: 4,
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDark
            ? '0 8px 32px rgba(99,102,241,0.4)'
            : '0 8px 32px rgba(99,102,241,0.6)',
        }}
      >
        <InfoOutlinedIcon sx={{ color: '#fff', fontSize: 60 }} />
      </Box>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
          About{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TaskHub
          </Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', fontSize: 18, maxWidth: 480 }}
        >
          An enterprise-grade project management platform built for modern teams.
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

      <Stack direction="row" spacing={1.5} useFlexGap>
        {FEATURES.map(({ icon, label }) => (
          <Chip
            key={label}
            icon={icon}
            label={label}
            variant="outlined"
            sx={{
              borderColor: 'rgba(99,102,241,0.35)',
              color: 'text.secondary',
              fontSize: '0.85rem',
              '& .MuiChip-icon': { color: '#6366f1' },
            }}
          />
        ))}
      </Stack>

      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', fontSize: 14, opacity: 0.85 }}
      >
        Version 1.0.0 · Built with React, MUI & Firebase
      </Typography>
    </Box>
  );
};

export default memo(AboutPage);
