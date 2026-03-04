/**
 * EditorPanel — editor extension panel with navigation commands (openAt, reveal, peek).
 * Provides a UI for managing editor connection and executing navigation commands.
 */

import React, { memo, useCallback, useState } from 'react';
import { Code2, Eye, FileSearch, FolderOpen, Minus, Plus, X } from 'lucide-react';
import type { UseEditorBridgeResult } from '../../hooks/useEditorBridge';
import type { EditorEvent, EditorLocation } from '../../types/editor';
import { ConnectionStatusBadge } from './ConnectionStatusBadge';
import { buildEditorUri } from '../../lib/editorUri';

interface EditorPanelProps {
  bridge: UseEditorBridgeResult;
  className?: string;
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  navigation: 'text-green-600',
  connection: 'text-blue-600',
};

function formatEventSummary(event: EditorEvent): string {
  if (event.type === 'navigation') {
    return `${event.command}: ${event.location.uri}${
      event.location.position
        ? `:${event.location.position.line}:${event.location.position.character}`
        : ''
    }`;
  }
  return `Connection ${event.status}${event.type === 'connection' && event.error ? `: ${event.error}` : ''}`;
}

export const EditorPanel: React.FC<EditorPanelProps> = memo(({ bridge, className = '' }) => {
  const { status, events, connect, disconnect, openAt, reveal, peek, clearEvents } = bridge;

  const [filePath, setFilePath] = useState('/src/App.tsx');
  const [line, setLine] = useState('1');
  const [character, setCharacter] = useState('0');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const getLocation = useCallback((): EditorLocation => ({
    uri: filePath.trim() || '/src/App.tsx',
    position: {
      line: Math.max(0, parseInt(line, 10) - 1),
      character: Math.max(0, parseInt(character, 10)),
    },
  }), [filePath, line, character]);

  const handleCommand = useCallback(
    async (commandFn: (location: EditorLocation) => Promise<void>) => {
      setLastError(null);
      setIsExecuting(true);
      try {
        await commandFn(getLocation());
      } catch (err) {
        setLastError(err instanceof Error ? err.message : 'Command failed');
      } finally {
        setIsExecuting(false);
      }
    },
    [getLocation]
  );

  const editorUri = buildEditorUri(getLocation());

  return (
    <section
      aria-label="Editor Extension Panel"
      className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-green-600" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-gray-800">Editor Extension</h2>
          <ConnectionStatusBadge status={status} />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized((v) => !v)}
            aria-label={isMinimized ? 'Expand panel' : 'Minimize panel'}
            className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors"
          >
            {isMinimized ? (
              <Plus className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Minus className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-4 space-y-4">
          {/* Connection Controls */}
          <div className="flex items-center gap-2">
            {status === 'disconnected' || status === 'error' ? (
              <button
                onClick={connect}
                className="flex-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
              >
                Connect to Editor
              </button>
            ) : (
              <button
                onClick={disconnect}
                className="flex-1 px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition-colors"
              >
                Disconnect
              </button>
            )}
          </div>

          {/* Navigation Input */}
          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-gray-600 mb-1">Navigation Target</legend>
            <div>
              <label htmlFor="editor-file" className="sr-only">
                File path
              </label>
              <input
                id="editor-file"
                type="text"
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                placeholder="/src/App.tsx"
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
                aria-label="File path"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="editor-line" className="sr-only">
                  Line number
                </label>
                <input
                  id="editor-line"
                  type="number"
                  min="1"
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  placeholder="Line"
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Line number"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="editor-col" className="sr-only">
                  Column number
                </label>
                <input
                  id="editor-col"
                  type="number"
                  min="0"
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  placeholder="Col"
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Column number"
                />
              </div>
            </div>

            {/* URI Preview */}
            <div
              className="flex items-center gap-1.5 text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded border border-gray-100"
              aria-label="Editor URI preview"
            >
              <span className="text-gray-300">→</span>
              <span className="truncate">{editorUri}</span>
            </div>
          </fieldset>

          {/* Command Buttons */}
          <div
            role="group"
            aria-label="Editor navigation commands"
            className="grid grid-cols-3 gap-2"
          >
            <button
              onClick={() => handleCommand(openAt)}
              disabled={status !== 'connected' || isExecuting}
              className="flex flex-col items-center gap-1 px-2 py-2 text-xs bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              aria-label="Open file at position"
              title="openAt — Open file and navigate to position"
            >
              <FolderOpen className="h-4 w-4" aria-hidden="true" />
              openAt
            </button>
            <button
              onClick={() => handleCommand(reveal)}
              disabled={status !== 'connected' || isExecuting}
              className="flex flex-col items-center gap-1 px-2 py-2 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Reveal in editor"
              title="reveal — Reveal and scroll to position"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              reveal
            </button>
            <button
              onClick={() => handleCommand(peek)}
              disabled={status !== 'connected' || isExecuting}
              className="flex flex-col items-center gap-1 px-2 py-2 text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              aria-label="Peek definition"
              title="peek — Show inline peek definition"
            >
              <FileSearch className="h-4 w-4" aria-hidden="true" />
              peek
            </button>
          </div>

          {/* Error Display */}
          {lastError && (
            <div
              role="alert"
              className="flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            >
              <span className="flex-1">{lastError}</span>
              <button
                onClick={() => setLastError(null)}
                aria-label="Dismiss error"
                className="shrink-0 hover:text-red-900"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Event Log */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-gray-600">Event Log</span>
              {events.length > 0 && (
                <button
                  onClick={clearEvents}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear event log"
                >
                  Clear
                </button>
              )}
            </div>
            <div
              role="log"
              aria-label="Editor event log"
              aria-live="polite"
              className="h-24 overflow-y-auto rounded-lg bg-gray-900 p-2 space-y-0.5"
            >
              {events.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No events yet…</p>
              ) : (
                [...events].reverse().map((event, i) => (
                  <div key={i} className="font-mono text-xs leading-relaxed">
                    <span className="text-gray-500">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>{' '}
                    <span className={EVENT_TYPE_COLORS[event.type] ?? 'text-gray-400'}>
                      [{event.type}]
                    </span>{' '}
                    <span className="text-gray-200">{formatEventSummary(event)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

EditorPanel.displayName = 'EditorPanel';
