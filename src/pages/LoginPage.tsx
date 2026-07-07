import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { memo, useEffect, useState } from "react";
import { USERS } from "../data/mockData";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import ROUTES from "../router/routes";

const LoginPage = () => {
  const [error, setError] = useState("");

  const setUser = useUserStore((s) => s.setUser);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.HOME);
  }, [isAuthenticated]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 100%)",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(17,17,24,0.9)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 4,
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
          position: "relative",
          "&:hover": {
            transform: "none",
            borderColor: "rgba(255,255,255,0.08)",
          },
        }}
      >
        <CardContent sx={{ p: 4, bgcolor: "background.paper" }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "16px",
                background: "linear-gradient(135deg, #6366f1, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
                boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
              }}
            >
              <LockOutlinedIcon sx={{ color: "#fff", fontSize: 24 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 0.5, color: "#f1f5f9" }}
            >
              Welcome to TaskFlow
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Enterprise project management platform
            </Typography>
          </Box>

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }} />

          <Stack spacing={2.5}>
            {error && (
              <Alert
                severity="error"
                sx={{ borderRadius: 2, fontSize: "0.8rem" }}
              >
                {error}
              </Alert>
            )}

            <TextField label="Email address" fullWidth />
            <TextField label="Password" type="password" fullWidth />
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ py: 1.5, fontSize: "0.95rem" }}
            >
              Sign In
            </Button>
          </Stack>

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.06)" }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", px: 1 }}
            >
              Quick access — demo accounts
            </Typography>
          </Divider>

          <Stack spacing={1}>
            {USERS.map((user) => (
              <Box
                key={user.id}
                onClick={() => {
                  setError("");
                  setUser(user);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.2s",
                  "&:hover": {
                    background: "rgba(99,102,241,0.1)",
                    borderColor: "rgba(99,102,241,0.3)",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: user.avatarColor,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {user.displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, fontSize: "0.82rem" }}
                  >
                    {user.displayName}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontSize: "0.72rem" }}
                  >
                    {user.email}
                  </Typography>
                </Box>
                <Chip
                  label={user.role}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    bgcolor:
                      user.role === "admin"
                        ? "rgba(99,102,241,0.2)"
                        : "rgba(255,255,255,0.06)",
                    color:
                      user.role === "admin"
                        ? "primary.light"
                        : "text.secondary",
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default memo(LoginPage);
