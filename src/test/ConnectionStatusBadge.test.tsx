import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConnectionStatusBadge } from '../components/editor/ConnectionStatusBadge';
import type { ConnectionStatus } from '../types/editor';

const STATUSES: Array<{ status: ConnectionStatus; label: string }> = [
  { status: 'disconnected', label: 'Disconnected' },
  { status: 'connecting', label: 'Connecting…' },
  { status: 'connected', label: 'Connected' },
  { status: 'error', label: 'Error' },
  { status: 'reconnecting', label: 'Reconnecting…' },
];

describe('ConnectionStatusBadge', () => {
  for (const { status, label } of STATUSES) {
    it(`renders "${label}" for status "${status}"`, () => {
      render(<ConnectionStatusBadge status={status} />);
      expect(screen.getByRole('status')).toHaveTextContent(label);
    });
  }

  it('has accessible aria-label', () => {
    render(<ConnectionStatusBadge status="connected" />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Editor connection status: Connected'
    );
  });
});
