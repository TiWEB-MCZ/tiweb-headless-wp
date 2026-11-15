import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Award,
  Gift,
  X,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useExplorationGame } from '../../context/ExplorationGameContext';
import { RewardClaimModal } from './RewardClaimModal';

interface ExplorerHudProps {
  onOpenSitemap?: () => void;
  className?: string;
}

export const ExplorerHud: React.FC<ExplorerHudProps> = ({
  onOpenSitemap,
  className = '',
}) => {
  const {
    visitedCount,
    totalNodes,
    percentage,
    currentRank,
    badges,
    isRewardUnlocked,
  } = useExplorationGame();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  return (
    <>
      <div
        data-testid="explorer-hud"
        className={`fixed bottom-5 right-5 z-40 select-none flex flex-col items-end ${className}`}
      >
        {/* Expanded Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-80 sm:w-96 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-5 shadow-2xl mb-3 relative overflow-hidden backdrop-blur-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-purple)]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-main)]">
                      Jornada do Explorador
                    </h4>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] block">
                      Status: {currentRank}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                  aria-label="Fechar painel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono mb-1.5 font-semibold">
                  <span className="text-[var(--text-secondary)]">Cobertura do Ecossistema:</span>
                  <span className="text-[var(--accent-green)]">{percentage}% ({visitedCount}/{totalNodes})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-cyan)] to-[var(--accent-green)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Badges List */}
              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-mono text-[var(--text-muted)] font-bold uppercase tracking-wider block">
                  Insígnias de Conquista:
                </span>
                {badges.map((b) => (
                  <div
                    key={b.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all text-xs ${
                      b.unlocked
                        ? 'bg-[var(--bg-elevated)] border-[var(--accent-green)]/40 text-[var(--text-main)]'
                        : 'bg-[var(--bg-app)] border-[var(--border-subtle)] opacity-55 text-[var(--text-muted)]'
                    }`}
                  >
                    {b.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)] shrink-0 mt-0.5" />
                    ) : (
                      <Lock className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span>{b.name}</span>
                        {b.unlocked && (
                          <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-[var(--accent-green)]/15 text-[var(--accent-green)]">
                            OK
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-tight mt-0.5">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex gap-2">
                {isRewardUnlocked ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      setIsRewardModalOpen(true);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white dark:text-slate-950 bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-cyan)] flex items-center justify-center gap-1.5 cursor-pointer shadow-md animate-pulse"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Resgatar Diagnóstico</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      if (onOpenSitemap) {
                        onOpenSitemap();
                      } else {
                        const el = document.getElementById('mapa');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-[var(--text-main)] bg-[var(--bg-elevated)] hover:bg-[var(--border-strong)] border border-[var(--border-subtle)] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-[var(--accent-purple)]" />
                    <span>Ver Constelação</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Pill Toggle */}
        <div className="flex items-center gap-2">
          {isRewardUnlocked && !isExpanded && (
            <motion.button
              type="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsRewardModalOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-cyan)] text-white dark:text-slate-950 text-xs font-bold shadow-xl flex items-center gap-1.5 cursor-pointer animate-bounce"
            >
              <Gift className="w-4 h-4" />
              <span>Diagnóstico Liberado!</span>
            </motion.button>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Abrir painel do explorador"
            className="px-4 py-2.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-xl flex items-center gap-2.5 cursor-pointer transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-purple)]">
              {percentage >= 100 ? (
                <Award className="w-4 h-4 text-[var(--accent-green)]" />
              ) : (
                <Compass className="w-4 h-4" />
              )}
            </div>

            <div className="text-left">
              <span className="text-xs font-bold text-[var(--text-main)] block leading-tight">
                {currentRank}
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] block leading-tight">
                {visitedCount}/{totalNodes} ({percentage}%)
              </span>
            </div>

            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
            ) : (
              <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
            )}
          </button>
        </div>
      </div>

      {/* Claim Modal */}
      <RewardClaimModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
      />
    </>
  );
};
