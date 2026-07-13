import { useState } from 'react';
import type { GuideStep } from '../../content/releases';
import './step-guide.css';

interface Props {
  steps: GuideStep[];
}

export default function StepGuide({ steps }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(steps[0]?.id ?? null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const completedCount = completed.size;
  const progressPercent = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

  function toggleExpanded(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function toggleCompleted(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function copyCode(id: string, code: string) {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="step-guide">
      <div className="step-guide__progress">
        <div className="step-guide__progress-bar" role="progressbar" aria-valuenow={completedCount} aria-valuemin={0} aria-valuemax={steps.length}>
          <div className="step-guide__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="step-guide__progress-text">
          {completedCount} / {steps.length} fuldført
        </span>
      </div>

      {steps.map((step, index) => {
        const isExpanded = expandedId === step.id;
        const isCompleted = completed.has(step.id);

        return (
          <div
            key={step.id}
            className={`step-item${isExpanded ? ' step-item--expanded' : ''}${isCompleted ? ' step-item--completed' : ''}`}
          >
            <button
              type="button"
              className="step-item__header"
              onClick={() => toggleExpanded(step.id)}
              aria-expanded={isExpanded}
              aria-current={isExpanded ? 'step' : undefined}
            >
              <span className="step-item__number" aria-hidden="true">
                {isCompleted ? '✓' : index + 1}
              </span>
              <div className="step-item__title-wrap">
                <p className="step-item__title">{step.title}</p>
                <p className="step-item__summary">{step.summary}</p>
              </div>
              <span className="step-item__chevron" aria-hidden="true">
                ▼
              </span>
            </button>

            {isExpanded && (
              <div className="step-item__body">
                <p className="step-item__details">{step.details}</p>

                {step.code && (
                  <>
                    {step.codeLabel && <div className="step-item__code-label">{step.codeLabel}</div>}
                    <div className="step-item__code-wrap">
                      <pre>
                        <code>{step.code}</code>
                      </pre>
                      <button
                        type="button"
                        className="step-item__copy"
                        onClick={() => copyCode(step.id, step.code!)}
                        aria-label="Kopier kode"
                      >
                        {copiedId === step.id ? 'Kopieret!' : 'Kopier'}
                      </button>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  className={`step-item__complete${isCompleted ? ' step-item__complete--done' : ''}`}
                  onClick={() => toggleCompleted(step.id)}
                  disabled={isCompleted}
                >
                  {isCompleted ? 'Fuldført ✓' : 'Marker som fuldført'}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
