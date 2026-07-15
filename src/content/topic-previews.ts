export type TopicId =
  | 'commits'
  | 'branches'
  | 'pull-requests'
  | 'merge'
  | 'releases'
  | 'issues';

export interface TopicPreview {
  id: TopicId;
  title: string;
  href: string;
  description: string;
  color: string;
  commands: string[];
}

export const topicPreviews: TopicPreview[] = [
  {
    id: 'commits',
    title: 'Commits',
    href: '/commits',
    description: 'Gem snapshots, skriv gode beskeder og brug conventional commits',
    color: '#2563eb',
    commands: ['git add .', 'git commit -m "feat: login"'],
  },
  {
    id: 'branches',
    title: 'Branches',
    href: '/branches',
    description: 'Feature branches, main workflow og merge via pull request',
    color: '#16a34a',
    commands: ['git checkout -b feature/login'],
  },
  {
    id: 'pull-requests',
    title: 'Pull Requests',
    href: '/pull-requests',
    description: 'Code review, PR-beskrivelser og merge til main',
    color: '#7c3aed',
    commands: ['git push -u origin feature', 'gh pr create'],
  },
  {
    id: 'merge',
    title: 'Merge',
    href: '/merge',
    description: 'Merge-strategier, konflikter og sikker integration til main',
    color: '#d97706',
    commands: ['git checkout main', 'git merge feature/login'],
  },
  {
    id: 'releases',
    title: 'Releases',
    href: '/releases',
    description: 'Tags, GitHub Releases og automatiseret udgivelse med GitHub Actions',
    color: '#ec4899',
    commands: ['git tag v1.0.0', 'git push --tags'],
  },
  {
    id: 'issues',
    title: 'Issues',
    href: '/issues',
    description: 'Spor bugs og features, sprint-board og kobling til PRs',
    color: '#0891b2',
    commands: ['gh issue create', 'Closes #42'],
  },
];
