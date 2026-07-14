import { Fragment, useState } from 'react';
import type { SemVerPart } from '../../content/releases';
import { semverTimeline } from '../../content/releases';
import './semver-explorer.css';

interface Props {
  parts: SemVerPart[];
}

const versionDigits: Record<SemVerPart['id'], string> = {
  major: '0',
  minor: '2',
  patch: '0',
};

export default function SemVerExplorer({ parts }: Props) {
  const [activeId, setActiveId] = useState<SemVerPart['id']>('minor');
  const active = parts.find((p) => p.id === activeId) ?? parts[0];

  const orderedParts: SemVerPart['id'][] = ['major', 'minor', 'patch'];

  return (
    <div className="semver-explorer">
      <p className="flow-hint">Klik på MAJOR, MINOR eller PATCH for at se hvornår du bumper hver del</p>

      <div className="semver-display" aria-label="Semantisk versionering v MAJOR.MINOR.PATCH">
        <span className="semver-prefix">v</span>
        {orderedParts.map((partId, index) => {
          const part = parts.find((p) => p.id === partId)!;
          return (
            <Fragment key={partId}>
              <button
                type="button"
                className={`semver-segment semver-segment--${partId}${activeId === partId ? ' semver-segment--active' : ''}`}
                onClick={() => setActiveId(partId)}
                aria-pressed={activeId === partId}
                aria-label={`${part.label}: ${part.name}`}
              >
                {versionDigits[partId]}
              </button>
              {index < orderedParts.length - 1 && (
                <span className="semver-dot" aria-hidden="true">
                  .
                </span>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="semver-segment-labels" aria-hidden="true">
        {orderedParts.map((partId) => {
          const part = parts.find((p) => p.id === partId)!;
          return (
            <span
              key={partId}
              className={`semver-segment-label${activeId === partId ? ' semver-segment-label--active' : ''}`}
            >
              {part.label}
            </span>
          );
        })}
      </div>

      {active && (
        <div className="semver-detail">
          <span className={`semver-detail__label semver-detail__label--${active.id}`}>{active.label}</span>
          <h3 className="semver-detail__name">{active.name}</h3>
          <p className="semver-detail__desc">{active.description}</p>
          <p className="semver-detail__when">{active.when}</p>
          <ul className="semver-detail__examples">
            {active.examples.map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="semver-timeline">
        <p className="semver-timeline__title">Typisk versionsforløb i et elevprojekt</p>
        <div className="semver-timeline__items">
          {semverTimeline.map((item) => (
            <div key={item.version} className={`semver-timeline__item semver-timeline__item--${item.type}`}>
              <div className="semver-timeline__version">{item.version}</div>
              <div className="semver-timeline__label">{item.label}</div>
              <p className="semver-timeline__note">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
