import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { STORAGE_THEME_KEY, THEME_TOKENS } from '../theme/tokens';

const TestConsumer: React.FC = () => {
  const { theme, preference, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="current-preference">{preference}</span>
      <button onClick={() => setTheme('light')} data-testid="btn-light">
        Set Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid="btn-dark">
        Set Dark
      </button>
      <button onClick={() => setTheme('system')} data-testid="btn-system">
        Set System
      </button>
      <button onClick={toggleTheme} data-testid="btn-toggle">
        Toggle
      </button>
    </div>
  );
};

describe('SSOT de Cores e ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('valida estrutura dos tokens semânticos de Dark e Light mode', () => {
    expect(THEME_TOKENS.dark.bgApp).toBe('#282a36');
    expect(THEME_TOKENS.dark.textMain).toBe('#f8f8f2');
    expect(THEME_TOKENS.light.bgApp).toBe('#f8fafc');
    expect(THEME_TOKENS.light.textMain).toBe('#0f172a');
  });

  it('inicializa com dark por padrão no sistema quando matchMedia é dark', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('current-preference')).toHaveTextContent('system');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('detecta preferência de sistema light quando matchMedia é falso para dark', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('permite alternar tema e salva preferência no localStorage', () => {
    render(
      <ThemeProvider defaultPreference="dark">
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    // Clica no botão toggle
    fireEvent.click(screen.getByTestId('btn-toggle'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(localStorage.getItem(STORAGE_THEME_KEY)).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);

    // Clica novamente no toggle
    fireEvent.click(screen.getByTestId('btn-toggle'));

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(localStorage.getItem(STORAGE_THEME_KEY)).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('carrega preferência salva previamente no localStorage', () => {
    localStorage.setItem(STORAGE_THEME_KEY, 'light');

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('current-preference')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('lança erro descritivo ao utilizar useTheme fora do ThemeProvider', () => {
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider'
    );

    console.error = originalError;
  });
});
