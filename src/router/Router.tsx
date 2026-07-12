import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/authPages/HomePage';
import DashboardPage from '../pages/authPages/DashboardPage';
import MyTasksPage from '../pages/authPages/MyTasksPage';
import SavedTasksPage from '../pages/authPages/SavedTasksPage';
import AboutPage from '../pages/authPages/AboutPage';
import BoardPage from '../pages/authPages/BoardPage';
import TaskPage from '../pages/authPages/TaskPage';
import ProtectedRoutes from './ProtectedRoutes';
import useAuthStore from '../store/authStore';
import LoadingPage from '../pages/LoadingPage';
import NotFoundPage from '../pages/NotFoundPage';

const Router = () => {
  const isLoading = useAuthStore((s) => s.isLoading);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.MY_TASKS} element={<MyTasksPage />} />
        <Route path={ROUTES.SAVED_TASKS} element={<SavedTasksPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.BOARD + '/:id'} element={<BoardPage />} />
        <Route path={ROUTES.TASK + '/:id'} element={<TaskPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default memo(Router);
