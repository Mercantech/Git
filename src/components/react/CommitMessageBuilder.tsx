import { useState } from 'react';
import type { ConventionalType } from '../../content/commits';
import './commit-builder.css';

interface Props {
  types: ConventionalType[];
}

export default function CommitMessageBuilder({ types }: Props) {
  const [activeType, setActiveType] = useState(types[0]?.id ?? 'feat');
  const [scope, setScope] = useState('auth');
  const [description, setDescription] = useState('tilføj login-side med JWT');

  const selected = types.find((t) => t.id === activeType) ?? types[0];
  const scopePart = scope.trim() ? `(${scope.trim()})` : '';
  const message = `${activeType}${scopePart}: ${description.trim() || '…'}`;

  return (
    <div className="commit-builder">
      <p className="flow-hint">Byg din egen conventional commit og se formatet live</p>

      <div className="commit-builder__preview" aria-live="polite">
        <span className="commit-builder__prompt">$</span>
        <code className="commit-builder__message">git commit -m "{message}"</code>
      </div>

      <div className="commit-builder__types" role="tablist" aria-label="Commit-typer">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            role="tab"
            aria-selected={activeType === type.id}
            className={`commit-builder__type${activeType === type.id ? ' commit-builder__type--active' : ''}`}
            onClick={() => setActiveType(type.id)}
          >
            <span aria-hidden="true">{type.emoji}</span> {type.label}
          </button>
        ))}
      </div>

      {selected && (
        <div className="commit-builder__detail">
          <p className="commit-builder__detail-desc">{selected.description}</p>
          <p className="commit-builder__detail-bump">
            Typisk semver: <strong>{selected.bump}</strong>
          </p>
          <p className="commit-builder__detail-example">
            Eksempel: <code>{selected.example}</code>
          </p>
        </div>
      )}

      <div className="commit-builder__fields">
        <label className="commit-builder__field">
          <span className="commit-builder__label">Scope (valgfri)</span>
          <input
            type="text"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="auth, form, api…"
            className="commit-builder__input"
          />
        </label>
        <label className="commit-builder__field">
          <span className="commit-builder__label">Beskrivelse (imperativ)</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="tilføj, ret, opdater…"
            className="commit-builder__input"
          />
        </label>
      </div>
    </div>
  );
}
