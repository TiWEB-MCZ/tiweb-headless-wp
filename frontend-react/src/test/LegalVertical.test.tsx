import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { LegalVerticalSection } from '../components/legal/LegalVerticalSection';
import { WhatsAppSimulator } from '../components/legal/WhatsAppSimulator';

describe('LegalVerticalSection Component', () => {
  it('renders headline and ethical OAB badge', () => {
    render(<LegalVerticalSection />);
    expect(screen.getByText(/Inteligência Artificial & Atendimento para a/i)).toBeInTheDocument();
    expect(screen.getByText(/Vertical Especializada \/\/ Advocacia 4.0/i)).toBeInTheDocument();

    const liveTourLink = screen.getByRole('link', { name: /Tour ao Vivo — SmartLegal/i });
    expect(liveTourLink).toHaveAttribute('href', 'https://smartlegal.tiweb.app.br');
    expect(liveTourLink).toHaveAttribute('target', '_blank');
  });

  it('renders the 3 strategic legal pillars', () => {
    render(<LegalVerticalSection />);
    expect(screen.getByText(/Provimento 205\/2021 da OAB 100% Blindado/i)).toBeInTheDocument();
    expect(screen.getByText(/Triagem Cognitiva & Atendimento 24\/7/i)).toBeInTheDocument();
    expect(screen.getByText(/Sentinela de Alvarás & Reativação de Contatos/i)).toBeInTheDocument();
  });

  it('opens and closes mobile presentation modal', async () => {
    render(<LegalVerticalSection />);
    const openBtn = screen.getByRole('button', { name: /Abrir Apresentação \(7 Slides\)/i });
    fireEvent.click(openBtn);

    expect(screen.getByText('MODO APRESENTAÇÃO EXECUTIVA')).toBeInTheDocument();
    expect(screen.getByText(/SLIDE 1 DE 7/i)).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /Próximo/i });
    fireEvent.click(nextBtn);
    await waitFor(() => {
      expect(screen.getByText(/SLIDE 2 DE 7/i)).toBeInTheDocument();
    });

    const closeBtn = screen.getByRole('button', { name: /Fechar apresentação/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText('MODO APRESENTAÇÃO EXECUTIVA')).not.toBeInTheDocument();
    });
  });

  it('advances slide on touch swipe left and returns on touch swipe right', async () => {
    render(<LegalVerticalSection />);
    const openBtn = screen.getByRole('button', { name: /Abrir Apresentação \(7 Slides\)/i });
    fireEvent.click(openBtn);

    const slideContainer = screen.getByTestId('presentation-slide-container');

    // Swipe left (advance to slide 2)
    fireEvent.touchStart(slideContainer, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchMove(slideContainer, { targetTouches: [{ clientX: 200 }] });
    fireEvent.touchEnd(slideContainer);

    await waitFor(() => {
      expect(screen.getByText(/SLIDE 2 DE 7/i)).toBeInTheDocument();
    });

    // Swipe right (return to slide 1)
    fireEvent.touchStart(slideContainer, { targetTouches: [{ clientX: 200 }] });
    fireEvent.touchMove(slideContainer, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchEnd(slideContainer);

    await waitFor(() => {
      expect(screen.getByText(/SLIDE 1 DE 7/i)).toBeInTheDocument();
    });
  });

  it('displays distinct modular composition tags on slides 1, 3 and 5', async () => {
    render(<LegalVerticalSection />);
    const openBtn = screen.getByRole('button', { name: /Abrir Apresentação \(7 Slides\)/i });
    fireEvent.click(openBtn);

    // Slide 1
    expect(screen.getByText('PILAR 01 • VELOCIDADE COMERCIAL')).toBeInTheDocument();
    expect(screen.getByText('Recepção Imediata (< 5s)')).toBeInTheDocument();

    // Advance to Slide 3
    const nextBtn = screen.getByRole('button', { name: /Próximo/i });
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    await waitFor(() => {
      expect(screen.getByText(/SLIDE 3 DE 7/i)).toBeInTheDocument();
    });
    expect(screen.getByText('MOTOR NLP • COMPÕE O PILAR 01')).toBeInTheDocument();
    expect(screen.getByText('1. Classificador Jurídico & Pauta')).toBeInTheDocument();

    // Advance to Slide 5
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    await waitFor(() => {
      expect(screen.getByText(/SLIDE 5 DE 7/i)).toBeInTheDocument();
    });
    expect(screen.getByText('COMPOSIÇÃO: MOTOR NLP + AGENDA')).toBeInTheDocument();
    expect(screen.getByText('Pacote 1: Recepção & Pauta Automática')).toBeInTheDocument();
  });
});

describe('WhatsAppSimulator Component', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders simulator header with OAB status', () => {
    render(<WhatsAppSimulator />);
    expect(screen.getByText(/Atendente Jurídica IA/i)).toBeInTheDocument();
    expect(screen.getByText(/Online 24\/7 • Ética OAB/i)).toBeInTheDocument();
  });

  it('renders preset scenarios buttons', () => {
    render(<WhatsAppSimulator />);
    expect(screen.getByText('⚖️ Consulta Trabalhista')).toBeInTheDocument();
    expect(screen.getByText('💰 Notificação de Alvará')).toBeInTheDocument();
    expect(screen.getByText('🏠 Contrato Imobiliário')).toBeInTheDocument();
  });

  it('simulates scenario interaction when clicked', async () => {
    render(<WhatsAppSimulator />);
    const scenarioBtn = screen.getByText('⚖️ Consulta Trabalhista');
    fireEvent.click(scenarioBtn);

    expect(screen.getByText(/preciso saber se tenho direito a horas extras/i)).toBeInTheDocument();
  });

  it('shows Yes/No buttons after capturing topic and handles "sim" without repeating doubt template', () => {
    vi.useFakeTimers();
    render(<WhatsAppSimulator />);

    const input = screen.getByPlaceholderText(/Digite sua dúvida jurídica de teste/i);
    fireEvent.change(input, { target: { value: 'inventário' } });
    fireEvent.submit(input.closest('form')!);

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.getByText(/Compreendo perfeitamente sua dúvida sobre "inventário"/i)).toBeInTheDocument();
    expect(screen.getByTestId('chat-meeting-confirmation-actions')).toBeInTheDocument();
    expect(screen.getByTestId('chat-confirm-yes')).toBeInTheDocument();
    expect(screen.getByTestId('chat-confirm-no')).toBeInTheDocument();

    // User types "sim" instead of clicking button
    const confirmInput = screen.getByPlaceholderText(/Responda Sim ou Não/i);
    fireEvent.change(confirmInput, { target: { value: 'sim' } });
    fireEvent.submit(confirmInput.closest('form')!);

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.getByText(/Pré-agendamos sua reunião inicial sobre "inventário"/i)).toBeInTheDocument();
    expect(screen.queryByText(/Compreendo perfeitamente sua dúvida sobre "sim"/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('chat-meeting-confirmation-actions')).not.toBeInTheDocument();
  });

  it('handles clicking No button gracefully without repeating doubt template', () => {
    vi.useFakeTimers();
    render(<WhatsAppSimulator />);

    const input = screen.getByPlaceholderText(/Digite sua dúvida jurídica de teste/i);
    fireEvent.change(input, { target: { value: 'pensão alimentícia' } });
    fireEvent.submit(input.closest('form')!);

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    const noBtn = screen.getByTestId('chat-confirm-no');
    fireEvent.click(noBtn);

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.getByText(/O resumo sobre "pensão alimentícia" já ficou registrado/i)).toBeInTheDocument();
    expect(screen.queryByText(/Compreendo perfeitamente sua dúvida sobre "Não/i)).not.toBeInTheDocument();
  });
});
