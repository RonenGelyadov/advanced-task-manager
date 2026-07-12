import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/routes';
import { useTheme } from '../providers/ProjectThemeProvider';

interface BoardProps {
  id: string;
  index: number;
  color: string;
  title: string;
  description: string;
  createdAt: string;
}

const Board = ({ id, index, title, description, createdAt, color }: BoardProps) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <Grid
      size={{ sm: 4, md: 2, xl: 1 }}
      className="fade-in-up"
      sx={{ opacity: 0, animationDelay: `${index * 0.1}s` }}
    >
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${color}, transparent)`,
          },
        }}
      >
        <CardActionArea
          onClick={() => navigate(ROUTES.BOARD + `/${id}`)}
          sx={{ height: '100%', p: 0 }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${color}33, ${color}11)`,
                  border: `1px solid ${color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    bgcolor: color,
                  }}
                />
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontSize: '0.72rem' }}
                >
                  Created: {createdAt}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.8rem',
                mb: 2,
                lineHeight: 1.5,
                minHeight: 36,
              }}
            >
              {description}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 0.75,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontSize: '0.72rem' }}
                >
                  Progress
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: '0.72rem',
                  }}
                >
                  {/* {donePercent}% */}50%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.floor(Math.random() * 90)}
                color="primary"
                sx={{
                  height: 5,
                  borderRadius: 2,
                  bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                }}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default memo(Board);
