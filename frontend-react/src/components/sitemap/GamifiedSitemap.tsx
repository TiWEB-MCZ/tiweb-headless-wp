import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  X,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { SITEMAP_NODES, SITEMAP_EDGES, SitemapNode, getNodeThemeAccent } from '../../data/sitemapNodes';
import { useExplorationGame } from '../../context/ExplorationGameContext';
import { useTheme } from '../../context/ThemeContext';

interface GamifiedSitemapProps {
  isModal?: boolean;
  onClose?: () => void;
  className?: string;
}

export const GamifiedSitemap: React.FC<GamifiedSitemapProps> = ({
  isModal = false,
  onClose,
  className = '',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { teleportToNode, isNodeVisited } = useExplorationGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(SITEMAP_NODES.map((n) => n.category)));
    return ['Todos', ...cats];
  }, []);

  const filteredNodes = useMemo(() => {
    if (selectedCategory === 'Todos') return SITEMAP_NODES;
    return SITEMAP_NODES.filter((n) => n.category === selectedCategory);
  }, [selectedCategory]);

  const activeNodeIds = useMemo(() => {
    return new Set(filteredNodes.map((n) => n.id));
  }, [filteredNodes]);

  const handleSelectNode = (node: SitemapNode) => {
    if (isModal && onClose) {
      onClose();
    }
    teleportToNode(node.id);
  };

  return (
    <section
      id="mapa"
      className={`py-12 sm:py-16 bg-[var(--bg-app)] text-[var(--text-main)] relative overflow-hidden transition-colors duration-200 ${
        isModal ? 'fixed inset-0 z-50 overflow-y-auto' : ''
      } ${className}`}
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#bd93f9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8be9fd]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Bar Centralizado */}
        <div className="max-w-3xl mx-auto text-center mb-10 relative">
          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar mapa"
              className="absolute top-0 right-0 p-2.5 rounded-2xl bg-[var(--bg-elevated)] text-[var(--text-main)] hover:bg-[var(--border-strong)] transition-all cursor-pointer shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--accent-purple)]/40 text-xs font-mono text-[var(--accent-purple)] mb-3 font-semibold shadow-xs">
            <Compass className="w-4 h-4 animate-spin-slow" />
            NAVEGAÇÃO ESPACIAL & ÁRVORE TECNOLÓGICA
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)]">
            Constelação Tecnológica & Mapa do Site
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Navegue visualmente por todos os pilares do ecossistema TIWEB. Clique em qualquer nó para inspecionar arquitetura, tecnologias e teletransportar-se instantaneamente.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] text-white dark:text-slate-950 font-bold shadow-md'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Constellation Graph Area (Desktop & Tablet) */}
        <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden shadow-2xl p-4 hidden md:block">
          {/* SVG Background Lines Connecting Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {SITEMAP_EDGES.map((edge, idx) => {
              const sourceNode = SITEMAP_NODES.find((n) => n.id === edge.from);
              const targetNode = SITEMAP_NODES.find((n) => n.id === edge.to);
              if (!sourceNode || !targetNode) return null;

              const isConnectedToHover =
                hoveredNodeId === edge.from || hoveredNodeId === edge.to;
              const isRelevantCategory =
                activeNodeIds.has(edge.from) || activeNodeIds.has(edge.to);

              const strokeColor = isConnectedToHover
                ? (isLight ? '#0284c7' : '#8be9fd')
                : isRelevantCategory
                ? (isLight ? 'rgba(15, 23, 42, 0.28)' : 'var(--border-strong)')
                : (isLight ? 'rgba(15, 23, 42, 0.12)' : 'var(--border-subtle)');

              return (
                <line
                  key={idx}
                  x1={`${sourceNode.x}%`}
                  y1={`${sourceNode.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke={strokeColor}
                  strokeWidth={isConnectedToHover ? 2.5 : isRelevantCategory ? 1.5 : 1.2}
                  strokeDasharray={isConnectedToHover ? 'none' : '4,4'}
                  strokeOpacity={isConnectedToHover ? 1 : isRelevantCategory ? 0.8 : 0.4}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Nodes Rendered Absolutely in Percentage */}
          {SITEMAP_NODES.map((node) => {
            const isMatch = activeNodeIds.has(node.id);
            const isHovered = hoveredNodeId === node.id;
            const isCore = node.id === 'core-hub';
            const isVisited = isNodeVisited(node.id);
            const accent = getNodeThemeAccent(node.accentColor, isLight);
            const badgeColor = isVisited ? (isLight ? '#16a34a' : '#50fa7b') : accent;

            return (
              <motion.div
                key={node.id}
                data-testid={`sitemap-node-${node.id}`}
                onClick={() => handleSelectNode(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute cursor-pointer transition-all duration-200 select-none ${
                  isHovered ? 'z-30' : 'z-10'
                } ${
                  isMatch ? 'opacity-100 scale-100' : 'opacity-35 scale-90 grayscale'
                }`}
              >
                <div
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 shadow-md relative ${
                    isVisited
                      ? 'border-[var(--accent-green)] shadow-[0_0_15px_rgba(22,163,74,0.25)] bg-[var(--bg-elevated)]'
                      : isCore
                      ? 'bg-[var(--bg-elevated)] border-[var(--accent-purple)] shadow-[0_0_25px_rgba(124,58,237,0.25)]'
                      : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]'
                  } ${isHovered ? 'scale-110 shadow-xl' : ''}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 shadow-sm relative"
                    style={{
                      backgroundColor: `${accent}20`,
                      color: accent,
                    }}
                  >
                    <Layers className="w-5 h-5" />
                    {isVisited && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent-green)] text-white dark:text-slate-950 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-[var(--text-main)] text-center whitespace-nowrap">
                    {node.label}
                  </span>

                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full mt-1 border"
                    style={{
                      color: badgeColor,
                      borderColor: `${badgeColor}60`,
                      backgroundColor: `${badgeColor}18`,
                    }}
                  >
                    {isVisited ? '✓ EXPLORADO' : node.badge}
                  </span>

                  {/* Hover Preview Tooltip (Zero Modal Travada) */}
                  {isHovered && (
                    <div
                      data-testid="node-hover-tooltip"
                      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 w-60 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-2xl z-40 text-left ${
                        node.y > 65 ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
                      }`}
                    >
                      <p className="text-[11px] font-semibold text-[var(--text-main)] leading-snug mb-1.5">
                        {node.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {node.techHighlights.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold flex items-center gap-1"
                        style={{ color: accent }}
                      >
                        <Zap className="w-3 h-3" />
                        Clique para teletransportar ➔
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View: Responsive Interactive Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {filteredNodes.map((node) => {
            const isVisited = isNodeVisited(node.id);
            const accent = getNodeThemeAccent(node.accentColor, isLight);
            const badgeColor = isVisited ? (isLight ? '#16a34a' : '#50fa7b') : accent;

            return (
              <div
                key={node.id}
                data-testid={`sitemap-node-mobile-${node.id}`}
                onClick={() => handleSelectNode(node)}
                className={`p-5 rounded-2xl bg-[var(--bg-surface)] border transition-all cursor-pointer shadow-sm flex flex-col justify-between ${
                  isVisited ? 'border-[var(--accent-green)]/70 shadow-[0_0_12px_rgba(22,163,74,0.15)]' : 'border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                      style={{
                        color: accent,
                        borderColor: `${accent}50`,
                        backgroundColor: `${accent}15`,
                      }}
                    >
                      {node.category}
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: badgeColor }}
                    >
                      {isVisited ? '✓ EXPLORADO' : node.badge}
                    </span>
                  </div>

                  <div className="text-lg font-bold text-[var(--text-main)] mb-1">
                    {node.label}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {node.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs font-semibold text-[var(--accent-purple)]">
                  <span>Teletransportar para destino</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
