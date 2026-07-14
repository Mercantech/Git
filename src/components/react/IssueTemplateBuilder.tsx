import { useState } from 'react';
import type { IssueType } from '../../content/issues';
import './issues.css';

interface Props {
  types: IssueType[];
}

export default function IssueTemplateBuilder({ types }: Props) {
  const [activeType, setActiveType] = useState(types[0]?.id ?? 'bug');
  const [title, setTitle] = useState(types[0]?.titleExample ?? '');

  const selected = types.find((t) => t.id === activeType) ?? types[0];

  function selectType(id: string) {
    setActiveType(id);
    const type = types.find((t) => t.id === id);
    if (type) setTitle(type.titleExample);
  }

  return (
    <div className="issue-builder">
      <p className="flow-hint">Vælg issue-type og se skabelon til titel og beskrivelse</p>

      <div className="issue-builder__types" role="tablist" aria-label="Issue-typer">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            role="tab"
            aria-selected={activeType === type.id}
            className={`issue-builder__type${activeType === type.id ? ' issue-builder__type--active' : ''}`}
            onClick={() => selectType(type.id)}
          >
            {type.emoji} {type.label}
          </button>
        ))}
      </div>

      {selected && (
        <>
          <p className="issue-builder__desc">{selected.description}</p>

          <label className="issue-builder__field">
            <span className="issue-builder__label">Titel</span>
            <input
              type="text"
              className="issue-builder__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <div className="issue-builder__preview">
            <div className="issue-builder__preview-header">Forhåndsvisning</div>
            <div className="issue-builder__preview-body">
              <p className="issue-builder__preview-title">{title || '…'}</p>
              <p className="issue-builder__preview-content">{selected.bodyTemplate}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
