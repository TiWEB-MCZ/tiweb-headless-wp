import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Zap } from 'lucide-react';
import { useExplorationGame } from '../../context/ExplorationGameContext';
import { useTheme } from '../../context/ThemeContext';
import { getNodeThemeAccent } from '../../data/sitemapNodes';

export const TeleportOverlay: React.FC = () => {
  const { teleportState } = useExplorationGame();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const accent = getNodeThemeAccent(teleportState.accentColor || '#bd93f9', isLight);

  return (
    <AnimatePresence>
      {teleportState.isActive && (
        <motion.div
          key="teleport-overlay"
          data-testid="teleport-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: 'easeInOut' }}
          className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center bg-[var(--bg-app)]/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -8 }}
            transition={{ duration: 0.18 }}
            className="px-6 py-4 rounded-2xl bg-[var(--bg-surface)] border shadow-2xl flex items-center gap-3.5"
            style={{
              borderColor: `${accent}70`,
              boxShadow: `0 10px 40px ${accent}30`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${accent}20`,
                color: accent,
              }}
            >
              <Compass className="w-5 h-5 animate-spin" />
            </div>

            <div className="text-left">
              {teleportState.targetBadge && (
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1"
                  style={{ color: accent }}
                >
                  <Zap className="w-3 h-3" />
                  {teleportState.targetBadge}
                </span>
              )}
              <div className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
                Teletransportando para {teleportState.targetLabel}...
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
