import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { memo } from 'react';
import { useTheme } from '../providers/ProjectThemeProvider';
import { Controller, useForm } from 'react-hook-form';
import type { Task } from '../types/dataTypes';
import useUserStore from '../store/userStore';
import useTaskStore from '../store/taskStore';

interface TaskDialogProps {
  columnId: string;
  boardId: string;
  open: boolean;
  onClose: () => void;
}

const TaskDialog = ({ columnId, boardId, open, onClose }: TaskDialogProps) => {
  const users = useUserStore((s) => s.users);
  const addTask = useTaskStore((s) => s.addTask);

  const { isDark } = useTheme();

  const { register, handleSubmit, control, reset } = useForm<Partial<Task>>(
    /*<Partial<Task>>*/ {
      defaultValues: {
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'low',
        assigneeId: '',
      },
    },
  );

  const onSubmit = async (data: Partial<Task>) => {
    const taskData = {
      ...data,
      dueDate: new Date(data.dueDate).toLocaleDateString('heb'),
      columnId: columnId,
      boardId: boardId,
      savedBy: [],
      createdAt: new Date().toLocaleDateString('heb'),
    };

    addTask(taskData as Task);

    reset();
    onClose();
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
          <TextField {...register('title')} label="Task title" fullWidth />

          <TextField
            {...register('description')}
            label="Description"
            fullWidth
            multiline
            rows={3}
          />

          <TextField {...register('dueDate')} label="Due date" type="date" fullWidth />

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Priority">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="assigneeId"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Assigned To">
                {users.map((u) => (
                  <MenuItem value={u.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                      <Avatar
                        sx={{
                          bgcolor: u.avatarColor,
                          mr: 2,
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'black',
                        }}
                      >
                        {u.firstName[0] + u.lastName[0]}
                      </Avatar>
                      {`${u.firstName} ${u.lastName}`}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
      </DialogContent>

      <Divider
        sx={{
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        }}
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
