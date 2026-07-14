import { useState } from 'react';
import type { MergeStrategy } from '../../content/merge';
import './merge.css';

interface Props {
  strategies: MergeStrategy[];
}

export default function MergeStrategyExplorer({ strategies }: Props) {
  const [activeId, setActiveId] = useState(
    strategies.find((s) => s.recommended)?.id ?? strategies[0]?.id ?? '',
  );
  const active = strategies.find((s) => s.id === activeId) ?? strategies[0];

  return (
    <div className="merge-strategies">
      <p className="flow-hint">Klik på en strategi for at se fordele, ulemper og hvornår den bruges</p>

      <div className="merge-strategies__grid" role="tablist" aria-label="Merge-strategier">
        {strategies.map((strategy) => (
          <button
            key={strategy.id}
            type="button"
            role="tab"
            aria-selected={activeId === strategy.id}
            className={`merge-strategy${activeId === strategy.id ? ' merge-strategy--active' : ''}${strategy.recommended ? ' merge-strategy--recommended' : ''}`}
            onClick={() => setActiveId(strategy.id)}
          >
            {strategy.recommended && <span className="merge-strategy__badge">Anbefalet</span>}
            <span className="merge-strategy__label">{strategy.label}</span>
            <span className="merge-strategy__title">{strategy.title}</span>
          </button>
        ))}
      </div>

      {active && (
        <div className="merge-strategy__detail" role="tabpanel">
          <h3>{active.title}</h3>
          <p className="merge-strategy__detail-desc">{active.description}</p>
          <div className="merge-strategy__lists">
            <div>
              <p className="merge-strategy__list-title merge-strategy__list-title--pro">Fordele</p>
              <ul className="merge-strategy__list">
                {active.pros.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="merge-strategy__list-title merge-strategy__list-title--con">Ulemper</p>
              <ul className="merge-strategy__list">
                {active.cons.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="merge-strategy__when">{active.when}</p>
        </div>
      )}
    </div>
  );
}
