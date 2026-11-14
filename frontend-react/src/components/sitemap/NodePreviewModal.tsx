import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SitemapNode } from '../../data/sitemapNodes';

interface NodePreviewModalProps {
  node: SitemapNode | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NodePreviewModal: React.FC<NodePreviewModalProps> = ({
  node,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !node) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-app)]/80 backdrop-blur-md animate-in fade-in duration-200"
        data-testid="node-preview-modal"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top Glow Accent */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-40"
            style={{ backgroundColor: node.accentColor }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="absolute top-5 right-5 p-2 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-main)] hover:bg-[var(--border-strong)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
              style={{
                color: node.accentColor,
                borderColor: `${node.accentColor}50`,
                backgroundColor: `${node.accentColor}15`,
              }}
            >
              {node.category}
            </span>

            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)] flex items-center gap-1 font-semibold">
              <span
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: node.accentColor }}
              />
              {node.badge}
            </span>
          </div>

          {/* Node Title & Tagline */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] mb-1">
            {node.label}
          </h3>
          <p
            className="text-sm font-semibold mb-4"
            style={{ color: node.accentColor }}
          >
            {node.tagline}
          </p>

          {/* Detailed Description */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
            {node.fullDescription}
          </p>

          {/* Tech Highlights */}
          <div className="mb-6">
            <span className="text-xs font-mono text-[var(--text-muted)] font-semibold uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Stack & Tecnologias Aplicadas:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {node.techHighlights.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)] flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#50fa7b]" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex gap-3">
            <a
              href={node.targetUrl}
              target={node.isExternal ? '_blank' : '_self'}
              rel={node.isExternal ? 'noopener noreferrer' : undefined}
              onClick={() => {
                onClose();
              }}
              className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-slate-950 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 transition-all"
              style={{
                background: `linear-gradient(135deg, ${node.accentColor}, #8be9fd)`,
              }}
            >
              <span>Acessar Destino</span>
              {node.isExternal ? (
                <ExternalLink className="w-4 h-4 shrink-0" />
              ) : (
                <ArrowRight className="w-4 h-4 shrink-0" />
              )}
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
