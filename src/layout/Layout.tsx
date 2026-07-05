import { memo, useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import Main from './main/Main';

const SIDEBAR_WIDTH = 300;

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar open={sidebarOpen} width={SIDEBAR_WIDTH} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          ml: sidebarOpen ? { SIDEBAR_WIDTH } : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <Main>{children}</Main>
      </Box>
    </Box>
  );
};

export default memo(Layout);
