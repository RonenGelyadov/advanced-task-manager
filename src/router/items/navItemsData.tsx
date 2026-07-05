import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ROUTES from '../routes';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon fontSize="small" />,
    path: ROUTES.DASHBOARD,
  },
  { label: 'My Tasks', icon: <AssignmentIcon fontSize="small" />, path: ROUTES.MY_TASKS },
  {
    label: 'Saved Tasks',
    icon: <BookmarkIcon fontSize="small" />,
    path: ROUTES.SAVED_TASKS,
  },
];

export default NAV_ITEMS;
