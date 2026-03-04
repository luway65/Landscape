/**
 * Editor Extension Types for ScaleWithEvergreen.com
 * Provides TypeScript interfaces for editor navigation and communication.
 */

export interface EditorPosition {
  line: number;
  character: number;
}

export interface EditorRange {
  start: EditorPosition;
  end: EditorPosition;
}

export interface EditorLocation {
  uri: string;
  position?: EditorPosition;
  range?: EditorRange;
}

export type EditorCommand = 'openAt' | 'reveal' | 'peek' | 'close' | 'focus';

export interface EditorCommandPayload {
  command: EditorCommand;
  location: EditorLocation;
  options?: {
    preserveFocus?: boolean;
    preview?: boolean;
    revealType?: 'default' | 'inCenter' | 'inCenterIfOutsideViewport' | 'atTop';
  };
}

export type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error'
  | 'reconnecting';

export interface RPCMessage {
  id: string;
  method: string;
  params?: unknown;
  result?: unknown;
  error?: { code: number; message: string };
}

export interface NavigationEvent {
  type: 'navigation';
  command: EditorCommand;
  location: EditorLocation;
  timestamp: number;
}

export interface ConnectionEvent {
  type: 'connection';
  status: ConnectionStatus;
  timestamp: number;
  error?: string;
}

export type EditorEvent = NavigationEvent | ConnectionEvent;

export interface EditorBridgeOptions {
  url?: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  onEvent?: (event: EditorEvent) => void;
}
