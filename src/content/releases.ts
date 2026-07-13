export interface FlowNode {
  id: string;
  label: string;
  title: string;
  description: string;
  command?: string;
}

export interface GuideStep {
  id: string;
  title: string;
  summary: string;
  details: string;
  code?: string;
  codeLabel?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
}

export const introPoints = [
  {
    title: 'Release',
    text: 'En release er en markeret version af din kode — typisk navngivet med semantisk versionering som v1.0.0.',
  },
  {
    title: 'Tag',
    text: 'Et Git-tag er et fast referencepunkt til et bestemt commit. Tags bruges til at markere releases.',
  },
  {
    title: 'GitHub Release',
    text: 'En GitHub Release tilføjer release-noter, downloadbare filer og synlighed på repository-siden.',
  },
  {
    title: 'GitHub Actions',
    text: 'Med Actions kan du automatisere build, test og publicering, når et tag pushes til GitHub.',
  },
];

export const flowNodes: FlowNode[] = [
  {
    id: 'commit',
    label: 'Commit',
    title: 'Klar kode på main',
    description:
      'Før du laver en release, skal din kode være klar og merged til main (eller din release-branch). Sørg for at versionen er bumped og CHANGELOG er opdateret.',
  },
  {
    id: 'tag',
    label: 'Git tag',
    title: 'Opret et annoteret tag',
    description:
      'Et annoteret tag gemmer metadata som forfatter, dato og besked. Det anbefales frem for lightweight tags til releases.',
    command: 'git tag -a v1.0.0 -m "Release version 1.0.0"',
  },
  {
    id: 'push',
    label: 'Push tag',
    title: 'Send tagget til GitHub',
    description:
      'Tags pushes separat fra branches. Du skal eksplicit pushe tagget for at det bliver synligt på GitHub.',
    command: 'git push origin v1.0.0',
  },
  {
    id: 'release',
    label: 'GitHub Release',
    title: 'Opret en GitHub Release',
    description:
      'På GitHub kan du oprette en release fra tagget med release-noter og vedhæftede filer. Det kan gøres manuelt i UI eller automatisk via Actions.',
  },
  {
    id: 'actions',
    label: 'GitHub Actions',
    title: 'Automatiser med Actions',
    description:
      'Et workflow kan trigges når et tag der matcher v* pushes. Det kan bygge projektet, køre tests og oprette GitHub Release automatisk.',
    command: 'on:\n  push:\n    tags:\n      - \'v*\'',
  },
];

export const guideSteps: GuideStep[] = [
  {
    id: 'prepare',
    title: 'Forbered versionen',
    summary: 'Opdater version og CHANGELOG, og sørg for at main er klar.',
    details:
      'Bump versionsnummeret i package.json, Cargo.toml eller tilsvarende. Opdater CHANGELOG med ændringer siden sidste release. Merge alle nødvendige PRs til main og verificer at CI er grøn.',
    code: '# Tjek at du er på main og alt er committed\ngit checkout main\ngit pull origin main\ngit status',
    codeLabel: 'Terminal',
  },
  {
    id: 'create-tag',
    title: 'Opret annoteret tag lokalt',
    summary: 'Brug git tag -a til at oprette et annoteret tag på det aktuelle commit.',
    details:
      'Annoterede tags (-a) gemmer en besked og metadata. Lightweight tags (uden -a) er bare et navn på et commit og anbefales ikke til releases. Brug semantisk versionering: vMAJOR.MINOR.PATCH.',
    code: 'git tag -a v1.0.0 -m "Release version 1.0.0"\n\n# Verificer tagget:\ngit tag -l "v*"\ngit show v1.0.0',
    codeLabel: 'Terminal',
  },
  {
    id: 'push-tag',
    title: 'Push tag til GitHub',
    summary: 'Tags pushes ikke automatisk med git push — du skal pushe dem eksplicit.',
    details:
      'Du kan pushe et enkelt tag eller alle lokale tags. Efter push er tagget synligt på GitHub under "Releases" og "Tags".',
    code: '# Push et enkelt tag:\ngit push origin v1.0.0\n\n# Eller push alle tags:\ngit push origin --tags',
    codeLabel: 'Terminal',
  },
  {
    id: 'create-release',
    title: 'Opret GitHub Release',
    summary: 'Opret release manuelt i GitHub UI eller lad Actions gøre det automatisk.',
    details:
      'Gå til repository → Releases → "Draft a new release". Vælg dit tag, skriv release-noter og publicer. Alternativt kan et GitHub Actions workflow oprette releasen automatisk med softprops/action-gh-release.',
    code: '# Manuelt: GitHub → Releases → Draft a new release\n# Automatisk: konfigurer workflow (se eksempel nedenfor)',
    codeLabel: 'GitHub / Actions',
  },
  {
    id: 'verify',
    title: 'Verificer Actions-workflow',
    summary: 'Tjek at dit release-workflow kørte succesfuldt på GitHub.',
    details:
      'Gå til Actions-fanen på GitHub og find workflow-kørslen der blev trigget af dit tag. Verificer at build, tests og release-oprettelse lykkedes. Tjek også at releasen er synlig under Releases.',
    code: '# På GitHub:\n# 1. Actions → find "Release" workflow\n# 2. Releases → verificer ny release med noter',
    codeLabel: 'GitHub',
  },
];

export const workflowYaml = `name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm ci && npm run build
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true`;

export const workflowParts = [
  {
    key: 'on.push.tags',
    label: 'on.push.tags',
    description:
      'Definerer hvornår workflowet kører. Her trigges det når et tag der matcher mønsteret v* pushes — f.eks. v1.0.0 eller v2.1.3.',
  },
  {
    key: 'runs-on',
    label: 'runs-on: ubuntu-latest',
    description:
      'Angiver hvilken runner der bruges. ubuntu-latest er den mest almindelige Linux-miljø til build og deploy.',
  },
  {
    key: 'action-gh-release',
    label: 'softprops/action-gh-release',
    description:
      'Et færdigt action der opretter en GitHub Release fra det pushede tag. generate_release_notes: true genererer automatisk noter fra commits.',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Hvad er hovedforskellen på et tag og en branch?',
    options: [
      { id: 'a', text: 'Et tag er immutabelt og peger på ét commit; en branch bevæger sig med nye commits' },
      { id: 'b', text: 'Et tag kan kun oprettes på GitHub, ikke lokalt' },
      { id: 'c', text: 'En branch kan ikke pushes til remote' },
      { id: 'd', text: 'Der er ingen forskel — tag og branch er det samme' },
    ],
    correctId: 'a',
    explanation:
      'Et tag markerer et specifikt commit permanent (især annoterede tags til releases). En branch er et bevægeligt referencepunkt der følger med nye commits.',
  },
  {
    id: 'q2',
    question: 'Hvornår trigger release-workflowet i eksemplet?',
    options: [
      { id: 'a', text: 'Ved hvert push til main' },
      { id: 'b', text: 'Når et tag der matcher v* pushes' },
      { id: 'c', text: 'Hver nat kl. 00:00' },
      { id: 'd', text: 'Når en PR merges' },
    ],
    correctId: 'b',
    explanation:
      'Workflowet bruger on.push.tags med mønsteret v*, så det kører kun når et versions-tag som v1.0.0 pushes til GitHub.',
  },
  {
    id: 'q3',
    question: 'Hvad gør git push origin v1.0.0?',
    options: [
      { id: 'a', text: 'Sletter tagget lokalt' },
      { id: 'b', text: 'Pusher tagget v1.0.0 til remote repository origin' },
      { id: 'c', text: 'Opretter en ny branch kaldet v1.0.0' },
      { id: 'd', text: 'Pusher alle branches til origin' },
    ],
    correctId: 'b',
    explanation:
      'Kommandoen sender det lokale tag v1.0.0 til remote repository origin. Tags pushes ikke med almindelig git push — de kræver eksplicit push.',
  },
  {
    id: 'q4',
    question: 'Hvorfor anbefales annoterede tags (-a) til releases?',
    options: [
      { id: 'a', text: 'De er mindre og tager mindre plads' },
      { id: 'b', text: 'De gemmer metadata som forfatter, dato og release-besked' },
      { id: 'c', text: 'De opretter automatisk en GitHub Release' },
      { id: 'd', text: 'De kan kun bruges på GitHub, ikke lokalt' },
    ],
    correctId: 'b',
    explanation:
      'Annoterede tags er fuldt Git-objekter med metadata. Det gør dem velegnede til releases, hvor du vil dokumentere hvad versionen indeholder.',
  },
];

export const upcomingTopics = [
  { title: 'Branches', description: 'Arbejd med branches og merge-strategier', available: false },
  { title: 'Pull Requests', description: 'Review, diskussion og merge af ændringer', available: false },
  { title: 'Issues', description: 'Spor bugs og features med issues', available: false },
];
