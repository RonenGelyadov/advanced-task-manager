import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GridViewIcon from '@mui/icons-material/GridView';
import type { FilterMode } from '../types/dataTypes';

const FILTERS: { key: FilterMode; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All Tasks', icon: <GridViewIcon sx={{ fontSize: 15 }} /> },
  { key: 'mine', label: 'My Tasks', icon: <PersonIcon sx={{ fontSize: 15 }} /> },
  { key: 'saved', label: 'Saved', icon: <BookmarkIcon sx={{ fontSize: 15 }} /> },
];

export default FILTERS;
