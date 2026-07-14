/** SVG git graph renderers — one per topic */

type BranchState = 'start' | 'branch' | 'work' | 'push' | 'merge';

export function BranchGraphSvg({ state }: { state: string }) {
  const s = state as BranchState;
  const showBranch = s !== 'start';
  const showFeatureCommits = s === 'work' || s === 'push' || s === 'merge';
  const showMerged = s === 'merge';

  return (
    <svg className="git-graph__svg" viewBox="0 0 480 160" aria-hidden="true">
      <line x1="40" y1="40" x2="440" y2="40" stroke="var(--color-border)" strokeWidth="2" />
      <circle cx="80" cy="40" r="8" fill="#2563eb" />
      <circle cx="160" cy="40" r="8" fill="#2563eb" />
      <circle cx="240" cy="40" r="8" fill="#2563eb" opacity={showMerged ? 1 : 0.35} />
      <circle cx="320" cy="40" r="8" fill="#2563eb" opacity={showMerged ? 1 : 0.35} />
      <circle cx="400" cy="40" r="8" fill={showMerged ? '#16a34a' : '#2563eb'} opacity={showMerged ? 1 : 0.35} />
      <text x="80" y="22" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">main</text>
      {showBranch && (
        <>
          <path d="M 240 40 Q 260 40 270 70" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
          <line x1="270" y1="70" x2="370" y2="70" stroke="var(--color-border)" strokeWidth="2" />
          <circle cx="270" cy="70" r="7" fill="var(--color-accent)" />
          <circle cx="310" cy="70" r="7" fill={showFeatureCommits ? 'var(--color-accent)' : 'var(--color-border)'} opacity={showFeatureCommits ? 1 : 0.4} />
          <circle cx="350" cy="70" r="7" fill={showFeatureCommits ? 'var(--color-accent)' : 'var(--color-border)'} opacity={showFeatureCommits ? 1 : 0.4} />
          <text x="310" y="100" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">feature/login</text>
          {showMerged && (
            <path d="M 370 70 Q 390 55 400 40" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 2" />
          )}
        </>
      )}
      {s === 'start' && <text x="400" y="58" fontSize="10" fill="var(--color-text-muted)">← du er her</text>}
      {s === 'branch' && <text x="270" y="58" fontSize="10" fill="var(--color-accent)">← ny branch</text>}
      {s === 'work' && <text x="350" y="58" fontSize="10" fill="var(--color-accent)">← commits</text>}
      {s === 'push' && <text x="350" y="58" fontSize="10" fill="var(--color-accent)">→ GitHub</text>}
      {s === 'merge' && <text x="400" y="58" fontSize="10" fill="#16a34a">← merged!</text>}
    </svg>
  );
}

type CommitState = 'working' | 'stage' | 'commit' | 'push';

export function CommitZonesGraph({ state }: { state: string }) {
  const s = state as CommitState;
  const zones = [
    { id: 'working', icon: '✏️', label: 'Zone 1', name: 'Working dir', active: s === 'working' },
    { id: 'stage', icon: '📦', label: 'Zone 2', name: 'Staging', active: s === 'stage' || s === 'commit' || s === 'push' },
    { id: 'commit', icon: '💾', label: 'Zone 3', name: 'Repository', active: s === 'commit' || s === 'push' },
    { id: 'remote', icon: '☁️', label: 'Zone 4', name: 'GitHub', active: s === 'push' },
  ];

  return (
    <div className="git-zones" aria-hidden="true">
      {zones.map((z) => (
        <div key={z.id} className={`git-zone${z.active ? ' git-zone--active' : ''}`}>
          <div className="git-zone__icon">{z.icon}</div>
          <div className="git-zone__label">{z.label}</div>
          <div className="git-zone__name">{z.name}</div>
        </div>
      ))}
    </div>
  );
}

type ReleaseState = 'ready' | 'tag' | 'push' | 'release' | 'actions';

export function ReleaseGraphSvg({ state }: { state: string }) {
  const s = state as ReleaseState;
  const showTag = s !== 'ready';
  const showRemote = s === 'push' || s === 'release' || s === 'actions';
  const showRelease = s === 'release' || s === 'actions';
  const showActions = s === 'actions';

  return (
    <svg className="git-graph__svg" viewBox="0 0 480 180" aria-hidden="true">
      <line x1="40" y1="60" x2="440" y2="60" stroke="var(--color-border)" strokeWidth="2" />
      <text x="40" y="45" fontSize="11" fill="var(--color-text-muted)">main</text>
      <circle cx="100" cy="60" r="8" fill="#2563eb" />
      <circle cx="200" cy="60" r="8" fill="#2563eb" />
      <circle cx="300" cy="60" r="8" fill="#2563eb" />
      <circle cx="380" cy="60" r="8" fill={showRelease ? '#16a34a' : '#2563eb'} />
      {showTag && (
        <>
          <line x1="380" y1="60" x2="380" y2="95" stroke="#7c3aed" strokeWidth="2" />
          <rect x="340" y="98" width="80" height="22" rx="4" fill="#7c3aed" />
          <text x="380" y="113" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">v0.2.0</text>
        </>
      )}
      {showRemote && (
        <>
          <line x1="440" y1="60" x2="460" y2="60" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="460" cy="60" r="6" fill="#16a34a" opacity={showRemote ? 1 : 0.3} />
          <text x="460" y="45" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)">origin</text>
        </>
      )}
      {showRelease && (
        <>
          <rect x="130" y="120" width="100" height="28" rx="6" fill="var(--color-accent-soft)" stroke="var(--color-accent)" />
          <text x="180" y="139" textAnchor="middle" fontSize="10" fill="var(--color-accent)" fontWeight="bold">GitHub Release</text>
        </>
      )}
      {showActions && (
        <>
          <rect x="260" y="120" width="90" height="28" rx="6" fill="#fef3c7" stroke="#d97706" />
          <text x="305" y="139" textAnchor="middle" fontSize="10" fill="#d97706" fontWeight="bold">Actions ▶</text>
        </>
      )}
      {s === 'ready' && <text x="380" y="78" fontSize="10" fill="var(--color-text-muted)">← klar commit</text>}
      {s === 'tag' && <text x="380" y="130" fontSize="10" fill="#7c3aed">← tag oprettet</text>}
      {s === 'push' && <text x="455" y="78" fontSize="10" fill="#16a34a">← pushet</text>}
      {s === 'actions' && <text x="305" y="165" fontSize="10" fill="#d97706">workflow kører</text>}
    </svg>
  );
}

type PrState = 'pushed' | 'open' | 'review' | 'approved' | 'merged';

export function PullRequestGraphSvg({ state }: { state: string }) {
  const s = state as PrState;
  const showPr = s !== 'pushed';
  const showReview = s === 'review' || s === 'approved' || s === 'merged';
  const showMerged = s === 'merged';

  return (
    <svg className="git-graph__svg" viewBox="0 0 480 170" aria-hidden="true">
      <line x1="40" y1="70" x2="440" y2="70" stroke="var(--color-border)" strokeWidth="2" />
      <text x="40" y="55" fontSize="11" fill="var(--color-text-muted)">main</text>
      <circle cx="120" cy="70" r="8" fill="#2563eb" />
      <circle cx="220" cy="70" r="8" fill="#2563eb" opacity={showMerged ? 1 : 0.35} />
      <circle cx="380" cy="70" r="8" fill={showMerged ? '#16a34a' : '#2563eb'} opacity={showMerged ? 1 : 0.35} />
      <path d="M 220 70 Q 240 70 250 105" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
      <line x1="250" y1="105" x2="360" y2="105" stroke="var(--color-border)" strokeWidth="2" />
      <circle cx="250" cy="105" r="7" fill="var(--color-accent)" />
      <circle cx="300" cy="105" r="7" fill="var(--color-accent)" />
      <circle cx="350" cy="105" r="7" fill={showReview ? 'var(--color-accent)' : 'var(--color-border)'} opacity={showReview ? 1 : 0.4} />
      <text x="300" y="130" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">feature/login</text>
      {showMerged && (
        <path d="M 360 105 Q 375 85 380 70" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 2" />
      )}
      {showPr && (
        <rect x="155" y="15" width="120" height="26" rx="6" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth={s === 'open' ? 2 : 1} />
      )}
      {showPr && (
        <text x="215" y="32" textAnchor="middle" fontSize="10" fill="var(--color-accent)" fontWeight="bold">
          PR #{showMerged ? '15 merged' : showReview ? '15 in review' : '15 open'}
        </text>
      )}
      {s === 'approved' && !showMerged && (
        <text x="215" y="48" textAnchor="middle" fontSize="9" fill="#16a34a">✓ approved</text>
      )}
      {s === 'pushed' && <text x="360" y="98" fontSize="10" fill="var(--color-accent)">→ GitHub</text>}
      {s === 'merged' && <text x="385" y="88" fontSize="10" fill="#16a34a">← merged!</text>}
    </svg>
  );
}

type MergeState = 'sync' | 'conflict' | 'resolve' | 'merged';

export function MergeGraphSvg({ state }: { state: string }) {
  const s = state as MergeState;
  const showConflict = s === 'conflict';
  const showResolve = s === 'resolve' || s === 'merged';
  const showMerged = s === 'merged';

  return (
    <svg className="git-graph__svg" viewBox="0 0 480 170" aria-hidden="true">
      <line x1="40" y1="45" x2="440" y2="45" stroke="var(--color-border)" strokeWidth="2" />
      <text x="40" y="30" fontSize="11" fill="var(--color-text-muted)">main</text>
      <circle cx="120" cy="45" r="8" fill="#2563eb" />
      <circle cx="220" cy="45" r="8" fill="#2563eb" />
      <circle cx="320" cy="45" r="8" fill="#2563eb" opacity={s === 'sync' ? 0.35 : 1} />
      <circle cx="400" cy="45" r="8" fill={showMerged ? '#16a34a' : '#2563eb'} opacity={showMerged ? 1 : 0.35} />
      <path d="M 220 45 Q 240 45 250 95" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
      <line x1="250" y1="95" x2="350" y2="95" stroke="var(--color-border)" strokeWidth="2" />
      <circle cx="250" cy="95" r="7" fill="var(--color-accent)" />
      <circle cx="300" cy="95" r="7" fill={showConflict ? '#dc2626' : 'var(--color-accent)'} />
      <circle cx="350" cy="95" r="7" fill={showResolve ? 'var(--color-accent)' : 'var(--color-border)'} opacity={showResolve ? 1 : 0.4} />
      <text x="300" y="120" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">feature/dashboard</text>
      {showConflict && (
        <>
          <circle cx="300" cy="95" r="12" fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x="300" y="80" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">⚡ konflikt</text>
        </>
      )}
      {showMerged && (
        <path d="M 350 95 Q 380 65 400 45" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 2" />
      )}
      {s === 'sync' && <text x="320" y="63" fontSize="10" fill="var(--color-text-muted)">main opdateret</text>}
      {s === 'resolve' && <text x="300" y="80" fontSize="10" fill="#16a34a">← løst</text>}
      {s === 'merged' && <text x="405" y="63" fontSize="10" fill="#16a34a">← merged!</text>}
    </svg>
  );
}

type IssueState = 'open' | 'assign' | 'branch' | 'pr' | 'closed';

export function IssueGraphSvg({ state }: { state: string }) {
  const s = state as IssueState;
  const showBranch = s === 'branch' || s === 'pr' || s === 'closed';
  const showPr = s === 'pr' || s === 'closed';
  const showClosed = s === 'closed';

  return (
    <svg className="git-graph__svg" viewBox="0 0 480 180" aria-hidden="true">
      <rect x="30" y="20" width="90" height="36" rx="8" fill={s === 'open' || s === 'assign' ? '#fdf2f8' : 'var(--color-bg)'} stroke="#ec4899" strokeWidth={2} />
      <text x="75" y="38" textAnchor="middle" fontSize="10" fill="#ec4899" fontWeight="bold">Issue #42</text>
      <text x="75" y="50" textAnchor="middle" fontSize="8" fill="var(--color-text-muted)">{showClosed ? 'Closed' : s === 'assign' ? 'Assigned' : 'Open'}</text>
      {s !== 'open' && s !== 'assign' && (
        <line x1="120" y1="38" x2="160" y2="38" stroke="var(--color-border)" strokeWidth="2" markerEnd="url(#arrow)" />
      )}
      <line x1="40" y1="90" x2="440" y2="90" stroke="var(--color-border)" strokeWidth="2" />
      <text x="40" y="75" fontSize="11" fill="var(--color-text-muted)">main</text>
      <circle cx="120" cy="90" r="8" fill="#2563eb" />
      <circle cx="220" cy="90" r="8" fill="#2563eb" opacity={showClosed ? 1 : 0.35} />
      <circle cx="380" cy="90" r="8" fill={showClosed ? '#16a34a' : '#2563eb'} opacity={showClosed ? 1 : 0.35} />
      {showBranch && (
        <>
          <path d="M 220 90 Q 240 90 250 130" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
          <line x1="250" y1="130" x2="340" y2="130" stroke="var(--color-border)" strokeWidth="2" />
          <circle cx="250" cy="130" r="7" fill="var(--color-accent)" />
          <circle cx="300" cy="130" r="7" fill="var(--color-accent)" />
          <text x="290" y="155" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)">fix/42-email</text>
        </>
      )}
      {showPr && (
        <rect x="160" y="55" width="80" height="22" rx="4" fill="var(--color-accent-soft)" stroke="var(--color-accent)" />
      )}
      {showPr && <text x="200" y="70" textAnchor="middle" fontSize="9" fill="var(--color-accent)">PR Closes #42</text>}
      {showClosed && (
        <path d="M 340 130 Q 365 105 380 90" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 2" />
      )}
      {s === 'assign' && <text x="75" y="65" fontSize="9" fill="#ec4899">@marcus</text>}
      {s === 'closed' && <text x="385" y="108" fontSize="10" fill="#16a34a">← lukket</text>}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="var(--color-border)" />
        </marker>
      </defs>
    </svg>
  );
}
