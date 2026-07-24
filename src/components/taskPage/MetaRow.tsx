import { Box, Typography } from '@mui/material';
import { memo } from 'react';

interface MetaRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  isDark: boolean;
}

const MetaRow = ({ icon, label, children }: MetaRowProps) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      py: 1.25,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'text.disabled',
        width: 22,
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Typography
      variant="body2"
      sx={{
        color: 'text.secondary',
        fontWeight: 500,
        width: 90,
        flexShrink: 0,
      }}
    >
      {label}
    </Typography>
    <Box sx={{ flex: 1 }}>{children}</Box>
  </Box>
);

export default memo(MetaRow);
