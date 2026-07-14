import { useState } from 'react';
import type { IssueWorkflowStep } from '../../content/issues';
import './issues.css';

interface Props {
  steps: IssueWorkflowStep[];
}

const statusConfig: Record<
  IssueWorkflowStep['status'],
  { badge: string; badgeClass: string; body: string; linked?: string; assignee?: string; showLabel: boolean }
> = {
  open: {
    badge: 'Open',
    badgeClass: 'issue-mockup__badge--open',
    body: '## Beskrivelse\nLogin fejler når e-mailfelt er tomt.\n\n## Steps to reproduce\n1. Gå til /login\n2. Lad e-mail stå tom\n3. Klik "Log ind"',
    showLabel: true,
  },
  assigned: {
    badge: 'Open',
    badgeClass: 'issue-mockup__badge--open',
    body: '## Beskrivelse\nLogin fejler når e-mailfelt er tomt.\n\n## Steps to reproduce\n1. Gå til /login\n2. Lad e-mail stå tom\n3. Klik "Log ind"',
    assignee: 'Tildelt: @marcus',
    showLabel: true,
  },
  'in-progress': {
    badge: 'In Progress',
    badgeClass: 'issue-mockup__badge--progress',
    body: '## Beskrivelse\nLogin fejler når e-mailfelt er tomt.\n\n## Branch\nfix/42-email-validation',
    assignee: 'Tildelt: @marcus',
    showLabel: true,
  },
  review: {
    badge: 'In Review',
    badgeClass: 'issue-mockup__badge--review',
    body: '## Beskrivelse\nLogin fejler når e-mailfelt er tomt.\n\n## PR\nCloses #42',
    assignee: 'Tildelt: @marcus',
    linked: 'PR #15: fix(auth): valider tom e-mail',
    showLabel: true,
  },
  closed: {
    badge: 'Closed',
    badgeClass: 'issue-mockup__badge--closed',
    body: 'Lukket via merged PR #15.\n\nValidering tilføjet — tom e-mail viser nu fejlbesked.',
    linked: 'Merged PR #15 → Closed automatically',
    showLabel: true,
  },
};

export default function IssueLifecycleSimulator({ steps }: Props) {
  const [activeId, setActiveId] = useState(steps[0]?.id ?? '');
  const active = steps.find((s) => s.id === activeId) ?? steps[0];
  const config = active ? statusConfig[active.status] : statusConfig.open;

  return (
    <div className="issue-simulator">
      <p className="flow-hint">Klik på trinene og se issue #42 fra oprettelse til lukket via PR</p>

      <div className="issue-simulator__steps" role="tablist" aria-label="Issue livscyklus">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={activeId === step.id}
            className={`issue-simulator__step${activeId === step.id ? ' issue-simulator__step--active' : ''}`}
            onClick={() => setActiveId(step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className="issue-mockup" role="tabpanel">
        <div className="issue-mockup__header">
          <div className="issue-mockup__number">#42</div>
          <h3 className="issue-mockup__title">Login fejler når e-mailfelt er tomt</h3>
          <div className="issue-mockup__meta">
            <span className={`issue-mockup__badge ${config.badgeClass}`}>{config.badge}</span>
            {config.showLabel && <span className="issue-mockup__label">bug</span>}
            {config.assignee && <span className="issue-mockup__assignee">{config.assignee}</span>}
          </div>
        </div>
        <div className="issue-mockup__body">{config.body}</div>
        {config.linked && (
          <div className="issue-mockup__linked">
            <p className="issue-mockup__linked-title">Linked</p>
            <span className="issue-mockup__linked-item">{config.linked}</span>
          </div>
        )}
      </div>

      {active && (
        <div className="issue-simulator__detail">
          <h3 className="issue-simulator__detail-title">{active.title}</h3>
          <p className="issue-simulator__detail-desc">{active.description}</p>
          {active.tip && <p className="issue-simulator__tip">💡 {active.tip}</p>}
        </div>
      )}
    </div>
  );
}
