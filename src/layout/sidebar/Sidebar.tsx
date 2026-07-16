import { Box, Divider, List, Typography } from '@mui/material';
import { memo } from 'react';
import { useTheme } from '../../providers/ProjectThemeProvider';
import NAV_ITEMS from '../../router/navItems/navItemsData';
import MainNavItem from '../../router/navItems/MainNavItem';
import SideBarHeader from './SideBarHeader';
import useBoardStore from '../../store/boardStore';
import BoardNavItem from '../../router/navItems/BoardNavItem';
import useTaskStore from '../../store/taskStore';

interface SidebarProps {
  open: boolean;
  width: number;
}

const Sidebar = ({ open, width }: SidebarProps) => {
  const boards = useBoardStore((state) => state.boards);
  const tasks = useTaskStore((s) => s.tasks);

  const { isDark } = useTheme();

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
        boxShadow: isDark
          ? '4px 0 24px rgba(0,0,0,0.4)'
          : '4px 0 24px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ minWidth: width }}>
        <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 35,
              height: 35,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}
            >
              RG
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              RonenG
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
              Enterprise
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />

        <Box sx={{ px: 1.5, pt: 2 }}>
          <SideBarHeader label="navigation" />
          <List dense sx={{ mt: 0.5 }}>
            {NAV_ITEMS.map((item) => (
              <MainNavItem
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                isDark={isDark}
              />
            ))}
          </List>
        </Box>

        <Divider sx={{ borderColor: 'divider', mx: 2, mt: 2 }} />

        <Box sx={{ px: 1.5, pt: 2, flex: 1, overflow: 'auto' }}>
          <SideBarHeader label="boards" />
          <List dense sx={{ mt: 0.5 }}>
            {boards.map((board) => (
              <BoardNavItem
                key={board.id}
                id={board.id}
                title={board.title}
                description={board.description}
                boardColor={board.color}
                taskCount={tasks.filter((t) => t.boardId === board.id).length}
                isDark={isDark}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Sidebar);
