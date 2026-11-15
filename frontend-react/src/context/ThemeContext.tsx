import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeMode, ResolvedTheme, STORAGE_THEME_KEY } from '../theme/tokens';

export interface ThemeContextValue {
  theme: ResolvedTheme;
  preference: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultPreference?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultPreference = 'system',
}) => {
  const [preference, setPreference] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultPreference;
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY) as ThemeMode | null;
      if (saved && ['dark', 'light', 'system'].includes(saved)) {
        return saved;
      }
    } catch {
      // Fallback em caso de localStorage indisponível
    }
    return defaultPreference;
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listener para mudanças na preferência de sistema operacional
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  // Resolução do tema ativo ('dark' ou 'light')
  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (preference === 'system') {
      return systemIsDark ? 'dark' : 'light';
    }
    return preference;
  }, [preference, systemIsDark]);

  // Aplicação da classe no elemento documentElement (HTML) e persistência
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    if (resolvedTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }

    try {
      localStorage.setItem(STORAGE_THEME_KEY, preference);
    } catch {
      // Erro silencioso se localStorage estiver bloqueado
    }
  }, [resolvedTheme, preference]);

  const handleSetTheme = (mode: ThemeMode) => {
    setPreference(mode);
  };

  const toggleTheme = () => {
    setPreference((prev) => {
      const currentResolved = prev === 'system' ? (systemIsDark ? 'dark' : 'light') : prev;
      return currentResolved === 'dark' ? 'light' : 'dark';
    });
  };

  const value: ThemeContextValue = {
    theme: resolvedTheme,
    preference,
    setTheme: handleSetTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useOptionalTheme = (): ThemeContextValue | undefined => {
  return useContext(ThemeContext);
};
