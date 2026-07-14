import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';
import boardColors from '../data/boardColors';
import type { Board } from '../types/dataTypes';
import { Controller, useForm } from 'react-hook-form';
import useBoardStore from '../store/boardStore';

type boardData = Omit<Board, 'id' | 'createdAt'>;

interface BoardDialogProps {
  open: boolean;
  onClose: () => void;
}

const BoardDialog = ({ open, onClose }: BoardDialogProps) => {
  const [error, setError] = useState('');

  const addBoard = useBoardStore((s) => s.addBoard);

  const { register, handleSubmit, control, reset } = useForm<boardData>({
    defaultValues: {},
  });

  const onSubmit = (data: boardData) => {
    if (!data.color) {
      setError('Color is required');
      return;
    }
    setError('');

    const boardData = {
      ...data,
      createdAt: new Date().toLocaleDateString('heb'),
    };

    addBoard(boardData);
    reset();
    onClose();
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle component="div" sx={{ pb: 1 }}>
        {error && (
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: 700, mb: 2, color: 'error.main' }}
          >
            {error}
          </Typography>
        )}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Create New Board
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
          Set up a new workspace for your team
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <TextField
            {...register('title')}
            label="Board title"
            fullWidth
            placeholder="Board title (e.g. New App Roadmap)"
            autoFocus
            required
          />
          <TextField
            {...register('description')}
            label="Description"
            fullWidth
            multiline
            rows={4}
            placeholder="What is this board for?"
            required
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 1,
                    display: 'block',
                    fontWeight: 600,
                  }}
                >
                  Board color
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {boardColors.map((c) => {
                    const isSelected = field.value === c.color;

                    return (
                      <Box
                        key={c.name}
                        onClick={() => field.onChange(c.color)}
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          bgcolor: c.color,
                          border: isSelected ? '2px solid #fff' : '2px solid transparent',
                          outline: isSelected ? `2px solid ${c.color}` : 'none',
                          outlineOffset: 2,
                          transition: 'all 0.15s',
                          '&:hover': { transform: 'scale(1.15)' },
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Create Board
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(BoardDialog);
