import { useState } from 'react';
import type { BranchWorkflowStep } from '../../content/branches';
import './branch-graph.css';

interface Props {
  steps: BranchWorkflowStep[];
}

type GraphState = BranchWorkflowStep['graphState'];

function BranchSvg({ state }: { state: GraphState }) {
  const showBranch = state !== 'start';
  const showFeatureCommits = state === 'work' || state === 'push' || state === 'merge';
  const showMerged = state === 'merge';

  return (
    <svg
      className="branch-graph__svg"
      viewBox="0 0 480 160"
      width="480"
      height="160"
      aria-hidden="true"
    >
      {/* main line */}
      <line x1="40" y1="40" x2="440" y2="40" stroke="var(--color-border)" strokeWidth="2" />

      {/* main commits */}
      <circle cx="80" cy="40" r="8" fill="#2563eb" />
      <circle cx="160" cy="40" r="8" fill="#2563eb" />
      <circle cx="240" cy="40" r="8" fill="#2563eb" opacity={showMerged ? 1 : 0.35} />
      <circle cx="320" cy="40" r="8" fill="#2563eb" opacity={showMerged ? 1 : 0.35} />
      <circle cx="400" cy="40" r="8" fill={showMerged ? '#16a34a' : '#2563eb'} opacity={showMerged ? 1 : 0.35} />

      <text x="80" y="22" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">main</text>

      {showBranch && (
        <>
          {/* branch split */}
          <path
            d="M 240 40 Q 260 40 270 70"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
          />

          {/* feature line */}
          <line x1="270" y1="70" x2="370" y2="70" stroke="var(--color-border)" strokeWidth="2" />

          <circle cx="270" cy="70" r="7" fill="var(--color-accent)" />
          <circle
            cx="310"
            cy="70"
            r="7"
            fill={showFeatureCommits ? 'var(--color-accent)' : 'var(--color-border)'}
            opacity={showFeatureCommits ? 1 : 0.4}
          />
          <circle
            cx="350"
            cy="70"
            r="7"
            fill={showFeatureCommits ? 'var(--color-accent)' : 'var(--color-border)'}
            opacity={showFeatureCommits ? 1 : 0.4}
          />

          <text x="310" y="100" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">
            feature/login
          </text>

          {/* merge back */}
          {showMerged && (
            <path
              d="M 370 70 Q 390 55 400 40"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          )}
        </>
      )}

      {/* labels */}
      {state === 'start' && (
        <text x="400" y="58" fontSize="10" fill="var(--color-text-muted)">← du er her</text>
      )}
      {state === 'branch' && (
        <text x="270" y="58" fontSize="10" fill="var(--color-accent)">← ny branch</text>
      )}
      {state === 'work' && (
        <text x="350" y="58" fontSize="10" fill="var(--color-accent)">← commits</text>
      )}
      {state === 'push' && (
        <text x="350" y="58" fontSize="10" fill="var(--color-accent)">→ GitHub</text>
      )}
      {state === 'merge' && (
        <text x="400" y="58" fontSize="10" fill="#16a34a">← merged!</text>
      )}
    </svg>
  );
}

export default function BranchWorkflowVisualizer({ steps }: Props) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? '');
  const active = steps.find((s) => s.id === activeId) ?? steps[0];

  return (
    <div className="branch-graph">
      <p className="flow-hint">Klik på trinene og se hvordan feature branch og main hænger sammen</p>

      <div className="branch-graph__steps" role="tablist" aria-label="Branch workflow">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={activeId === step.id}
            className={`branch-graph__step${activeId === step.id ? ' branch-graph__step--active' : ''}`}
            onClick={() => setActiveId(step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className="branch-graph__canvas">
        {active && <BranchSvg state={active.graphState} />}
        <div className="branch-graph__legend">
          <span className="branch-graph__legend-item">
            <span className="branch-graph__legend-dot branch-graph__legend-dot--main" /> main
          </span>
          <span className="branch-graph__legend-item">
            <span className="branch-graph__legend-dot branch-graph__legend-dot--feature" /> feature branch
          </span>
          <span className="branch-graph__legend-item">
            <span className="branch-graph__legend-dot branch-graph__legend-dot--new" /> merge
          </span>
        </div>
      </div>

      {active && (
        <div className="branch-graph__detail" role="tabpanel">
          <h3 className="branch-graph__detail-title">{active.title}</h3>
          <p className="branch-graph__detail-desc">{active.description}</p>
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
