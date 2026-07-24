import { Divider } from '@mui/material';
import { memo } from 'react';

const MetaDivider = ({ isDark }: { isDark: boolean }) => (
  <Divider
    sx={{
      borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    }}
  />
);

export default memo(MetaDivider);
