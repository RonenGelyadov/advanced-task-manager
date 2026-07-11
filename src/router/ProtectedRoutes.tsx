import { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES from './routes';
import useUserStore from '../store/authStore';
import Layout from '../layout/Layout';

const ProtectedRoutes = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default memo(ProtectedRoutes);
