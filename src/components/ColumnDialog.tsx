import { Box, Button, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import columnColors from '../data/columnColors';
import { useTheme } from '../providers/ProjectThemeProvider';
import type { Column } from '../types/dataTypes';
import useColumnStore from '../store/columnStore';

interface ColumnDialogProps {
  boardId: string;
  addColDialog: boolean;
  setAddColDialog: (isOpen: boolean) => void;
}

const ColumnDialog = ({ boardId, addColDialog, setAddColDialog }: ColumnDialogProps) => {
  const { isDark } = useTheme();

  const addColumn = useColumnStore((s) => s.addColumn);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: '',
      color: columnColors[0].color,
    },
  });

  const handleAddColumn = (data: Omit<Column, 'id' | 'boardId'>) => {
    const columnData = {
      ...data,
      boardId: boardId,
    };

    addColumn(columnData);

    reset();
    setAddColDialog(false);
  };

  return (
    <Box sx={{ minWidth: 400, maxWidth: 400, flexShrink: 0 }}>
      {addColDialog ? (
        <Box
          component="form"
          onSubmit={handleSubmit(handleAddColumn)}
          sx={{
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            border: isDark
              ? '1px solid rgba(15, 15, 16, 0.3)'
              : '1px solid rgba(99,102,241,0.8)',
            borderRadius: 3,
            p: 4,
          }}
        >
          <TextField
            {...register('title')}
            autoFocus
            fullWidth
            size="small"
            placeholder="Column name..."
            required
            sx={{ mb: 1.5 }}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mb: 4,
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  variant="button"
                  sx={{
                    color: 'text.secondary',
                    mb: 1,
                    display: 'block',
                    fontWeight: 600,
                  }}
                >
                  Column color
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {columnColors.map((c) => {
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
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              startIcon={<CheckIcon />}
            >
              Add
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => setAddColDialog(false)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => setAddColDialog(true)}
          sx={{
            py: 1.5,
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500,
            border: isDark
              ? '2px dashed rgba(255,255,255,0.1)'
              : '2px dashed rgba(0,0,0,0.1)',
            borderRadius: 3,
            '&:hover': {
              border: '2px dashed rgba(99,102,241,0.4)',
              color: isDark ? 'primary.light' : 'primary.dark',
              background: 'rgba(99,102,241,0.1)',
            },
          }}
        >
          Add Column
        </Button>
      )}
    </Box>
  );
};

export default memo(ColumnDialog);
