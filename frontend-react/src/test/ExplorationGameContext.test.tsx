import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import {
  ExplorationGameProvider,
  useExplorationGame,
} from '../context/ExplorationGameContext';

describe('ExplorationGameContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ExplorationGameProvider>{children}</ExplorationGameProvider>
  );

  it('initializes with 0 visited nodes if storage is empty', () => {
    const { result } = renderHook(() => useExplorationGame(), { wrapper });
    expect(result.current.visitedNodeIds).toEqual([]);
    expect(result.current.visitedCount).toBe(0);
    expect(result.current.percentage).toBe(0);
    expect(result.current.currentRank).toBe('Explorador Novato');
    expect(result.current.isRewardUnlocked).toBe(false);
  });

  it('marks node as visited and calculates percentage', () => {
    const { result } = renderHook(() => useExplorationGame(), { wrapper });

    act(() => {
      result.current.markNodeVisited('core-hub');
    });

    expect(result.current.visitedNodeIds).toContain('core-hub');
    expect(result.current.visitedCount).toBe(1);
    expect(result.current.percentage).toBe(10);
  });

  it('unlocks Arquiteto Curioso badge when 3 or more nodes are visited', () => {
    const { result } = renderHook(() => useExplorationGame(), { wrapper });

    act(() => {
      result.current.markNodeVisited('core-hub');
      result.current.markNodeVisited('smartcontact');
      result.current.markNodeVisited('mas-educa-ia');
    });

    expect(result.current.visitedCount).toBe(3);
    const curiousBadge = result.current.badges.find((b) => b.id === 'curious-architect');
    expect(curiousBadge?.unlocked).toBe(true);
    expect(result.current.currentRank).toBe('Arquiteto Curioso');
  });

  it('unlocks Estrategista de IA badge when all AI nodes are visited', () => {
    const { result } = renderHook(() => useExplorationGame(), { wrapper });

    act(() => {
      result.current.markNodeVisited('smartcontact');
      result.current.markNodeVisited('lisa');
      result.current.markNodeVisited('smartlegal');
    });

    const aiBadge = result.current.badges.find((b) => b.id === 'ai-strategist');
    expect(aiBadge?.unlocked).toBe(true);
  });

  it('unlocks reward and Mestre do Ecossistema badge when 100% of nodes are visited', () => {
    const { result } = renderHook(() => useExplorationGame(), { wrapper });

    const allNodeIds = [
      'core-hub',
      'smartcontact',
      'mas-educa-ia',
      'lisa',
      'spedfacil',
      'smartlegal',
      'ssot-engineering',
      'cases-showcase',
      'roi-calculator',
      'contact-lisa',
    ];

    act(() => {
      allNodeIds.forEach((id) => result.current.markNodeVisited(id));
    });

    expect(result.current.visitedCount).toBe(10);
    expect(result.current.percentage).toBe(100);
    expect(result.current.isRewardUnlocked).toBe(true);
    expect(result.current.currentRank).toBe('Mestre do Ecossistema');
  });

  it('persists visited nodes across reloads', () => {
    const { result, unmount } = renderHook(() => useExplorationGame(), { wrapper });

    act(() => {
      result.current.markNodeVisited('smartcontact');
    });
    unmount();

    const { result: reloadedResult } = renderHook(() => useExplorationGame(), { wrapper });
    expect(reloadedResult.current.visitedNodeIds).toContain('smartcontact');
    expect(reloadedResult.current.visitedCount).toBe(1);
  });

  it('teleports directly to a node, marks it visited, activates overlay state and scrolls', () => {
    vi.useFakeTimers();
    const scrollIntoViewMock = vi.fn();
    const mockElement = { scrollIntoView: scrollIntoViewMock } as unknown as HTMLElement;
    const getElementSpy = vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    const { result } = renderHook(() => useExplorationGame(), { wrapper });

    act(() => {
      result.current.teleportToNode('smartcontact');
    });

    expect(result.current.isNodeVisited('smartcontact')).toBe(true);
    expect(result.current.teleportState.isActive).toBe(true);
    expect(result.current.teleportState.targetLabel).toBe('SmartContact');

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(getElementSpy).toHaveBeenCalledWith('produto-smartcontact');
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current.teleportState.isActive).toBe(false);

    getElementSpy.mockRestore();
    vi.useRealTimers();
  });

  it('teleports back to constellation map anchor', () => {
    vi.useFakeTimers();
    const scrollIntoViewMock = vi.fn();
    const mockElement = { scrollIntoView: scrollIntoViewMock } as unknown as HTMLElement;
    const getElementSpy = vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    const { result } = renderHook(() => useExplorationGame(), { wrapper });

    act(() => {
      result.current.teleportToMap();
    });

    expect(result.current.teleportState.isActive).toBe(true);
    expect(result.current.teleportState.targetLabel).toBe('Constelação Tecnológica');

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(getElementSpy).toHaveBeenCalledWith('mapa');
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    getElementSpy.mockRestore();
    vi.useRealTimers();
  });
});
