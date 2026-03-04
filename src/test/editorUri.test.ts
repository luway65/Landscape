import { describe, expect, it } from 'vitest';
import { buildEditorUri, formatPosition, isEditorUri, parseEditorUri } from '../lib/editorUri';

describe('buildEditorUri', () => {
  it('builds URI with position', () => {
    const uri = buildEditorUri({
      uri: '/src/App.tsx',
      position: { line: 10, character: 5 },
    });
    expect(uri).toBe('vscode://file//src/App.tsx:10:5');
  });

  it('builds URI without position', () => {
    const uri = buildEditorUri({ uri: '/src/App.tsx' });
    expect(uri).toBe('vscode://file//src/App.tsx');
  });

  it('strips file:// prefix', () => {
    const uri = buildEditorUri({
      uri: 'file:///src/App.tsx',
      position: { line: 0, character: 0 },
    });
    // file:///src/App.tsx → strips 'file://' prefix → '/src/App.tsx' → URI becomes vscode://file//src/App.tsx
    expect(uri).toBe('vscode://file//src/App.tsx:0:0');
  });
});

describe('parseEditorUri', () => {
  it('parses URI with position', () => {
    const result = parseEditorUri('vscode://file//src/App.tsx:10:5');
    expect(result).toEqual({
      uri: 'file:///src/App.tsx',
      position: { line: 10, character: 5 },
    });
  });

  it('parses URI without position', () => {
    const result = parseEditorUri('vscode://file//src/App.tsx');
    expect(result).toEqual({ uri: 'file:///src/App.tsx' });
  });

  it('returns null for invalid URI', () => {
    expect(parseEditorUri('invalid://uri')).toBeNull();
  });
});

describe('isEditorUri', () => {
  it('identifies vscode URIs', () => {
    expect(isEditorUri('vscode://file//src/App.tsx')).toBe(true);
  });

  it('rejects non-editor URIs', () => {
    expect(isEditorUri('https://scalewithevergreen.com')).toBe(false);
    expect(isEditorUri('file:///src/App.tsx')).toBe(false);
  });
});

describe('formatPosition', () => {
  it('formats line and character as 1-based', () => {
    expect(formatPosition({ line: 0, character: 0 })).toBe('Ln 1, Col 1');
    expect(formatPosition({ line: 9, character: 4 })).toBe('Ln 10, Col 5');
  });
});
