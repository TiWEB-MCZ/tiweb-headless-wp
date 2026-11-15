import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, CheckCircle2, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { useExplorationGame } from '../../context/ExplorationGameContext';
import { getLisaWhatsAppUrl } from '../../data/contact';

interface RewardClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RewardClaimModal: React.FC<RewardClaimModalProps> = ({ isOpen, onClose }) => {
  const { currentRank, badges, percentage, visitedCount, totalNodes } = useExplorationGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const claimUrl = getLisaWhatsAppUrl(
    `🏆 Olá Lisa! Desbloqueei 100% da Constelação do Ecossistema TIWEB (${visitedCount}/${totalNodes} nós explorados) e conquistei a patente de ${currentRank}. Gostaria de resgatar meu Diagnóstico Executivo de Arquitetura & IA gratuito.`
  );

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-app)]/85 backdrop-blur-md animate-in fade-in duration-200"
        data-testid="reward-claim-modal"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-[var(--bg-surface)] border-2 border-[#50fa7b]/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Confetti Glow Background */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#50fa7b]/20 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#bd93f9]/20 rounded-full blur-[90px] pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar recompensa"
            className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-main)] hover:bg-[var(--border-strong)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[var(--accent-green)]/20 to-[var(--accent-cyan)]/20 border border-[var(--accent-green)]/50 flex items-center justify-center text-[var(--accent-green)] mb-4 shadow-lg">
            <Award className="w-8 h-8 animate-bounce" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-green)]/15 border border-[var(--accent-green)]/40 text-xs font-mono text-[var(--accent-green)] mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            CONQUISTA MÁXIMA DESBLOQUEADA
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] mb-2">
            Parabéns, {currentRank}!
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            Você inspecionou {visitedCount} de {totalNodes} nós ({percentage}%) do ecossistema TIWEB. Como reconhecimento pela sua visão analítica de tecnologia, seu <strong>Diagnóstico Executivo de Arquitetura & IA</strong> está liberado sem qualquer custo.
          </p>

          {/* Unlocked Badges Summary */}
          <div className="space-y-2 mb-6">
            {badges.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)] shrink-0" />
                  <div>
                    <span className="font-bold text-[var(--text-main)] block">{b.name}</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{b.description}</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[var(--accent-green)] font-bold px-2 py-0.5 rounded bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30">
                  DESBLOQUEADO
                </span>
              </div>
            ))}
          </div>

          {/* Voucher Code Box */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-app)] border border-[var(--border-subtle)] text-center mb-6">
            <span className="text-[11px] font-mono text-[var(--text-muted)] block mb-1">
              VOUCHER EXECUTIVO VERIFICADO:
            </span>
            <span className="text-base font-mono font-bold text-[var(--accent-cyan)] tracking-widest">
              TIWEB-MASTER-ARCH-2026
            </span>
          </div>

          {/* Action CTA */}
          <a
            href={claimUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-4 px-6 rounded-xl text-sm font-bold text-white dark:text-slate-950 bg-gradient-to-r from-[var(--accent-green)] via-[var(--accent-cyan)] to-[var(--accent-purple)] hover:shadow-[0_0_25px_rgba(22,163,74,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Resgatar Diagnóstico Gratuito com a Lisa no WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
