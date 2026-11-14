import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';
import { GamifiedSitemap } from '../components/sitemap/GamifiedSitemap';
import { SITEMAP_NODES } from '../data/sitemapNodes';
import { ThemeProvider } from '../context/ThemeContext';
import { ExplorationGameProvider } from '../context/ExplorationGameContext';

describe('GamifiedSitemap Component', () => {
  const renderComponent = (props = {}) => {
    return render(
      <ThemeProvider>
        <ExplorationGameProvider>
          <GamifiedSitemap {...props} />
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

  it('opens preview modal when clicking a node', () => {
    renderComponent();
    const smartContactNode = screen.getByTestId('sitemap-node-smartcontact');
    fireEvent.click(smartContactNode);

    // Modal preview should display node details
    const modal = screen.getByTestId('node-preview-modal');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText('SmartContact')).toBeInTheDocument();
    expect(within(modal).getByText(/CRM & Agentes Cognitivos Omnichannel/i)).toBeInTheDocument();
    expect(within(modal).getByText(/Acessar Destino/i)).toBeInTheDocument();
  });

  it('closes preview modal when clicking close button', () => {
    renderComponent();
    const masNode = screen.getByTestId('sitemap-node-mas-educa-ia');
    fireEvent.click(masNode);

    expect(screen.getByTestId('node-preview-modal')).toBeInTheDocument();
    const closeBtn = screen.getByRole('button', { name: /fechar detalhes/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('node-preview-modal')).not.toBeInTheDocument();
  });

  it('filters nodes when selecting a category filter', () => {
    renderComponent();
    const filterBtn = screen.getByRole('button', { name: /SaaS & CRM/i });
    fireEvent.click(filterBtn);

    // SmartContact should be highlighted or active
    const smartContactNode = screen.getByTestId('sitemap-node-smartcontact');
    expect(smartContactNode).toBeInTheDocument();
  });

  it('calls onClose callback if provided when closing sitemap view/overlay', () => {
    const handleClose = vi.fn();
    renderComponent({ isModal: true, onClose: handleClose });

    const closeSitemapBtn = screen.getByRole('button', { name: /fechar mapa/i });
    fireEvent.click(closeSitemapBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
