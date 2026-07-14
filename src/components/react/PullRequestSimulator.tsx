import { useState } from 'react';
import type { PrWorkflowStep } from '../../content/pull-requests';
import './pr-simulator.css';

interface Props {
  steps: PrWorkflowStep[];
}

const statusConfig: Record<
  PrWorkflowStep['status'],
  { label: string; badgeClass: string; desc: string; checks: { name: string; state: 'pass' | 'pending' | 'fail' }[]; comments: { author: string; text: string }[]; showMerge: boolean; mergeEnabled: boolean }
> = {
  draft: {
    label: 'Draft',
    badgeClass: 'pr-mockup__badge--review',
    desc: 'PR er kladde — ikke klar til review endnu.',
    checks: [],
    comments: [],
    showMerge: false,
    mergeEnabled: false,
  },
  open: {
    label: 'Open',
    badgeClass: 'pr-mockup__badge--open',
    desc: '## Hvad gør denne PR?\nTilføjer login-side med JWT-authentication.\n\n## Relateret\nCloses #42',
    checks: [{ name: 'CI / build', state: 'pending' }],
    comments: [],
    showMerge: true,
    mergeEnabled: false,
  },
  review: {
    label: 'In review',
    badgeClass: 'pr-mockup__badge--review',
    desc: '## Hvad gør denne PR?\nTilføjer login-side med JWT-authentication.\n\n## Relateret\nCloses #42',
    checks: [
      { name: 'CI / build', state: 'pass' },
      { name: 'CI / test', state: 'pass' },
    ],
    comments: [
      { author: 'Anna', text: 'Kan vi udtrække validering til en separat helper?' },
      { author: 'Marcus', text: 'God idé — fixer det 👍' },
    ],
    showMerge: true,
    mergeEnabled: false,
  },
  changes: {
    label: 'Changes requested',
    badgeClass: 'pr-mockup__badge--changes',
    desc: '## Hvad gør denne PR?\nTilføjer login-side med JWT-authentication.\n\n## Relateret\nCloses #42',
    checks: [
      { name: 'CI / build', state: 'pass' },
      { name: 'CI / test', state: 'fail' },
    ],
    comments: [
      { author: 'Anna', text: 'Request changes: Test fejler når e-mail er tom.' },
    ],
    showMerge: true,
    mergeEnabled: false,
  },
  approved: {
    label: 'Approved',
    badgeClass: 'pr-mockup__badge--approved',
    desc: '## Hvad gør denne PR?\nTilføjer login-side med JWT-authentication.\n\n## Relateret\nCloses #42',
    checks: [
      { name: 'CI / build', state: 'pass' },
      { name: 'CI / test', state: 'pass' },
    ],
    comments: [
      { author: 'Anna', text: 'LGTM! ✅ God struktur.' },
    ],
    showMerge: true,
    mergeEnabled: true,
  },
  merged: {
    label: 'Merged',
    badgeClass: 'pr-mockup__badge--merged',
    desc: 'Merged til main. Issue #42 lukket automatisk.',
    checks: [
      { name: 'CI / build', state: 'pass' },
      { name: 'CI / test', state: 'pass' },
    ],
    comments: [
      { author: 'Anna', text: 'LGTM! ✅' },
    ],
    showMerge: false,
    mergeEnabled: false,
  },
};

function CheckIcon({ state }: { state: 'pass' | 'pending' | 'fail' }) {
  if (state === 'pass') return <span className="pr-mockup__check-icon--pass" aria-hidden="true">✓</span>;
  if (state === 'fail') return <span className="pr-mockup__check-icon--fail" aria-hidden="true">✗</span>;
  return <span className="pr-mockup__check-icon--pending" aria-hidden="true">◷</span>;
}

export default function PullRequestSimulator({ steps }: Props) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? '');
  const active = steps.find((s) => s.id === activeId) ?? steps[0];
  const config = active ? statusConfig[active.status] : statusConfig.open;

  return (
    <div className="pr-simulator">
      <p className="flow-hint">Klik på trinene og se hvordan en PR udvikler sig fra oprettelse til merge</p>

      <div className="pr-simulator__steps" role="tablist" aria-label="Pull request workflow">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={activeId === step.id}
            className={`pr-simulator__step${activeId === step.id ? ' pr-simulator__step--active' : ''}`}
            onClick={() => setActiveId(step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className="pr-mockup" role="tabpanel">
        <div className="pr-mockup__header">
          <h3 className="pr-mockup__title">feat(auth): tilføj login med JWT</h3>
          <div className="pr-mockup__meta">
            <span className={`pr-mockup__badge ${config.badgeClass}`}>{config.label}</span>
            <span>feature/login → main</span>
            <span>+128 −12</span>
          </div>
        </div>

        <div className="pr-mockup__body">
          <p className="pr-mockup__desc" style={{ whiteSpace: 'pre-line' }}>
            {config.desc}
          </p>

          {config.checks.length > 0 && (
            <div className="pr-mockup__checks">
              {config.checks.map((check) => (
                <div key={check.name} className="pr-mockup__check">
                  <CheckIcon state={check.state} />
                  <span>{check.name}</span>
                </div>
              ))}
            </div>
          )}

          {config.comments.length > 0 && (
            <div className="pr-mockup__comments">
              <p className="pr-mockup__comments-title">Review-kommentarer</p>
              {config.comments.map((c, i) => (
                <div key={i} className="pr-mockup__comment">
                  <div className="pr-mockup__comment-author">{c.author}</div>
                  <p className="pr-mockup__comment-text">{c.text}</p>
                </div>
              ))}
            </div>
          )}

          {config.showMerge && (
            <div className="pr-mockup__actions">
              <span className={`pr-mockup__btn pr-mockup__btn--primary${config.mergeEnabled ? '' : ' pr-mockup__btn--disabled'}`}>
                Squash and merge
              </span>
              <span className="pr-mockup__btn pr-mockup__btn--disabled">Merge pull request</span>
            </div>
          )}
        </div>
      </div>

      {active && (
        <div className="pr-simulator__detail">
          <h3 className="pr-simulator__detail-title">{active.title}</h3>
          <p className="pr-simulator__detail-desc">{active.description}</p>
          {active.tip && <p className="pr-simulator__tip">💡 {active.tip}</p>}
        </div>
      )}
    </div>
  );
}
