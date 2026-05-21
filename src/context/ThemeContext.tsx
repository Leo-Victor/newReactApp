import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

//Tạo context
const ThemeContext = createContext<ThemeContextType | null>(null);

//Provider - bọc toàn bộ app
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

//Custom hook để dùng ThemeContext
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme phải dùng bên trong ThemeProvider');
    return context;
}
