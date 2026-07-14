import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { memo } from 'react';
import { useTheme } from '../providers/ProjectThemeProvider';
import { useForm } from 'react-hook-form';
import type { Task } from '../types/dataTypes';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
}

const TaskDialog = ({ open, onClose }: TaskDialogProps) => {
  const { isDark } = useTheme();

  const { register, handleSubmit, control, reset } = useForm<Partial<Task>>();

  const onSubmit = async (data: Partial<Task>) => {
    console.log(data);
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Edit Task
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Update task details and assignment
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

      <DialogContent sx={{ pt: 2.5 }}>
        <Stack spacing={2.5}>
          <TextField label="Task title" fullWidth />
          <TextField label="Description" fullWidth multiline rows={3} />

          <TextField label="Due date" type="date" fullWidth />
        </Stack>
      </DialogContent>

      <Divider
        sx={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
      />

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(TaskDialog);
