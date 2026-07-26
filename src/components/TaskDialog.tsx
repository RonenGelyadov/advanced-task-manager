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
import { useShallow } from 'zustand/shallow';

interface TaskDialogProps {
  columnId: string;
  boardId: string;
  open: boolean;
  onClose: () => void;
  initialValues?: Partial<Task>;
  setTaskPage?: (task: Task) => void;
}

const TaskDialog = ({
  columnId,
  boardId,
  open,
  onClose,
  initialValues,
  setTaskPage,
}: TaskDialogProps) => {
  const users = useUserStore((s) => s.users);

  const { tasks, addTask, updateTask } = useTaskStore(
    useShallow((s) => ({
      tasks: s.tasks,
      addTask: s.addTask,
      updateTask: s.updateTask,
    })),
  );

  const { isDark } = useTheme();

  function parseDateString(dateStr: string | undefined): Date {
    if (!dateStr) {
      return new Date();
    }
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day); // בלי +1
  }

  function dateToInputFormat(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const { register, handleSubmit, control, reset } = useForm<Partial<Task>>({
    defaultValues: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
      dueDate: initialValues
        ? dateToInputFormat(parseDateString(initialValues?.dueDate))
        : dateToInputFormat(new Date()),
      priority: initialValues?.priority ?? 'low',
      assigneeId: initialValues?.assigneeId ?? '',
    },
  });

  const onSubmit = async (data: Partial<Task>) => {
    if (!initialValues) {
      const taskData = {
        ...data,
        dueDate: new Date(data.dueDate as string).toLocaleDateString('heb'),
        columnId: columnId,
        boardId: boardId,
        savedBy: [],
        createdAt: new Date().toLocaleDateString('heb'),
      };

      addTask(taskData as Task);
    } else {
      const taskToUpdate = tasks.find((t) => t.id === initialValues.id);
      if (!taskToUpdate) return;

      const updatedTask: Task = {
        ...taskToUpdate,
        ...data,
        dueDate: new Date(data.dueDate as string).toLocaleDateString('heb'),
      };

      await updateTask(updatedTask);
      if (setTaskPage) setTaskPage(updatedTask);
    }

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
