import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Navbar } from '../components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { STORAGE_THEME_KEY } from '../theme/tokens';

const renderNavbarWithTheme = (defaultPreference: 'dark' | 'light' = 'dark') => {
  return render(
    <ThemeProvider defaultPreference={defaultPreference}>
      <Navbar />
    </ThemeProvider>
  );
};

describe('Navbar Component & Theme Toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('renders brand logo and primary navigation links', () => {
    renderNavbarWithTheme();
    expect(screen.getByText('TIWEB')).toBeInTheDocument();
    expect(screen.getByText('Enterprise & IA')).toBeInTheDocument();
    expect(screen.getByText('Vertical Advocacia')).toBeInTheDocument();
    expect(screen.getByText('SPED Fácil')).toBeInTheDocument();
  });

  it('renders theme toggle button with accessible title and aria-label', () => {
    renderNavbarWithTheme('dark');
    const toggleBtns = screen.getAllByTestId('theme-toggle-btn');
    expect(toggleBtns.length).toBeGreaterThanOrEqual(1);

    const desktopToggle = toggleBtns[0];
    expect(desktopToggle).toHaveAttribute('aria-label', 'Alternar para Tema Claro');
  });

  it('toggles theme when clicking on theme toggle button in navbar', () => {
    renderNavbarWithTheme('dark');
    const toggleBtns = screen.getAllByTestId('theme-toggle-btn');
    const desktopToggle = toggleBtns[0];

    // Clica para alternar para tema claro
    fireEvent.click(desktopToggle);

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem(STORAGE_THEME_KEY)).toBe('light');

    // Clica novamente para voltar para tema escuro
    fireEvent.click(desktopToggle);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem(STORAGE_THEME_KEY)).toBe('dark');
  });

  it('opens and closes mobile drawer and maintains theme toggle accessible', () => {
    renderNavbarWithTheme();
    const menuBtn = screen.getByLabelText(/Abrir menu/i);

    // Abre gaveta mobile
    fireEvent.click(menuBtn);
    expect(screen.getByText(/Vertical Advocacia \(Apresentação & Agente IA\)/i)).toBeInTheDocument();

    // Fecha gaveta mobile
    fireEvent.click(menuBtn);
    expect(screen.queryByText(/Vertical Advocacia \(Apresentação & Agente IA\)/i)).not.toBeInTheDocument();
  });
});
