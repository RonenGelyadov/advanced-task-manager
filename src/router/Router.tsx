import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import AboutPage from '../pages/AboutPage';
import BoardPage from '../pages/BoardPage';
import TaskPage from '../pages/TaskPage';
import ProtectedRoutes from './ProtectedRoutes';

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.MY_TASKS} element={<AboutPage />} />
        <Route path={ROUTES.SAVED_TASKS} element={<AboutPage />} />
        <Route path={ROUTES.BOARD + '/:id'} element={<BoardPage />} />
        <Route path={ROUTES.TASK + '/:id'} element={<TaskPage />} />
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Route>
    </Routes>
  );
};

export default memo(Router);
