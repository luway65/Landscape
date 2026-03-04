/**
 * Editor Protocol URI utilities for ScaleWithEvergreen editor extension.
 * Handles parsing and building editor protocol URIs for seamless navigation.
 */

import type { EditorLocation, EditorPosition } from '../types/editor';

const EDITOR_PROTOCOL = 'vscode';

/**
 * Build an editor protocol URI from a location.
 * Format: vscode://file/<path>:<line>:<character>
 */
export function buildEditorUri(location: EditorLocation): string {
  const { uri, position } = location;

  // Normalize the URI to a file path
  const filePath = uri.startsWith('file://') ? uri.slice(7) : uri;

  if (position) {
    return `${EDITOR_PROTOCOL}://file/${filePath}:${position.line}:${position.character}`;
  }
  return `${EDITOR_PROTOCOL}://file/${filePath}`;
}

/**
 * Parse an editor protocol URI into an EditorLocation.
 */
export function parseEditorUri(uri: string): EditorLocation | null {
  try {
    // Match vscode://file/<path>:<line>:<character> or vscode://file/<path>
    const match = uri.match(
      /^vscode:\/\/file\/(.+?)(?::(\d+):(\d+))?$/
    );
    if (!match) return null;

    const [, path, line, character] = match;
    const location: EditorLocation = { uri: `file://${path}` };

    if (line !== undefined && character !== undefined) {
      location.position = {
        line: parseInt(line, 10),
        character: parseInt(character, 10),
      };
    }

    return location;
  } catch {
    return null;
  }
}

/**
 * Check if a given URI is an editor protocol URI.
 */
export function isEditorUri(uri: string): boolean {
  return uri.startsWith(`${EDITOR_PROTOCOL}://`);
}

/**
 * Generate a unique message ID for RPC calls.
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Format an editor position for display.
 */
export function formatPosition(position: EditorPosition): string {
  return `Ln ${position.line + 1}, Col ${position.character + 1}`;
}
