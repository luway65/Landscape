/**
 * React hook for editor bridge connection management.
 * Manages connection state and provides navigation command helpers.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ConnectionStatus, EditorEvent, EditorLocation } from '../types/editor';
import { EditorBridge } from '../lib/editorBridge';

export interface UseEditorBridgeOptions {
  url?: string;
  autoConnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export interface UseEditorBridgeResult {
  status: ConnectionStatus;
  events: EditorEvent[];
  connect: () => void;
  disconnect: () => void;
  openAt: (location: EditorLocation, options?: { preserveFocus?: boolean }) => Promise<void>;
  reveal: (location: EditorLocation) => Promise<void>;
  peek: (location: EditorLocation) => Promise<void>;
  clearEvents: () => void;
}

export function useEditorBridge(options: UseEditorBridgeOptions = {}): UseEditorBridgeResult {
  const {
    url = 'ws://localhost:7654',
    autoConnect = false,
    reconnectInterval = 3000,
    maxReconnectAttempts = 10,
  } = options;

  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [events, setEvents] = useState<EditorEvent[]>([]);
  const bridgeRef = useRef<EditorBridge | null>(null);

  useEffect(() => {
    const bridge = new EditorBridge({
      url,
      reconnectInterval,
      maxReconnectAttempts,
    });
    bridgeRef.current = bridge;

    const unsubStatus = bridge.onStatusChange(setStatus);
    const unsubEvent = bridge.onEvent((event) => {
      setEvents((prev) => [...prev.slice(-49), event]);
    });

    if (autoConnect) {
      bridge.connect();
    }

    return () => {
      unsubStatus();
      unsubEvent();
      bridge.disconnect();
    };
  }, [url, autoConnect, reconnectInterval, maxReconnectAttempts]);

  const connect = useCallback(() => {
    bridgeRef.current?.connect();
  }, []);

  const disconnect = useCallback(() => {
    bridgeRef.current?.disconnect();
  }, []);

  const openAt = useCallback(
    async (location: EditorLocation, options?: { preserveFocus?: boolean }) => {
      await bridgeRef.current?.executeCommand({
        command: 'openAt',
        location,
        options: { preserveFocus: options?.preserveFocus ?? false },
      });
    },
    []
  );

  const reveal = useCallback(async (location: EditorLocation) => {
    await bridgeRef.current?.executeCommand({
      command: 'reveal',
      location,
      options: { revealType: 'inCenterIfOutsideViewport' },
    });
  }, []);

  const peek = useCallback(async (location: EditorLocation) => {
    await bridgeRef.current?.executeCommand({
      command: 'peek',
      location,
      options: { preview: true, preserveFocus: true },
    });
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return { status, events, connect, disconnect, openAt, reveal, peek, clearEvents };
}
