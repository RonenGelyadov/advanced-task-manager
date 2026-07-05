import { createTheme, ThemeProvider } from '@mui/material/styles';
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
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
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
