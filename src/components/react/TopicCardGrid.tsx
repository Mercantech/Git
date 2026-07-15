import { useRef, type ReactNode } from 'react';
import './topic-card-previews.css';
import { topicPreviews, type TopicId, type TopicPreview } from '../../content/topic-previews';

function CommitsPreview() {
  return (
    <svg className="topic-preview__svg" viewBox="0 0 200 56" aria-hidden="true">
      <line className="tp-commits__line" x1="12" y1="28" x2="188" y2="28" stroke="var(--color-border)" strokeWidth="2" />
      <g className="tp-commits__c tp-commits__c--1"><circle cx="40" cy="28" r="5" fill="#2563eb" /></g>
      <g className="tp-commits__c tp-commits__c--2"><circle cx="80" cy="28" r="5" fill="#2563eb" /></g>
      <g className="tp-commits__c tp-commits__c--3"><circle cx="120" cy="28" r="5" fill="#2563eb" /></g>
      <g className="tp-commits__zone tp-commits__zone--1">
        <rect x="138" y="8" width="22" height="14" rx="3" fill="var(--color-bg)" stroke="var(--color-border)" strokeWidth="1.5" />
        <text x="149" y="18" textAnchor="middle" fontSize="7" fill="var(--color-text-muted)">add</text>
      </g>
      <g className="tp-commits__zone tp-commits__zone--2">
        <rect x="166" y="8" width="22" height="14" rx="3" fill="var(--color-accent-soft)" stroke="var(--color-accent)" strokeWidth="1.5" />
        <text x="177" y="18" textAnchor="middle" fontSize="7" fill="var(--color-accent)">commit</text>
      </g>
    </svg>
  );
}

function BranchesPreview() {
  return (
    <svg className="topic-preview__svg" viewBox="0 0 200 56" aria-hidden="true">
      <line className="tp-branches__main" x1="12" y1="22" x2="188" y2="22" stroke="var(--color-border)" strokeWidth="2" />
      <g className="tp-branches__c tp-branches__c--1"><circle cx="50" cy="22" r="5" fill="#2563eb" /></g>
      <g className="tp-branches__c tp-branches__c--2"><circle cx="90" cy="22" r="5" fill="#2563eb" /></g>
      <path className="tp-branches__fork" d="M 90 22 Q 102 22 108 38" fill="none" stroke="#16a34a" strokeWidth="2" />
      <line className="tp-branches__feat-line" x1="108" y1="38" x2="170" y2="38" stroke="var(--color-border)" strokeWidth="2" />
      <g className="tp-branches__c tp-branches__c--3"><circle cx="130" cy="38" r="5" fill="#16a34a" /></g>
      <text className="tp-branches__label" x="130" y="52" textAnchor="middle" fontSize="7" fill="var(--color-text-muted)">feature/login</text>
    </svg>
  );
}

function PullRequestsPreview() {
  return (
    <svg className="topic-preview__svg" viewBox="0 0 200 56" aria-hidden="true">
      <line x1="12" y1="22" x2="188" y2="22" stroke="var(--color-border)" strokeWidth="2" />
      <circle cx="60" cy="22" r="5" fill="#2563eb" />
      <circle cx="140" cy="22" r="5" fill="#2563eb" />
      <path className="tp-pr__branch" d="M 100 22 Q 112 22 118 38" fill="none" stroke="#7c3aed" strokeWidth="2" />
      <line className="tp-pr__feat-line" x1="118" y1="38" x2="160" y2="38" stroke="var(--color-border)" strokeWidth="2" />
      <g className="tp-pr__c"><circle cx="140" cy="38" r="5" fill="#7c3aed" /></g>
      <path className="tp-pr__arrow" d="M 140 33 L 140 27 M 135 30 L 140 27 L 145 30" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
      <g className="tp-pr__badge">
        <rect x="152" y="10" width="36" height="14" rx="7" fill="#7c3aed" opacity="0.15" />
        <text x="170" y="20" textAnchor="middle" fontSize="7" fontWeight="600" fill="#7c3aed">PR #12</text>
      </g>
    </svg>
  );
}

function MergePreview() {
  return (
    <svg className="topic-preview__svg" viewBox="0 0 200 56" aria-hidden="true">
      <line x1="12" y1="22" x2="188" y2="22" stroke="var(--color-border)" strokeWidth="2" />
      <circle cx="50" cy="22" r="5" fill="#2563eb" />
      <circle cx="90" cy="22" r="5" fill="#2563eb" />
      <path className="tp-merge__branch" d="M 90 22 Q 102 22 108 38" fill="none" stroke="#d97706" strokeWidth="2" />
      <line x1="108" y1="38" x2="150" y2="38" stroke="var(--color-border)" strokeWidth="2" />
      <circle cx="130" cy="38" r="5" fill="#d97706" />
      <path className="tp-merge__merge" d="M 150 38 Q 165 28 175 22" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="3 2" />
      <g className="tp-merge__c"><circle cx="175" cy="22" r="5" fill="#16a34a" /></g>
    </svg>
  );
}

function ReleasesPreview() {
  return (
    <svg className="topic-preview__svg" viewBox="0 0 200 56" aria-hidden="true">
      <line className="tp-releases__line" x1="12" y1="28" x2="188" y2="28" stroke="var(--color-border)" strokeWidth="2" />
      <circle cx="50" cy="28" r="5" fill="#2563eb" />
      <circle cx="90" cy="28" r="5" fill="#2563eb" />
      <circle cx="130" cy="28" r="5" fill="#2563eb" />
      <g className="tp-releases__tag">
        <path d="M 130 14 L 138 14 L 142 20 L 138 26 L 130 26 L 126 20 Z" fill="#ec4899" />
        <text x="134" y="22" textAnchor="middle" fontSize="5" fill="#fff" fontWeight="700">v1</text>
      </g>
      <g className="tp-releases__release">
        <rect x="148" y="10" width="44" height="16" rx="4" fill="var(--color-surface)" stroke="#ec4899" strokeWidth="1.5" />
        <text x="170" y="21" textAnchor="middle" fontSize="6" fill="#ec4899" fontWeight="600">Release</text>
      </g>
      <path className="tp-releases__push" d="M 142 20 L 148 20" stroke="#ec4899" strokeWidth="1.5" />
    </svg>
  );
}

function IssuesPreview() {
  return (
    <svg className="topic-preview__svg" viewBox="0 0 200 56" aria-hidden="true">
      <line x1="12" y1="32" x2="120" y2="32" stroke="var(--color-border)" strokeWidth="2" />
      <circle cx="40" cy="32" r="5" fill="#2563eb" />
      <circle cx="80" cy="32" r="5" fill="#2563eb" />
      <g className="tp-issues__issue">
        <circle cx="155" cy="18" r="10" fill="#0891b2" opacity="0.15" />
        <circle cx="155" cy="18" r="10" fill="none" stroke="#0891b2" strokeWidth="1.5" />
        <text x="155" y="21" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0891b2">#42</text>
      </g>
      <path className="tp-issues__link" d="M 88 32 Q 120 32 145 24" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="3 2" />
      <g className="tp-issues__c"><circle cx="100" cy="32" r="5" fill="#0891b2" /></g>
      <text className="tp-issues__closes" x="100" y="48" textAnchor="middle" fontSize="6" fill="var(--color-text-muted)">Closes #42</text>
    </svg>
  );
}

const previews: Record<TopicId, () => ReactNode> = {
  commits: CommitsPreview,
  branches: BranchesPreview,
  'pull-requests': PullRequestsPreview,
  merge: MergePreview,
  releases: ReleasesPreview,
  issues: IssuesPreview,
};

function TopicCard({ topic }: { topic: TopicPreview }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const Preview = previews[topic.id];

  const replay = () => {
    const el = previewRef.current;
    if (!el) return;
    el.classList.remove('topic-card__preview--play');
    void el.offsetWidth;
    el.classList.add('topic-card__preview--play');
  };

  return (
    <a
      href={topic.href}
      className="topic-card"
      data-topic={topic.id}
      style={{ '--topic-color': topic.color } as React.CSSProperties}
      onMouseEnter={replay}
    >
      <div ref={previewRef} className="topic-card__preview topic-card__preview--play" aria-hidden="true">
        <div className="topic-card__cmds">
          {topic.commands.map((cmd, i) => (
            <code key={cmd} className={`topic-card__cmd topic-card__cmd--${i + 1}`}>
              <span className="topic-card__prompt">$</span> {cmd}
            </code>
          ))}
        </div>
        <Preview />
      </div>
      <div className="topic-card__body">
        <div className="topic-card__head">
          <h3>{topic.title}</h3>
          <span className="topic-card__arrow">→</span>
        </div>
        <p>{topic.description}</p>
      </div>
    </a>
  );
}

export default function TopicCardGrid() {
  return (
    <div className="topic-card-grid">
      {topicPreviews.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
