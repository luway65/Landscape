/**
 * WebSocket/RPC Bridge for editor cross-application communication.
 * Manages bidirectional event flows with sub-150ms round-trip latency.
 */

import type {
  ConnectionStatus,
  EditorBridgeOptions,
  EditorCommandPayload,
  EditorEvent,
  RPCMessage,
} from '../types/editor';
import { generateMessageId } from './editorUri';

type MessageCallback = (result: unknown, error?: string) => void;

export class EditorBridge {
  private ws: WebSocket | null = null;
  private status: ConnectionStatus = 'disconnected';
  private pendingMessages = new Map<string, MessageCallback>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempts = 0;
  private statusListeners = new Set<(status: ConnectionStatus) => void>();
  private eventListeners = new Set<(event: EditorEvent) => void>();

  private readonly url: string;
  private readonly reconnectInterval: number;
  private readonly maxReconnectAttempts: number;

  constructor(options: EditorBridgeOptions = {}) {
    this.url = options.url ?? 'ws://localhost:7654';
    this.reconnectInterval = options.reconnectInterval ?? 3000;
    this.maxReconnectAttempts = options.maxReconnectAttempts ?? 10;
    if (options.onEvent) {
      this.eventListeners.add(options.onEvent);
    }
  }

  connect(): void {
    if (this.status === 'connected' || this.status === 'connecting') return;
    this.setStatus('connecting');
    this.createWebSocket();
  }

  disconnect(): void {
    this.reconnectAttempts = this.maxReconnectAttempts; // prevent reconnect
    this.clearReconnectTimer();
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
      this.ws = null;
    }
    this.setStatus('disconnected');
  }

  /**
   * Execute an editor navigation command via RPC.
   * Returns a promise that resolves with the result within timeout (default 150ms).
   */
  async executeCommand(
    payload: EditorCommandPayload,
    timeoutMs = 150
  ): Promise<unknown> {
    if (this.status !== 'connected') {
      throw new Error(`Editor bridge not connected (status: ${this.status})`);
    }

    const id = generateMessageId();
    const message: RPCMessage = {
      id,
      method: 'editor.command',
      params: payload,
    };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pendingMessages.delete(id);
        reject(new Error(`Command timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      this.pendingMessages.set(id, (result, error) => {
        clearTimeout(timer);
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });

      this.ws!.send(JSON.stringify(message));
    });
  }

  onStatusChange(listener: (status: ConnectionStatus) => void): () => void {
    this.statusListeners.add(listener);
    return () => this.statusListeners.delete(listener);
  }

  onEvent(listener: (event: EditorEvent) => void): () => void {
    this.eventListeners.add(listener);
    return () => this.eventListeners.delete(listener);
  }

  getStatus(): ConnectionStatus {
    return this.status;
  }

  private createWebSocket(): void {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.setStatus('connected');
        this.emitEvent({ type: 'connection', status: 'connected', timestamp: Date.now() });
      };

      this.ws.onmessage = (event: MessageEvent) => {
        this.handleMessage(event.data as string);
      };

      this.ws.onclose = () => {
        this.ws = null;
        this.rejectPendingMessages('Connection closed');
        this.scheduleReconnect();
      };

      this.ws.onerror = () => {
        this.setStatus('error');
        this.emitEvent({
          type: 'connection',
          status: 'error',
          timestamp: Date.now(),
          error: 'WebSocket error',
        });
      };
    } catch {
      this.setStatus('error');
    }
  }

  private handleMessage(data: string): void {
    let message: RPCMessage;
    try {
      message = JSON.parse(data) as RPCMessage;
    } catch {
      return;
    }

    if (message.id && this.pendingMessages.has(message.id)) {
      const callback = this.pendingMessages.get(message.id)!;
      this.pendingMessages.delete(message.id);
      if (message.error) {
        callback(undefined, message.error.message);
      } else {
        callback(message.result);
      }
      return;
    }

    // Handle server-pushed navigation events
    if (message.method === 'editor.navigation') {
      this.emitEvent({
        type: 'navigation',
        command: (message.params as EditorCommandPayload).command,
        location: (message.params as EditorCommandPayload).location,
        timestamp: Date.now(),
      });
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.setStatus('disconnected');
      return;
    }
    this.reconnectAttempts++;
    this.setStatus('reconnecting');
    this.reconnectTimer = setTimeout(() => {
      this.createWebSocket();
    }, this.reconnectInterval);
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private rejectPendingMessages(reason: string): void {
    for (const [id, callback] of this.pendingMessages) {
      callback(undefined, reason);
      this.pendingMessages.delete(id);
    }
  }

  private setStatus(status: ConnectionStatus): void {
    if (this.status === status) return;
    this.status = status;
    for (const listener of this.statusListeners) {
      listener(status);
    }
  }

  private emitEvent(event: EditorEvent): void {
    for (const listener of this.eventListeners) {
      listener(event);
    }
  }
}

// Singleton instance for the application
let bridgeInstance: EditorBridge | null = null;

export function getEditorBridge(options?: EditorBridgeOptions): EditorBridge {
  if (!bridgeInstance) {
    bridgeInstance = new EditorBridge(options);
  }
  return bridgeInstance;
}

export function resetEditorBridge(): void {
  if (bridgeInstance) {
    bridgeInstance.disconnect();
    bridgeInstance = null;
  }
}
