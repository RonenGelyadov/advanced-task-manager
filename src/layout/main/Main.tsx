import { Box } from '@mui/material';
import { memo, type ReactNode } from 'react';
import useLoadingStore from '../../store/loadingStore';
import LoadingPage from '../../pages/LoadingPage';

const Main = ({ children }: { children: ReactNode }) => {
  const isLoading = useLoadingStore((s) => s.isLoading);

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
      {isLoading ? <LoadingPage /> : children}
    </Box>
  );
};

export default memo(Main);
