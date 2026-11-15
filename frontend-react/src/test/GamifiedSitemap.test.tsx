import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { GamifiedSitemap } from '../components/sitemap/GamifiedSitemap';
import { TeleportOverlay } from '../components/sitemap/TeleportOverlay';
import { TrailNavigationBadges } from '../components/sitemap/TrailNavigationBadges';
import { SITEMAP_NODES } from '../data/sitemapNodes';
import { ThemeProvider } from '../context/ThemeContext';
import { ExplorationGameProvider } from '../context/ExplorationGameContext';

describe('GamifiedSitemap Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderComponent = (props = {}) => {
    return render(
      <ThemeProvider>
        <ExplorationGameProvider>
          <GamifiedSitemap {...props} />
          <TeleportOverlay />
        </ExplorationGameProvider>
      </ThemeProvider>
    );
  };

  it('renders the sitemap title, badge and description', () => {
    renderComponent();
    expect(screen.getByText(/Constelação Tecnológica & Mapa do Site/i)).toBeInTheDocument();
    expect(screen.getByText(/Navegue visualmente por todos os pilares/i)).toBeInTheDocument();
  });

  it('renders all sitemap nodes in the interactive view', () => {
    renderComponent();
    SITEMAP_NODES.forEach((node) => {
      expect(screen.getByTestId(`sitemap-node-${node.id}`)).toBeInTheDocument();
    });
  });

  it('teleports directly without opening blocking modal when clicking a node', () => {
    renderComponent();
    const smartContactNode = screen.getByTestId('sitemap-node-smartcontact');
    fireEvent.click(smartContactNode);

    // Must NOT open blocking modal
    expect(screen.queryByTestId('node-preview-modal')).not.toBeInTheDocument();

    // Must activate teleport fade overlay and mark node as explored
    expect(screen.getByTestId('teleport-overlay')).toBeInTheDocument();
    expect(screen.getByText(/Teletransportando para SmartContact/i)).toBeInTheDocument();
    expect(smartContactNode).toHaveTextContent(/✓ EXPLORADO/i);
  });

  it('displays lightweight hover tooltip with tagline and tech stack on mouseEnter', () => {
    renderComponent();
    const smartContactNode = screen.getByTestId('sitemap-node-smartcontact');
    fireEvent.mouseEnter(smartContactNode);

    const tooltip = screen.getByTestId('node-hover-tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(/CRM & Agentes Cognitivos Omnichannel/i);
    expect(tooltip).toHaveTextContent(/Clique para teletransportar/i);

    fireEvent.mouseLeave(smartContactNode);
    expect(screen.queryByTestId('node-hover-tooltip')).not.toBeInTheDocument();
  });

  it('filters nodes when selecting a category filter', () => {
    renderComponent();
    const filterBtn = screen.getByRole('button', { name: /SaaS & CRM/i });
    fireEvent.click(filterBtn);

    const smartContactNode = screen.getByTestId('sitemap-node-smartcontact');
    expect(smartContactNode).toBeInTheDocument();
  });

  it('calls onClose callback if provided when closing or teleporting from modal sitemap', () => {
    const handleClose = vi.fn();
    renderComponent({ isModal: true, onClose: handleClose });

    const closeSitemapBtn = screen.getByRole('button', { name: /fechar mapa/i });
    fireEvent.click(closeSitemapBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders bidirectional TrailNavigationBadges and teleports to next node in trail', () => {
    render(
      <ThemeProvider>
        <ExplorationGameProvider>
          <TrailNavigationBadges currentNodeId="smartcontact" />
          <TeleportOverlay />
        </ExplorationGameProvider>
      </ThemeProvider>
    );

    const backBtn = screen.getByTestId('trail-back-map-smartcontact');
    const nextBtn = screen.getByTestId('trail-next-node-smartcontact');

    expect(backBtn).toHaveTextContent(/Voltar à Constelação/i);
    expect(nextBtn).toHaveTextContent(/Próxima Parada: MAS \/ Educa-IA/i);

    fireEvent.click(nextBtn);
    expect(screen.getByTestId('teleport-overlay')).toBeInTheDocument();
    expect(screen.getByText(/Teletransportando para MAS \/ Educa-IA/i)).toBeInTheDocument();
  });
});
