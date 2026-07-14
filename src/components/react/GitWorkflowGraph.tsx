import { useState, type ReactNode } from 'react';
import type { GitGraphStep, GitGraphLegendItem } from '../../content/git-graph';
import './git-graph.css';

interface Props {
  steps: GitGraphStep[];
  hint: string;
  ariaLabel: string;
  legend: GitGraphLegendItem[];
  renderGraph: (state: string) => ReactNode;
}

export default function GitWorkflowGraph({ steps, hint, ariaLabel, legend, renderGraph }: Props) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? '');
  const active = steps.find((s) => s.id === activeId) ?? steps[0];

  return (
    <div className="git-graph">
      <p className="flow-hint">{hint}</p>

      <div className="git-graph__steps" role="tablist" aria-label={ariaLabel}>
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={activeId === step.id}
            className={`git-graph__step${activeId === step.id ? ' git-graph__step--active' : ''}`}
            onClick={() => setActiveId(step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className="git-graph__canvas">
        {active && renderGraph(active.graphState)}
        <div className="git-graph__legend">
          {legend.map((item) => (
            <span key={item.label} className="git-graph__legend-item">
              <span className={`git-graph__legend-dot ${item.dotClass}`} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {active && (
        <div className="git-graph__detail" role="tabpanel">
          <h3 className="git-graph__detail-title">{active.title}</h3>
          <p className="git-graph__detail-desc">{active.description}</p>
          {active.command && (
            <pre>
              <code>{active.command}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
