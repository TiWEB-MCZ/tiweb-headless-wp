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
} from 'lucide-react';
import { SITEMAP_NODES, SITEMAP_EDGES, SitemapNode } from '../../data/sitemapNodes';
import { NodePreviewModal } from './NodePreviewModal';

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
  const [selectedNode, setSelectedNode] = useState<SitemapNode | null>(null);
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
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[#bd93f9]/40 text-xs font-mono text-[var(--accent-purple)] mb-3 font-semibold">
              <Compass className="w-4 h-4 animate-spin-slow" />
              NAVEGAÇÃO ESPACIAL & ÁRVORE TECNOLÓGICA
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)]">
              Constelação Tecnológica & Mapa do Site
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl">
              Navegue visualmente por todos os pilares do ecossistema TIWEB. Clique em qualquer nó para inspecionar arquitetura, tecnologias e teletransportar-se instantaneamente.
            </p>
          </div>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar mapa"
              className="self-end md:self-start p-3 rounded-2xl bg-[var(--bg-elevated)] text-[var(--text-main)] hover:bg-[var(--border-strong)] transition-all cursor-pointer shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#bd93f9] to-[#8be9fd] text-slate-950 font-bold shadow-md'
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

              return (
                <line
                  key={idx}
                  x1={`${sourceNode.x}%`}
                  y1={`${sourceNode.y}%`}
                  x2={`${targetNode.x}%`}
                  y2={`${targetNode.y}%`}
                  stroke={
                    isConnectedToHover
                      ? '#8be9fd'
                      : isRelevantCategory
                      ? 'var(--border-strong)'
                      : 'var(--border-subtle)'
                  }
                  strokeWidth={isConnectedToHover ? 2.5 : 1.2}
                  strokeDasharray={isConnectedToHover ? 'none' : '4,4'}
                  strokeOpacity={isConnectedToHover ? 0.9 : isRelevantCategory ? 0.6 : 0.25}
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

            return (
              <motion.div
                key={node.id}
                data-testid={`sitemap-node-${node.id}`}
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-10 cursor-pointer transition-all duration-200 select-none ${
                  isMatch ? 'opacity-100 scale-100' : 'opacity-35 scale-90 grayscale'
                }`}
              >
                <div
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${
                    isCore
                      ? 'bg-[var(--bg-elevated)] border-[#bd93f9] shadow-[0_0_25px_rgba(189,147,249,0.35)]'
                      : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:border-[#8be9fd]'
                  } ${isHovered ? 'scale-110 shadow-xl' : ''}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 shadow-sm"
                    style={{
                      backgroundColor: `${node.accentColor}20`,
                      color: node.accentColor,
                    }}
                  >
                    <Layers className="w-5 h-5" />
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-[var(--text-main)] text-center whitespace-nowrap">
                    {node.label}
                  </span>

                  <span
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded-full mt-1 border"
                    style={{
                      color: node.accentColor,
                      borderColor: `${node.accentColor}40`,
                      backgroundColor: `${node.accentColor}10`,
                    }}
                  >
                    {node.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View: Responsive Interactive Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {filteredNodes.map((node) => (
            <div
              key={node.id}
              data-testid={`sitemap-node-mobile-${node.id}`}
              onClick={() => setSelectedNode(node)}
              className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#8be9fd] transition-all cursor-pointer shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                    style={{
                      color: node.accentColor,
                      borderColor: `${node.accentColor}50`,
                      backgroundColor: `${node.accentColor}15`,
                    }}
                  >
                    {node.category}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-[var(--text-muted)]">
                    {node.badge}
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
                <span>Inspecionar nó</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Node Preview Modal Drawer */}
      <NodePreviewModal
        node={selectedNode}
        isOpen={Boolean(selectedNode)}
        onClose={() => setSelectedNode(null)}
      />
    </section>
  );
};
