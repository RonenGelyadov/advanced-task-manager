import { Box } from '@mui/material';
import { memo } from 'react';

const Main = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        overflow: 'auto',
        p: 3,
        background: 'transparent',
      }}
    >
      {children}
    </Box>
  );
};

export default memo(Main);
