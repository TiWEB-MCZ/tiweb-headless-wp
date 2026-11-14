import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-testid="theme-toggle-btn"
      aria-label={isDark ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro'}
      title={isDark ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro'}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-200 cursor-pointer border ${
        isDark
          ? 'bg-[#44475a]/70 hover:bg-[#44475a] border-[#6272a4]/40 text-[#f1fa8c] hover:shadow-[0_0_15px_rgba(241,250,140,0.3)]'
          : 'bg-[#f1f5f9] hover:bg-[#e2e8f0] border-[#cbd5e1] text-[#7c3aed] hover:shadow-[0_0_15px_rgba(124,58,237,0.2)]'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun className="w-4 h-4 text-[#f1fa8c]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon className="w-4 h-4 text-[#7c3aed]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs sm:text-sm font-medium">
          {isDark ? 'Tema Claro' : 'Tema Escuro'}
        </span>
      )}
    </button>
  );
};
