import { Fragment, useState } from 'react';
import type { FlowNode } from '../../content/releases';
import './flow-diagram.css';

interface Props {
  nodes: FlowNode[];
}

export default function ReleaseFlowDiagram({ nodes }: Props) {
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? '');
  const activeNode = nodes.find((n) => n.id === activeId) ?? nodes[0];
  const [copied, setCopied] = useState(false);

  async function copyCommand(command: string) {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flow-diagram">
      <p className="flow-hint">Klik på hvert trin for at se forklaring og kommandoer</p>

      <div className="flow-nodes" role="tablist" aria-label="Release-flow">
        {nodes.map((node, index) => (
          <Fragment key={node.id}>
            <button
              type="button"
              role="tab"
              aria-selected={activeId === node.id}
              aria-controls={`flow-panel-${node.id}`}
              id={`flow-tab-${node.id}`}
              className={`flow-node__button${activeId === node.id ? ' flow-node__button--active' : ''}`}
              onClick={() => setActiveId(node.id)}
            >
              {node.label}
            </button>
            {index < nodes.length - 1 && (
              <span className="flow-arrow" aria-hidden="true">
                →
              </span>
            )}
          </Fragment>
        ))}
      </div>

      {activeNode && (
        <div
          className="flow-detail"
          role="tabpanel"
          id={`flow-panel-${activeNode.id}`}
          aria-labelledby={`flow-tab-${activeNode.id}`}
        >
          <h3 className="flow-detail__title">{activeNode.title}</h3>
          <p className="flow-detail__description">{activeNode.description}</p>
          {activeNode.command && (
            <div className="flow-detail__command">
              <pre>
                <code>{activeNode.command}</code>
              </pre>
              <button
                type="button"
                className={`flow-detail__copy${copied ? ' flow-detail__copy--copied' : ''}`}
                onClick={() => copyCommand(activeNode.command!)}
                aria-label="Kopier kommando"
              >
                {copied ? 'Kopieret!' : 'Kopier'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
