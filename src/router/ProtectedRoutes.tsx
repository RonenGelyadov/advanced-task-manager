import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES from './routes';
import useUserStore from '../store/userStore';

const ProtectedRoutes = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default memo(ProtectedRoutes);
