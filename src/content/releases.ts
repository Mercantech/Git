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

export interface SemVerPart {
  id: 'major' | 'minor' | 'patch';
  label: string;
  name: string;
  description: string;
  when: string;
  examples: string[];
}

export interface ReleaseExample {
  title: string;
  url: string;
  description: string;
  tag?: string;
}

export const whyReleasePoints = [
  {
    title: 'Et tydeligt milepæl',
    text: 'En release markerer et klart punkt i projektet — noget konkret I kan pege på og sige: "Det her er klar nu."',
  },
  {
    title: 'Vis frem, test, overlever',
    text: 'Releases bruges til at vise produktet frem for kunden, lade dem teste og overlevere det, I har bygget i sprinten.',
  },
  {
    title: 'Grundlag for feedback',
    text: 'Når kunden ved præcis hvilken version de kigger på, bliver feedback konkret og handlingsbar — ikke "det virker ikke" uden kontekst.',
  },
  {
    title: 'Professionel standard',
    text: 'På GitHub er releases standard i professionelle teams. Det signalerer struktur, sporbarhed og at I tager jeres leverance alvorligt.',
  },
];

export const teamConventions = [
  {
    title: 'Release ved sprint-slut',
    text: 'En release kobles typisk til sprint-slut og fungerer som det punkt, hvor I samler op og får feedback — præcis som i rigtige udviklingsteams.',
  },
  {
    title: 'En release om ugen',
    text: 'Som udgangspunkt laver I en release pr. uge. Det giver en fast rytme og sikrer, at kunden løbende ser fremgang.',
  },
  {
    title: 'Patches undervejs',
    text: 'I må gerne lave patch-releases (v0.2.1, v0.2.2) mellem sprint-slut, hvis kritiske fejl skal rettes hurtigt.',
  },
  {
    title: 'Den vigtige regel',
    text: 'Ingen commits på main uden en release til jeres kunde. Main er jeres leverance-klar kode — det der står der, skal kunne vises frem.',
    highlight: true,
  },
];

export const semverParts: SemVerPart[] = [
  {
    id: 'major',
    label: 'MAJOR',
    name: 'Større version',
    description: 'Breaking changes — ændringer der bryder med det, kunden kender fra før.',
    when: 'Bump MAJOR når du laver ændringer, der kræver at kunden tilpasser sig (ny API, fjernede funktioner, omstruktureret flow).',
    examples: [
      'v0.3.0 → v1.0.0 — første stabile version klar til produktion',
      'v1.2.0 → v2.0.0 — login-flowet er helt omskrevet',
      'v2.1.0 → v3.0.0 — database-struktur ændret, gamle data migreres',
    ],
  },
  {
    id: 'minor',
    label: 'MINOR',
    name: 'Ny funktionalitet',
    description: 'Ny funktionalitet bagudkompatibel — mere værdi uden at bryde det eksisterende.',
    when: 'Bump MINOR når du tilføjer nye features, sider eller forbedringer som kunden kan bruge med det samme.',
    examples: [
      'v0.1.0 → v0.2.0 — ny side til brugeradministration',
      'v0.2.0 → v0.3.0 — eksport til PDF tilføjet',
      'v1.0.0 → v1.1.0 — dashboard med grafer',
    ],
  },
  {
    id: 'patch',
    label: 'PATCH',
    name: 'Fejlrettelse',
    description: 'Bugfixes og små rettelser — samme funktionalitet, bare mere stabil.',
    when: 'Bump PATCH når du retter fejl uden at ændre funktionaliteten. Perfekt til hurtige fixes mellem sprint-releases.',
    examples: [
      'v0.2.0 → v0.2.1 — login-knap virker ikke i Safari',
      'v0.2.1 → v0.2.2 — stavefejl på forsiden rettet',
      'v1.0.0 → v1.0.1 — formular validerer forkert e-mail',
    ],
  },
];

export const semverTimeline = [
  { version: 'v0.1.0', label: 'Første release', type: 'minor' as const, note: 'Projektet er under aktiv udvikling — derfor starter vi på 0.x' },
  { version: 'v0.2.0', label: 'Sprint 2', type: 'minor' as const, note: 'Ny funktionalitet fra sprinten' },
  { version: 'v0.2.1', label: 'Hotfix', type: 'patch' as const, note: 'Kritisk fejl rettet mellem sprints' },
  { version: 'v0.3.0', label: 'Sprint 3', type: 'minor' as const, note: 'Endnu en sprint-release' },
  { version: 'v1.0.0', label: 'Stabil version', type: 'major' as const, note: 'Klar til "rigtig" produktion — breaking change fra 0.x til 1.x' },
];

export const releaseExampleAnnotations = [
  {
    title: 'Tag og semver',
    text: 'Versionen v0.26.2 følger vMAJOR.MINOR.PATCH — her er PATCH bumped, fordi det primært er fejlrettelser.',
  },
  {
    title: 'Oprettet af github-actions',
    text: 'Robot-ikonet viser at releasen er oprettet automatisk via GitHub Actions — ikke manuelt i UI.',
  },
  {
    title: 'Latest-badge',
    text: 'Grøn "Latest" markerer den nyeste release. Det er det punkt kunden typisk skal kigge på.',
  },
  {
    title: 'What\'s Changed',
    text: 'Release-noter lister hvad der er ændret — ofte med links til pull requests og bidragydere.',
  },
];

export const releaseExamples: ReleaseExample[] = [
  {
    title: 'Mercantec elevprojekt',
    url: 'https://github.com/Mercantec-GHC/h2-projekt-gruppe-7-o/releases/tag/v0.2.0',
    description: 'Et konkret eksempel fra en tidligere klasse — release v0.2.0 med release-noter og tag.',
    tag: 'v0.2.0',
  },
  {
    title: 'Dokploy (open source)',
    url: 'https://github.com/Dokploy/dokploy/releases',
    description: 'Se hvordan et professionelt open-source projekt strukturerer releases med semver, noter og assets.',
    tag: 'v0.x – v1.x',
  },
];

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
    command: 'git tag -a v0.2.0 -m "Release version 0.2.0"',
  },
  {
    id: 'push',
    label: 'Push tag',
    title: 'Send tagget til GitHub',
    description:
      'Tags pushes separat fra branches. Du skal eksplicit pushe tagget for at det bliver synligt på GitHub.',
    command: 'git push origin v0.2.0',
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
    code: 'git tag -a v0.2.0 -m "Release version 0.2.0 — sprint 2"\n\n# Verificer tagget:\ngit tag -l "v*"\ngit show v0.2.0',
    codeLabel: 'Terminal',
  },
  {
    id: 'push-tag',
    title: 'Push tag til GitHub',
    summary: 'Tags pushes ikke automatisk med git push — du skal pushe dem eksplicit.',
    details:
      'Du kan pushe et enkelt tag eller alle lokale tags. Efter push er tagget synligt på GitHub under "Releases" og "Tags".',
    code: '# Push et enkelt tag:\ngit push origin v0.2.0\n\n# Eller push alle tags:\ngit push origin --tags',
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
  {
    id: 'q5',
    question: 'Hvilken version bump bruger du når du retter en kritisk fejl uden ny funktionalitet?',
    options: [
      { id: 'a', text: 'PATCH — f.eks. v0.2.0 → v0.2.1' },
      { id: 'b', text: 'MINOR — f.eks. v0.2.0 → v0.3.0' },
      { id: 'c', text: 'MAJOR — f.eks. v0.2.0 → v1.0.0' },
      { id: 'd', text: 'Ingen bump — bare commit direkte på main' },
    ],
    correctId: 'a',
    explanation:
      'Fejlrettelser uden nye features er PATCH-niveau. Og husk: ingen commits på main uden release — så lav en patch-release og push tagget.',
  },
  {
    id: 'q6',
    question: 'Hvorfor starter mange projekter med v0.1.0 og ikke v1.0.0?',
    options: [
      { id: 'a', text: 'v1.0.0 er reserveret til GitHub internt' },
      { id: 'b', text: '0.x signalerer at projektet stadig er under aktiv udvikling' },
      { id: 'c', text: 'Git tillader ikke v1.0.0 som første tag' },
      { id: 'd', text: 'Det er tilfældigt — der er ingen forskel' },
    ],
    correctId: 'b',
    explanation:
      '0.x bruges mens API og funktionalitet stadig ændrer sig markant. v1.0.0 reserveres typisk til første stabile version klar til produktion.',
  },
];

export const upcomingTopics = [
  { title: 'Branches', description: 'Arbejd med branches og merge-strategier', available: false },
  { title: 'Pull Requests', description: 'Review, diskussion og merge af ændringer', available: false },
  { title: 'Issues', description: 'Spor bugs og features med issues', available: false },
];
