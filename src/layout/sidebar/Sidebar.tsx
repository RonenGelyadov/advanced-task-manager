import { Box } from '@mui/material';
import { memo } from 'react';

interface SidebarProps {
  open: boolean;
  width: number;
}

const Sidebar = ({ open, width }: SidebarProps) => {
  return (
    <Box
      component="nav"
      sx={{
        width: open ? width : 0,
        overflowY: 'auto',
        bgcolor: 'primary',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid',
        borderColor: 'divider',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1200,
        boxShadow:
          /*isDark ? '4px 0 24px rgba(0,0,0,0.4)' :*/ '4px 0 24px rgba(0,0,0,0.08)',
      }}
    >
      Sidebar
    </Box>
  );
};

export default memo(Sidebar);
