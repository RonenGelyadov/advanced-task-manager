import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { memo, useEffect, useState } from 'react';
import { USERS } from '../data/mockData';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/routes';
import { useTheme } from '../providers/ProjectThemeProvider';
import { useForm } from 'react-hook-form';

type logInData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [error, setError] = useState('');

  const { isDark, toggleMode } = useTheme();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setIsLoading = useAuthStore((s) => s.setIsLoading);
  const logIn = useAuthStore((s) => s.logIn);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<logInData>();

  const onSubmit = (data: logInData) => {
    setIsLoading(true);
    logIn(data);
  };

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.HOME);
  }, [isAuthenticated]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 100%)'
          : 'radial-gradient(ellipse at 50% 0%, rgba(150, 150, 255, 0.66) 0%, transparent 70%), linear-gradient(135deg, #ffffff 0%, #beceffff 100%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(17,17,24,0.9)',
          backdropFilter: 'blur(40px)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(255,255,255,0.08)',
          borderRadius: 4,
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          position: 'relative',
          '&:hover': {
            transform: 'none',
            borderColor: 'rgba(255,255,255,0.08)',
          },
        }}
      >
        <CardContent sx={{ p: 4, bgcolor: 'background.paper' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                boxShadow: isDark
                  ? '0 8px 32px rgba(99,102,241,0.4)'
                  : '0 8px 32px rgba(99, 101, 241, 0.8)',
              }}
            >
              <LockOutlinedIcon sx={{ color: '#fff', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}
            >
              Welcome to TaskHub
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Enterprise project management platform
            </Typography>
          </Box>

          <Divider
            sx={{
              my: 3,
              borderColor: isDark
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(0, 0, 0, 0.06)',
            }}
          />

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              {error && (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 2, fontSize: '0.8rem' }}
                >
                  {error}
                </Alert>
              )}

              <TextField
                {...register('email')}
                type="email"
                label="Email address"
                fullWidth
                required
              />
              <TextField
                {...register('password')}
                label="Password"
                type="password"
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 1.5, fontSize: '0.95rem' }}
              >
                Sign In
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Typography align="center">Need an account ?</Typography>
                <Divider variant="fullWidth" orientation="vertical" flexItem />
                <Link
                  underline="hover"
                  href="/register"
                  color={isDark ? 'primary.light' : 'primary.dark'}
                >
                  Register here
                </Link>
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ my: 3, borderColor: 'text.secondary' }}>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', px: 1 }}
            >
              Quick access — demo accounts
            </Typography>
          </Divider>

          <Stack spacing={1}>
            {USERS.map((user) => (
              <Box
                key={user.id}
                onClick={() => {
                  setError('');
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  border: isDark
                    ? '2px solid rgba(255,255,255,0.05)'
                    : '2px solid rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: 'rgba(99,102,241,0.1)',
                    borderColor: 'rgba(99,102,241,0.3)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: user.avatarColor,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {user.firstName[0] + user.lastName[0]}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: '0.82rem' }}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', fontSize: '0.72rem' }}
                  >
                    {user.email}
                  </Typography>
                </Box>
                <Chip
                  label={user.role}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    bgcolor:
                      user.role === 'admin'
                        ? 'rgba(99,102,241,0.2)'
                        : 'rgba(255,255,255,0.06)',
                    color:
                      user.role === 'admin'
                        ? 'primary.light'
                        : 'text.secondary',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Tooltip title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}>
        <IconButton
          size="large"
          onClick={toggleMode}
          sx={{
            position: 'absolute',
            right: '2rem',
            top: '2rem',
            zIndex: 1200,
            transition: 'transform 0.3s ease, color 0.2s',
            '&:hover': { transform: 'rotate(20deg)' },
          }}
        >
          {isDark ? (
            <LightModeIcon sx={{ color: 'warning.main' }} fontSize="large" />
          ) : (
            <DarkModeIcon sx={{ color: 'primary.dark' }} fontSize="large" />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default memo(LoginPage);
