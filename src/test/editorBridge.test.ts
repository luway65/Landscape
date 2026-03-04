import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { EditorBridge, resetEditorBridge } from '../lib/editorBridge';
import type { ConnectionStatus } from '../types/editor';

// Capture the latest WebSocket instance created
let mockWsInstance: InstanceType<typeof MockWebSocketClass> | null = null;

class MockWebSocketClass {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = MockWebSocketClass.CONNECTING;
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: (() => void) | null = null;
  sentMessages: string[] = [];

  constructor(url: string) {
    void url;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    mockWsInstance = this;
  }

  send(data: string) {
    this.sentMessages.push(data);
  }

  close(code?: number, reason?: string) {
    void code;
    void reason;
    this.readyState = MockWebSocketClass.CLOSED;
    this.onclose?.();
  }

  simulateOpen() {
    this.readyState = MockWebSocketClass.OPEN;
    this.onopen?.();
  }

  simulateMessage(data: string) {
    this.onmessage?.({ data });
  }

  simulateError() {
    this.onerror?.();
  }
}

vi.stubGlobal('WebSocket', MockWebSocketClass);

describe('EditorBridge', () => {
  beforeEach(() => {
    resetEditorBridge();
    mockWsInstance = null;
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('starts disconnected', () => {
    const bridge = new EditorBridge();
    expect(bridge.getStatus()).toBe('disconnected');
  });

  it('transitions to connecting on connect()', () => {
    const bridge = new EditorBridge();
    bridge.connect();
    expect(bridge.getStatus()).toBe('connecting');
  });

  it('transitions to connected when WebSocket opens', () => {
    const bridge = new EditorBridge();
    const statuses: ConnectionStatus[] = [];
    bridge.onStatusChange((s: ConnectionStatus) => statuses.push(s));

    bridge.connect();
    mockWsInstance!.simulateOpen();

    expect(bridge.getStatus()).toBe('connected');
    expect(statuses).toContain('connecting');
    expect(statuses).toContain('connected');
  });

  it('does not reconnect if manually disconnected', () => {
    const bridge = new EditorBridge({ maxReconnectAttempts: 5 });
    bridge.connect();
    mockWsInstance!.simulateOpen();
    bridge.disconnect();
    expect(bridge.getStatus()).toBe('disconnected');
  });

  it('resolves executeCommand when response arrives', async () => {
    const bridge = new EditorBridge();
    bridge.connect();
    mockWsInstance!.simulateOpen();

    const commandPromise = bridge.executeCommand({
      command: 'openAt',
      location: { uri: '/src/App.tsx', position: { line: 0, character: 0 } },
    });

    // Simulate server response
    const sentMsg = JSON.parse(mockWsInstance!.sentMessages[0]) as { id: string };
    mockWsInstance!.simulateMessage(
      JSON.stringify({ id: sentMsg.id, result: { success: true } })
    );

    const result = await commandPromise;
    expect(result).toEqual({ success: true });
  });

  it('rejects executeCommand on error response', async () => {
    const bridge = new EditorBridge();
    bridge.connect();
    mockWsInstance!.simulateOpen();

    const commandPromise = bridge.executeCommand({
      command: 'reveal',
      location: { uri: '/src/App.tsx' },
    });

    const sentMsg = JSON.parse(mockWsInstance!.sentMessages[0]) as { id: string };
    mockWsInstance!.simulateMessage(
      JSON.stringify({ id: sentMsg.id, error: { code: 404, message: 'File not found' } })
    );

    await expect(commandPromise).rejects.toThrow('File not found');
  });

  it('rejects executeCommand when not connected', async () => {
    const bridge = new EditorBridge();
    await expect(
      bridge.executeCommand({ command: 'openAt', location: { uri: '/src/App.tsx' } })
    ).rejects.toThrow('not connected');
  });

  it('emits connection events to listeners', () => {
    const events: string[] = [];
    const bridge = new EditorBridge({
      onEvent: (event: import('../types/editor').EditorEvent) => events.push(event.type),
    });
    bridge.connect();
    mockWsInstance!.simulateOpen();
    expect(events).toContain('connection');
  });
});

