import { useState } from 'react';
import type { ConflictStep } from '../../content/merge';
import './merge.css';

interface Props {
  steps: ConflictStep[];
}

type Resolution = 'ours' | 'theirs' | 'both';

const resolvedContent: Record<Resolution, string> = {
  ours: `function getTitle() {
  return "Dashboard";
}`,
  theirs: `function getTitle() {
  return "Projektoversigt";
}`,
  both: `function getTitle() {
  const label = "Projektoversigt";
  return label;
}`,
};

function ConflictHighlighted() {
  return (
    <>
      {'function getTitle() {\n'}
      <span className="conflict-line--marker">{'<<<<<<< HEAD\n'}</span>
      <span className="conflict-line--ours">{'  return "Dashboard";\n'}</span>
      <span className="conflict-line--marker">{'=======\n'}</span>
      <span className="conflict-line--theirs">{'  return "Projektoversigt";\n'}</span>
      <span className="conflict-line--marker">{'>>>>>>> main\n'}</span>
      {'}'}
    </>
  );
}

export default function MergeConflictResolver({ steps }: Props) {
  const [activeId, setActiveId] = useState(steps[1]?.id ?? steps[0]?.id ?? '');
  const [resolution, setResolution] = useState<Resolution>('theirs');

  const active = steps.find((s) => s.id === activeId) ?? steps[0];
  const showConflict = active?.id === 'markers';
  const showChoices = active?.id === 'markers' || active?.id === 'resolve';
  const isResolved = active?.resolved || active?.id === 'resolve' || active?.id === 'stage' || active?.id === 'commit';

  let displayCode = active?.fileContent ?? '';
  if (active?.id === 'resolve' || (isResolved && active?.id !== 'markers')) {
    displayCode = resolvedContent[resolution];
  }

  const showEditor =
    active?.id !== 'trigger' &&
    (showConflict || displayCode.length > 0);

  return (
    <div className="conflict-resolver">
      <p className="flow-hint">Gå trin for trin gennem løsning af en merge-konflikt</p>

      <div className="conflict-resolver__steps" role="tablist" aria-label="Konfliktløsning">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={activeId === step.id}
            className={`conflict-resolver__step${activeId === step.id ? ' conflict-resolver__step--active' : ''}`}
            onClick={() => setActiveId(step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>

      {showEditor && (
        <div className="conflict-editor">
          <div className="conflict-editor__header">
            <span>src/App.tsx</span>
            <span className={`conflict-editor__status${isResolved ? ' conflict-editor__status--resolved' : ' conflict-editor__status--conflict'}`}>
              {isResolved ? 'Løst' : 'Konflikt'}
            </span>
          </div>
          <pre className="conflict-editor__code">
            <code>{showConflict && !isResolved ? <ConflictHighlighted /> : displayCode}</code>
          </pre>
        </div>
      )}

      {showChoices && (
        <div className="conflict-resolver__choices">
          <button
            type="button"
            className={`conflict-resolver__choice${resolution === 'ours' ? ' conflict-resolver__choice--active' : ''}`}
            onClick={() => setResolution('ours')}
          >
            Behold vores (HEAD)
          </button>
          <button
            type="button"
            className={`conflict-resolver__choice${resolution === 'theirs' ? ' conflict-resolver__choice--active' : ''}`}
            onClick={() => setResolution('theirs')}
          >
            Behold main
          </button>
          <button
            type="button"
            className={`conflict-resolver__choice${resolution === 'both' ? ' conflict-resolver__choice--active' : ''}`}
            onClick={() => setResolution('both')}
          >
            Kombiner begge
          </button>
        </div>
      )}

      {active && (
        <div className="conflict-resolver__detail" role="tabpanel">
          <h3 className="conflict-resolver__detail-title">{active.title}</h3>
          <p className="conflict-resolver__detail-desc">{active.description}</p>
          {active.code && (
            <pre>
              <code>{active.code}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
