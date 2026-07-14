import { memo, useCallback, useEffect, useState, type ReactNode } from 'react';
import { Box } from '@mui/material';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import Main from './main/Main';
import useBoardStore from '../store/boardStore';
import useColumnStore from '../store/columnStore';
import useTaskStore from '../store/taskStore';
import useUserStore from '../store/userStore';
import useLoadingStore from '../store/loadingStore';

const SIDEBAR_WIDTH = 300;

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    JSON.parse(localStorage.getItem('sideOpen') ?? 'true'),
  );

  const fetchBoards = useBoardStore((s) => s.fetchBoards);
  const fetchColumns = useColumnStore((s) => s.fetchColumns);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);
  const fetchUsers = useUserStore((s) => s.fetchUsers);
  const setIsLoading = useLoadingStore((s) => s.setIsLoading);

  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen((prev) => {
      localStorage.setItem('sideOpen', JSON.stringify(!prev));
      return !prev;
    });
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    await fetchUsers();
    await fetchBoards();
    await fetchColumns();
    await fetchTasks();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar open={sidebarOpen} width={SIDEBAR_WIDTH} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          ml: sidebarOpen ? `${SIDEBAR_WIDTH}` : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Navbar onMenuToggle={handleSidebarOpen} />
        <Main>{children}</Main>
      </Box>
    </Box>
  );
};

export default memo(Layout);
