/**
 * ConnectionStatusBadge — visual indicator for editor bridge connection state.
 */

import React from 'react';
import type { ConnectionStatus } from '../../types/editor';

interface ConnectionStatusBadgeProps {
  status: ConnectionStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  ConnectionStatus,
  { label: string; color: string; dotColor: string; animate: boolean }
> = {
  disconnected: {
    label: 'Disconnected',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    dotColor: 'bg-gray-400',
    animate: false,
  },
  connecting: {
    label: 'Connecting…',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    dotColor: 'bg-yellow-400',
    animate: true,
  },
  connected: {
    label: 'Connected',
    color: 'bg-green-50 text-green-700 border-green-200',
    dotColor: 'bg-green-500',
    animate: false,
  },
  error: {
    label: 'Error',
    color: 'bg-red-50 text-red-700 border-red-200',
    dotColor: 'bg-red-500',
    animate: false,
  },
  reconnecting: {
    label: 'Reconnecting…',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    dotColor: 'bg-orange-400',
    animate: true,
  },
};

export const ConnectionStatusBadge: React.FC<ConnectionStatusBadgeProps> = React.memo(
  ({ status, className = '' }) => {
    const config = STATUS_CONFIG[status];

    return (
      <span
        role="status"
        aria-label={`Editor connection status: ${config.label}`}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color} ${className}`}
      >
        <span
          className={`h-2 w-2 rounded-full ${config.dotColor} ${config.animate ? 'animate-pulse' : ''}`}
          aria-hidden="true"
        />
        {config.label}
      </span>
    );
  }
);

ConnectionStatusBadge.displayName = 'ConnectionStatusBadge';
