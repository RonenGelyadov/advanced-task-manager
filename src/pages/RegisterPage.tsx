import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
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
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/routes';
import { useTheme } from '../providers/ProjectThemeProvider';
import { Controller, useForm } from 'react-hook-form';
import type { User } from '../types/dataTypes';
import avatarColors from '../data/avatarColors';
import useUserStore from '../store/userStore';

type registerData = Omit<User, 'id' | 'role'> & { password: string };

const RegisterPage = () => {
  const [error, setError] = useState('');
  const { isDark, toggleMode } = useTheme();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setIsLoading = useAuthStore((s) => s.setIsLoading);
  const registerUser = useUserStore((s) => s.registerUser);

  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<registerData>();

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.HOME);
  }, [isAuthenticated]);

  const onSubmit = (data: registerData) => {
    setIsLoading(true);
    setError('');
    registerUser(data);
  };

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
              Enterprise task management platform
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Typography align="center" sx={{ color: 'text.secondary' }}>
              Already have an account ?
            </Typography>
            <Divider variant="fullWidth" orientation="vertical" flexItem />
            <Link
              underline="hover"
              href="/login"
              color={isDark ? 'primary.light' : 'primary.dark'}
            >
              Sign in
            </Link>
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
                {...register('firstName')}
                label="First Name"
                fullWidth
                required
              />
              <TextField
                {...register('lastName')}
                label="Last Name"
                fullWidth
                required
              />
              <TextField
                {...register('email')}
                label="Email address"
                type="email"
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
              <Controller
                name="avatarColor"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        fontWeight: 'medium',
                        color: 'text.secondary',
                      }}
                    >
                      Avatar Color:
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        flexWrap: 'wrap',
                        mb: 3,
                      }}
                    >
                      {avatarColors.map((c) => {
                        const isSelected = field.value === c.color;

                        return (
                          <Box
                            key={c.name}
                            onClick={() => field.onChange(c.color)}
                            title={c.name}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              backgroundColor: c.color,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',

                              border: isSelected
                                ? isDark
                                  ? '3px solid rgba(255,255,255,1)'
                                  : '3px solid rgba(0,0,0,0.8)'
                                : isDark
                                  ? '1px solid rgba(0,0,0,0.1)'
                                  : '1px solid rgba(0,0,0,0.1)',
                              transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                              boxShadow: isSelected ? 3 : 1,

                              transition: 'all 0.1s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.2)',
                                boxShadow: 2,
                              },
                            }}
                          ></Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 1.5, fontSize: '0.95rem' }}
              >
                Register
              </Button>
            </Stack>
          </Box>
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

export default memo(RegisterPage);
