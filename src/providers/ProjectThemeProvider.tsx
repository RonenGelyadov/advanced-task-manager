import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface ThemeContextData {
  isDark: boolean;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

const ProjectThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(
    JSON.parse(localStorage.getItem('darkMode') ?? 'false'),
  );

  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
      },
      secondary: {
        main: '#ec4899',
        light: '#f472b6',
        dark: '#db2777',
      },
      background: isDark
        ? { default: '#0a0a0f', paper: '#111118' }
        : { default: '#f1f5f9', paper: '#ffffff' },
      success: { main: '#10b981' },
      warning: { main: '#f59e0b' },
      error: { main: '#ef4444' },
      text: isDark
        ? { primary: '#f1f5f9', secondary: '#94a3b8' }
        : { primary: '#0f172a', secondary: '#64748b' },
      divider: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: isDark
              ? 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)'
              : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)',
            minHeight: '100vh',
            scrollbarWidth: 'thin',
            scrollbarColor: isDark ? '#334155 transparent' : '#cbd5e1 transparent',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? '#334155' : '#cbd5e1',
              borderRadius: '3px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: isDark ? '#111118' : '#ffffff',
            border: isDark
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(0,0,0,0.06)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: 'rgba(99,102,241,0.3)',
              transform: 'translateY(-2px)',
              boxShadow: isDark
                ? '0 8px 32px rgba(99,102,241,0.15)'
                : '0 8px 32px rgba(0,0,0,0.6)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 20px',
            fontSize: '0.875rem',
          },
          contained: {
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            boxShadow: isDark
              ? '0 4px 15px rgba(99,102,241,0.3)'
              : '0 4px 15px rgba(99, 101, 241, 0.8)',
            '&:hover': {
              background: 'linear-gradient(135deg, #818cf8, #6366f1)',
              boxShadow: isDark
                ? '0 6px 20px rgba(99,102,241,0.4)'
                : '0 6px 20px rgba(99,102,241,0.9)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark ? 'rgba(10,10,15,0.8)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: isDark
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid rgba(0,0,0,0.06)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#15151f' : '#ffffff',
            backgroundImage: 'none',
            border: isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16,
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'small' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '& fieldset': {
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)',
              },
              '&:hover fieldset': { borderColor: 'rgba(99,102,241,0.4)' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6, fontWeight: 500, fontSize: '0.75rem' },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? '#1e1e2e' : '#1e293b',
            border: isDark
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.1)',
            borderRadius: 8,
            fontSize: '0.8rem',
          },
        },
      },
    },
  });

  const toggleMode = () => {
    setIsDark((prev) => {
      localStorage.setItem('darkMode', JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ProjectThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ProjectThemeProvider');
  }

  return context;
};
