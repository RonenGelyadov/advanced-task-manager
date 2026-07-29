import { Box } from '@mui/material';
import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Task } from '../types/dataTypes';
import TaskCard from './TaskCard';

const DraggableTaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { type: 'task', task },
  });

  return (
    <Box ref={setNodeRef}>
      <TaskCard
        task={task}
        isDragging={isDragging}
        dragHandleProps={{ ...listeners, ...attributes }}
      />
    </Box>
  );
};

export default memo(DraggableTaskCard);
