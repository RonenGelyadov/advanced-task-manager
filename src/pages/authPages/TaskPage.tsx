import { memo } from 'react';
import { useParams } from 'react-router-dom';

const TaskPage = () => {
  const { id } = useParams();

  return <div>TaskPage</div>;
};

export default memo(TaskPage);
