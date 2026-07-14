export interface Topic {
  title: string;
  href?: string;
  description: string;
  available: boolean;
}

export const topics: Topic[] = [
  {
    title: 'Commits',
    href: '/commits',
    description: 'Gem snapshots, skriv gode beskeder og brug conventional commits',
    available: true,
  },
  {
    title: 'Branches',
    href: '/branches',
    description: 'Feature branches, main workflow og merge via pull request',
    available: true,
  },
  {
    title: 'Pull Requests',
    href: '/pull-requests',
    description: 'Code review, PR-beskrivelser og merge til main',
    available: true,
  },
  {
    title: 'Merge',
    href: '/merge',
    description: 'Merge-strategier, konflikter og sikker integration til main',
    available: true,
  },
  {
    title: 'Releases',
    href: '/releases',
    description: 'Tags, GitHub Releases og automatiseret udgivelse med GitHub Actions',
    available: true,
  },
  {
    title: 'Issues',
    href: '/issues',
    description: 'Spor bugs og features, sprint-board og kobling til PRs',
    available: true,
  },
];
