import { memo } from 'react';
import type { Task } from '../types/dataTypes';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return <>TaskCard</>;
};

export default memo(TaskCard);
