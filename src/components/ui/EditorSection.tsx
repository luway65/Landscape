/**
 * EditorSection — showcases editor extension features on the landing page
 */

import React, { memo } from 'react';
import { Activity, Code2, Zap } from 'lucide-react';
import { EditorPanel } from '../editor/EditorPanel';
import type { UseEditorBridgeResult } from '../../hooks/useEditorBridge';

interface EditorSectionProps {
  bridge: UseEditorBridgeResult;
}

const FEATURES = [
  {
    icon: Code2,
    title: 'Navigation Commands',
    description: 'openAt, reveal, and peek commands for precise editor navigation with sub-150ms latency.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Activity,
    title: 'WebSocket Bridge',
    description: 'Real-time bidirectional communication via WebSocket/RPC bridge with automatic reconnection.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'Protocol URI Handler',
    description: 'Handles editor protocol URIs (vscode://) for seamless cross-application navigation.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

export const EditorSection: React.FC<EditorSectionProps> = memo(({ bridge }) => (
  <section id="editor" aria-labelledby="editor-heading" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2
          id="editor-heading"
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Editor Integration Tools
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Seamlessly connect your workflow with our editor extension bridge — navigate code,
          manage context, and stay in flow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Feature list */}
        <div className="space-y-6">
          {FEATURES.map(({ icon: Icon, title, description, color, bg }) => (
            <div key={title} className="flex gap-4">
              <div className={`shrink-0 p-3 rounded-xl ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs font-mono text-gray-500 mb-1">// Example navigation command</p>
            <pre className="text-xs font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">
{`await bridge.openAt({
  uri: '/src/components/App.tsx',
  position: { line: 42, character: 0 }
});`}
            </pre>
          </div>
        </div>

        {/* Interactive Panel */}
        <EditorPanel bridge={bridge} />
      </div>
    </div>
  </section>
));

EditorSection.displayName = 'EditorSection';
