import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import DashboardPage from '../pages/DashboardPage';
import AboutPage from '../pages/AboutPage';
import BoardPage from '../pages/BoardPage';
import TaskPage from '../pages/TaskPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.BOARD + '/:id'} element={<BoardPage />} />
      <Route path={ROUTES.TASK + '/:id'} element={<TaskPage />} />
    </Routes>
  );
};

export default memo(Router);
