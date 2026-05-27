import { useContext } from 'react';
import { ThemeContext } from '../context/theme';

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme phải dùng bên trong ThemeProvider');
  }

  return context;
}
