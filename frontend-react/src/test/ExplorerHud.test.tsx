import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ExplorerHud } from '../components/sitemap/ExplorerHud';
import { ExplorationGameProvider } from '../context/ExplorationGameContext';
import { ThemeProvider } from '../context/ThemeContext';

describe('ExplorerHud Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderComponent = (props = {}) => {
    return render(
      <ThemeProvider>
        <ExplorationGameProvider>
          <ExplorerHud {...props} />
        </ExplorationGameProvider>
      </ThemeProvider>
    );
  };

  it('renders explorer hud with initial progress', () => {
    renderComponent();
    expect(screen.getByTestId('explorer-hud')).toBeInTheDocument();
    expect(screen.getByText(/Explorador Novato/i)).toBeInTheDocument();
    expect(screen.getByText(/0\/10/i)).toBeInTheDocument();
  });

  it('expands hud details when clicked', () => {
    renderComponent();
    const toggleBtn = screen.getByRole('button', { name: /abrir painel do explorador/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByText(/Jornada do Explorador/i)).toBeInTheDocument();
    expect(screen.getByText(/Arquiteto Curioso/i)).toBeInTheDocument();
    expect(screen.getByText(/Estrategista de IA/i)).toBeInTheDocument();
    expect(screen.getByText(/Mestre do Ecossistema/i)).toBeInTheDocument();
  });

  it('calls onOpenSitemap when Ver Mapa is clicked', () => {
    const handleOpenMap = vi.fn();
    renderComponent({ onOpenSitemap: handleOpenMap });

    const toggleBtn = screen.getByRole('button', { name: /abrir painel do explorador/i });
    fireEvent.click(toggleBtn);

    const openMapBtn = screen.getByRole('button', { name: /ver constelação/i });
    fireEvent.click(openMapBtn);

    expect(handleOpenMap).toHaveBeenCalledTimes(1);
  });
});
