import { Typography } from '@mui/material';
import { memo } from 'react';

interface SideBarHeader {
  label: string;
}

const SideBarHeader = ({ label }: SideBarHeader) => {
  return (
    <Typography
      variant="caption"
      sx={{
        color: 'text.secondary',
        fontWeight: 600,
        px: 1,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontSize: '0.65rem',
      }}
    >
      {label}
    </Typography>
  );
};

export default memo(SideBarHeader);
