import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { SITEMAP_NODES } from '../data/sitemapNodes';

export interface ExplorationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface TeleportState {
  isActive: boolean;
  targetLabel: string;
  targetBadge?: string;
  accentColor?: string;
}

interface ExplorationGameContextType {
  visitedNodeIds: string[];
  totalNodes: number;
  visitedCount: number;
  percentage: number;
  currentRank: string;
  badges: ExplorationBadge[];
  isRewardUnlocked: boolean;
  teleportState: TeleportState;
  markNodeVisited: (nodeId: string) => void;
  resetProgress: () => void;
  isNodeVisited: (nodeId: string) => boolean;
  teleportToNode: (nodeId: string) => void;
  teleportToMap: () => void;
}

const STORAGE_KEY = 'tiweb_sitemap_explored_nodes_v1';

const ExplorationGameContext = createContext<ExplorationGameContextType | undefined>(undefined);

export const ExplorationGameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visitedNodeIds, setVisitedNodeIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visitedNodeIds));
    } catch {
      // Storage unavailable or disabled
    }
  }, [visitedNodeIds]);

  const totalNodes = SITEMAP_NODES.length;
  const visitedCount = visitedNodeIds.length;
  const percentage = Math.min(100, Math.round((visitedCount / totalNodes) * 100));

  const badges = useMemo<ExplorationBadge[]>(() => {
    const aiNodeIds = ['smartcontact', 'lisa', 'smartlegal'];
    const hasAllAi = aiNodeIds.every((id) => visitedNodeIds.includes(id));
    const hasAtLeast3 = visitedCount >= 3;
    const hasAll = visitedCount >= totalNodes;

    return [
      {
        id: 'curious-architect',
        name: 'Arquiteto Curioso',
        description: 'Explorou pelo menos 3 pilares do ecossistema TIWEB.',
        icon: 'Compass',
        unlocked: hasAtLeast3,
      },
      {
        id: 'ai-strategist',
        name: 'Estrategista de IA',
        description: 'Inspecionou todos os nós de Inteligência Artificial & Agentes Cognitivos.',
        icon: 'Bot',
        unlocked: hasAllAi,
      },
      {
        id: 'ecosystem-master',
        name: 'Mestre do Ecossistema',
        description: 'Desbloqueou 100% de todos os nós de arquitetura e tecnologia.',
        icon: 'Award',
        unlocked: hasAll,
      },
    ];
  }, [visitedNodeIds, visitedCount, totalNodes]);

  const currentRank = useMemo(() => {
    if (percentage >= 100) return 'Mestre do Ecossistema';
    if (percentage >= 70) return 'Estrategista de IA';
    if (percentage >= 30) return 'Arquiteto Curioso';
    return 'Explorador Novato';
  }, [percentage]);

  const isRewardUnlocked = percentage >= 100;

  const [teleportState, setTeleportState] = useState<TeleportState>({
    isActive: false,
    targetLabel: '',
  });
  const scrollTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const clearTeleportTimers = useCallback(() => {
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
    }
    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTeleportTimers();
  }, [clearTeleportTimers]);

  const markNodeVisited = useCallback((nodeId: string) => {
    setVisitedNodeIds((prev) => {
      if (prev.includes(nodeId)) return prev;
      return [...prev, nodeId];
    });
  }, []);

  const triggerTeleportScroll = useCallback(
    (anchorId: string, label: string, badge?: string, accentColor?: string) => {
      clearTeleportTimers();
      setTeleportState({
        isActive: true,
        targetLabel: label,
        targetBadge: badge,
        accentColor,
      });

      const scrollToAnchor = () => {
        if (typeof document === 'undefined') return;
        const el = document.getElementById(anchorId);
        if (el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      scrollTimerRef.current = window.setTimeout(scrollToAnchor, 140);
      fadeTimerRef.current = window.setTimeout(() => {
        setTeleportState({ isActive: false, targetLabel: '' });
      }, 420);
    },
    [clearTeleportTimers]
  );

  const teleportToNode = useCallback(
    (nodeId: string) => {
      const node = SITEMAP_NODES.find((n) => n.id === nodeId);
      if (!node) return;
      markNodeVisited(node.id);
      triggerTeleportScroll(node.sectionAnchorId, node.label, node.category, node.accentColor);
    },
    [markNodeVisited, triggerTeleportScroll]
  );

  const teleportToMap = useCallback(() => {
    triggerTeleportScroll('mapa', 'Constelação Tecnológica', 'HUB CENTRAL', '#bd93f9');
  }, [triggerTeleportScroll]);

  const resetProgress = useCallback(() => {
    setVisitedNodeIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const isNodeVisited = useCallback(
    (nodeId: string) => {
      return visitedNodeIds.includes(nodeId);
    },
    [visitedNodeIds]
  );

  return (
    <ExplorationGameContext.Provider
      value={{
        visitedNodeIds,
        totalNodes,
        visitedCount,
        percentage,
        currentRank,
        badges,
        isRewardUnlocked,
        teleportState,
        markNodeVisited,
        resetProgress,
        isNodeVisited,
        teleportToNode,
        teleportToMap,
      }}
    >
      {children}
    </ExplorationGameContext.Provider>
  );
};

export const useExplorationGame = (): ExplorationGameContextType => {
  const context = useContext(ExplorationGameContext);
  if (!context) {
    throw new Error('useExplorationGame must be used within an ExplorationGameProvider');
  }
  return context;
};

export const useOptionalExplorationGame = (): ExplorationGameContextType | undefined => {
  return useContext(ExplorationGameContext);
};
