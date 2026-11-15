import React from 'react';
import { Compass, ArrowRight, Zap } from 'lucide-react';
import { SITEMAP_NODES, getNodeThemeAccent } from '../../data/sitemapNodes';
import { useOptionalExplorationGame } from '../../context/ExplorationGameContext';
import { useOptionalTheme } from '../../context/ThemeContext';

interface TrailNavigationBadgesProps {
  currentNodeId: string;
  className?: string;
  compact?: boolean;
}

export const TrailNavigationBadges: React.FC<TrailNavigationBadgesProps> = ({
  currentNodeId,
  className = '',
  compact = false,
}) => {
  const game = useOptionalExplorationGame();
  const themeCtx = useOptionalTheme();
  const isLight = themeCtx?.theme === 'light';

  const currentNode = SITEMAP_NODES.find((n) => n.id === currentNodeId);
  const nextNode = currentNode
    ? SITEMAP_NODES.find((n) => n.id === currentNode.nextSuggestedNodeId)
    : undefined;

  const handleBackToMap = () => {
    if (game) {
      game.teleportToMap();
    } else {
      document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextNode = () => {
    if (!nextNode) return;
    if (game) {
      game.teleportToNode(nextNode.id);
    } else {
      document.getElementById(nextNode.sectionAnchorId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextAccent = nextNode ? getNodeThemeAccent(nextNode.accentColor, isLight) : '#7c3aed';
  const paddingClass = compact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <button
        type="button"
        data-testid={`trail-back-map-${currentNodeId}`}
        onClick={handleBackToMap}
        className={`inline-flex items-center gap-1.5 ${paddingClass} rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--border-strong)] border border-[var(--border-subtle)] font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-all cursor-pointer shadow-xs`}
        title="Teletransportar de volta à Constelação Tecnológica"
      >
        <Compass className="w-3.5 h-3.5 text-[var(--accent-purple)] shrink-0" />
        <span>Voltar à Constelação</span>
      </button>

      {nextNode && (
        <button
          type="button"
          data-testid={`trail-next-node-${currentNodeId}`}
          onClick={handleNextNode}
          className={`inline-flex items-center gap-1.5 ${paddingClass} rounded-full font-mono font-bold border transition-all cursor-pointer shadow-xs hover:scale-[1.03] active:scale-95`}
          style={{
            color: nextAccent,
            borderColor: `${nextAccent}60`,
            backgroundColor: `${nextAccent}15`,
          }}
          title={`Teletransportar para o próximo nó da trilha: ${nextNode.label}`}
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span>Próxima Parada: {nextNode.label}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      )}
    </div>
  );
};
