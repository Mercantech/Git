import type { FlowNode, GuideStep, QuizQuestion } from './releases';
import type { GitGraphStep } from './git-graph';

export interface IssueType {
  id: string;
  label: string;
  emoji: string;
  description: string;
  titleExample: string;
  bodyTemplate: string;
}

export interface IssueWorkflowStep {
  id: string;
  label: string;
  title: string;
  description: string;
  status: 'open' | 'assigned' | 'in-progress' | 'review' | 'closed';
  tip?: string;
}

export const whyIssuePoints = [
  {
    title: 'Fælles opgaveliste',
    text: 'Issues er teamets todo-liste på GitHub — alle kan se hvad der skal laves, hvem der arbejder på det, og hvad status er.',
  },
  {
    title: 'Dialog med kunden',
    text: 'En bug fra kunden bliver til et issue med beskrivelse, prioritet og opfølgning — ikke en løs besked i chatten.',
  },
  {
    title: 'Sporbarhed til kode',
    text: 'Via "Closes #42" i PRs kan I følge en ændring fra opgave → kode → release. Perfekt til sprint og dokumentation.',
  },
  {
    title: 'Sprint-planlægning',
    text: 'Issues kan lægges på et GitHub Project board med kolonner som Todo, In Progress og Done — jeres digitale sprint-board.',
  },
];

export const teamConventions = [
  {
    title: 'Ét issue per opgave',
    text: 'Opdel store features i mindre issues. "Byg hele appen" er ikke et issue — "Tilføj login-side" er.',
  },
  {
    title: 'Beskriv så andre forstår',
    text: 'En god issue har titel, beskrivelse, steps to reproduce (for bugs) og acceptance criteria (for features).',
  },
  {
    title: 'Tildel ansvar',
    text: 'Assign issue til den der arbejder på det. Så undgår I at to tager samme opgave.',
  },
  {
    title: 'Luk via PR — ikke manuelt',
    text: 'Brug "Closes #12" i PR-beskrivelsen så issue lukkes automatisk ved merge. Det holder boardet opdateret.',
    highlight: true,
  },
];

export const issueTypes: IssueType[] = [
  {
    id: 'bug',
    label: 'Bug',
    emoji: '🐛',
    description: 'Noget virker ikke som forventet — fejl, crash, forkert adfærd.',
    titleExample: 'Login fejler når e-mailfelt er tomt',
    bodyTemplate: `## Beskrivelse
Kort hvad der går galt.

## Steps to reproduce
1. Gå til /login
2. Lad e-mail stå tom
3. Klik "Log ind"

## Forventet adfærd
Valideringsfejl vises.

## Faktisk adfærd
App crasher / ingen fejlbesked.

## Relateret
Sprint 3 · fundet af kunde`,
  },
  {
    id: 'feature',
    label: 'Feature',
    emoji: '✨',
    description: 'Ny funktionalitet eller forbedring kunden eller sprinten kræver.',
    titleExample: 'Tilføj eksport af projektliste til PDF',
    bodyTemplate: `## User story
Som bruger vil jeg kunne eksportere projekter til PDF, så jeg kan dele dem med kunden.

## Acceptance criteria
- [ ] Eksport-knap på dashboard
- [ ] PDF indeholder projektnavn og status
- [ ] Virker i Chrome og Edge

## Relateret
Sprint 4 · kundeforespørgsel`,
  },
  {
    id: 'chore',
    label: 'Chore',
    emoji: '🔧',
    description: 'Teknisk opgave uden bruger-synlig feature — deps, config, oprydning.',
    titleExample: 'Opdater dependencies og ret sikkerhedsadvarsler',
    bodyTemplate: `## Beskrivelse
Opdater npm-pakker og verificer at build stadig virker.

## Acceptance criteria
- [ ] npm audit uden critical
- [ ] CI grøn efter opdatering

## Relateret
Sprint 3 · vedligehold`,
  },
];

export const workflowSteps: IssueWorkflowStep[] = [
  {
    id: 'create',
    label: 'Opret issue',
    title: 'Ny issue på GitHub',
    description:
      'GitHub → Issues → New issue. Vælg skabelon hvis I har en, skriv titel og beskrivelse. Tilføj labels (bug, enhancement) og milestone (sprint).',
    status: 'open',
    tip: 'Gode titler er specifikke: "Fix: validering af e-mail" frem for "Bug i form".',
  },
  {
    id: 'assign',
    label: 'Tildel',
    title: 'Assign og planlæg',
    description:
      'Assign til teammedlem, læg på Project board under "Todo" eller "In Progress". Nu ved alle hvem der ejer opgaven.',
    status: 'assigned',
    tip: 'Brug GitHub Projects til sprint-board med kolonner: Todo → In Progress → Review → Done.',
  },
  {
    id: 'branch',
    label: 'Branch & kode',
    title: 'Arbejd på feature branch',
    description:
      'Opret branch gerne med issue-nummer: feature/42-login-fix. Commits og PR kobles så tydeligt til issue.',
    status: 'in-progress',
    tip: 'Branch-navn med issue-nummer gør det nemt at finde relateret kode senere.',
  },
  {
    id: 'pr',
    label: 'PR & review',
    title: 'Pull request med link',
    description:
      'I PR-beskrivelsen: "Closes #42" eller "Fixes #42". GitHub linker PR og issue automatisk.',
    status: 'review',
    tip: 'I PR kan I skrive "Relates to #42" hvis issue ikke skal lukkes endnu — kun ved fuld løsning: Closes.',
  },
  {
    id: 'close',
    label: 'Lukket',
    title: 'Issue lukkes ved merge',
    description:
      'Når PR merges med "Closes #42", lukkes issue automatisk. Det vises på boardet og i sprint-overblik.',
    status: 'closed',
    tip: 'Lukte issues er jeres dokumentation for hvad der blev leveret i sprinten.',
  },
];

export const graphSteps: GitGraphStep[] = [
  {
    id: 'open',
    label: 'Issue',
    title: 'Issue oprettet',
    description: 'Bug eller feature dokumenteret som issue #42 på GitHub.',
    graphState: 'open',
  },
  {
    id: 'assign',
    label: 'Tildel',
    title: 'Assigned',
    description: 'Issue tildelt teammedlem og lagt på sprint-board.',
    graphState: 'assign',
  },
  {
    id: 'branch',
    label: 'Branch',
    title: 'Kode på branch',
    description: 'fix/42-email branch oprettes. Commits refererer til issue.',
    command: 'git checkout -b fix/42-email-validation',
    graphState: 'branch',
  },
  {
    id: 'pr',
    label: 'PR',
    title: 'Pull request',
    description: 'PR oprettes med "Closes #42" — issue linkes til kode.',
    graphState: 'pr',
  },
  {
    id: 'closed',
    label: 'Lukket',
    title: 'Issue closed',
    description: 'Ved merge lukkes issue automatisk. Sporbarhed fra opgave til release.',
    graphState: 'closed',
  },
];

export const flowNodes: FlowNode[] = [
  {
    id: 'issue',
    label: 'Issue',
    title: 'Opret opgave',
    description: 'Issues er udgangspunktet — bug, feature eller chore dokumenteres før kode skrives.',
  },
  {
    id: 'branch',
    label: 'Branch',
    title: 'Feature branch',
    description: 'Branch oprettes fra issue. Navngivning med issue-nummer anbefales.',
    command: 'git checkout -b fix/42-email-validation',
  },
  {
    id: 'pr',
    label: 'Pull Request',
    title: 'PR med Closes #',
    description: 'PR beskriver løsningen og linker issue. Review og CI som normalt.',
    command: 'Closes #42',
  },
  {
    id: 'merge',
    label: 'Merge',
    title: 'Squash and merge',
    description: 'Ved merge lukkes issue automatisk hvis PR indeholder Closes/Fixes/Resolves #nummer.',
  },
  {
    id: 'release',
    label: 'Release',
    title: 'Sprint-release',
    description: 'Lukkede issues fra sprinten dokumenterer hvad release v0.3.0 indeholder.',
  },
];

export const guideSteps: GuideStep[] = [
  {
    id: 'create',
    title: 'Opret issue',
    summary: 'GitHub → Issues → New issue med titel og skabelon.',
    details:
      'Vælg type (bug/feature/chore). Udfyld beskrivelse så en holdkammerat kan tage over. Tilføj labels og sprint-milestone hvis I bruger det.',
    code: '# GitHub:\n# Issues → New issue\n# Titel: fix(auth): login fejler ved tom e-mail\n# Label: bug\n# Milestone: Sprint 3',
    codeLabel: 'GitHub',
  },
  {
    id: 'plan',
    title: 'Planlæg på board',
    summary: 'Assign og flyt til In Progress på Project board.',
    details:
      'GitHub Projects giver kanban-visning. Træk issue til rigtig kolonne. Kommuniker i standup hvem der tager hvad.',
    code: '# GitHub:\n# Projects → Sprint board\n# Assign: @marcus\n# Status: In Progress',
    codeLabel: 'GitHub',
  },
  {
    id: 'implement',
    title: 'Implementer på branch',
    summary: 'Opret branch, commit, push — som I kender fra branches-flowet.',
    details:
      'Kobl branch til issue via nummer i navn eller PR. Reference issue i commits: "fix(auth): valider tom e-mail (#42)".',
    code: 'git checkout -b fix/42-email-validation\n# ... arbejd og commit ...\ngit push -u origin fix/42-email-validation',
    codeLabel: 'Terminal',
  },
  {
    id: 'pr',
    title: 'PR med Closes #',
    summary: 'Opret PR og inkluder Closes #42 i beskrivelsen.',
    details:
      'Keywords der lukker issue ved merge: Closes, Fixes, Resolves. Skriv det i PR body — ikke kun titel.',
    code: '## Hvad gør denne PR?\nRetter validering når e-mailfelt er tomt.\n\n## Relateret\nCloses #42',
    codeLabel: 'PR-beskrivelse',
  },
  {
    id: 'done',
    title: 'Merge og verificer',
    summary: 'Efter merge: issue lukket, board opdateret.',
    details:
      'Tjek at issue viser "Closed via PR #15". På release kan I referere til lukkede issues i release-noter.',
    code: '# Verificer på GitHub:\n# Issue #42 → Closed\n# Linked PR #15 → Merged',
    codeLabel: 'GitHub',
  },
];

export const goodBadExamples = [
  {
    bad: 'Bug',
    good: 'Login fejler når e-mailfelt er tomt',
    why: 'Titlen skal sige hvad der er galt — ikke bare "Bug".',
  },
  {
    bad: 'Fix login',
    good: 'Som bruger vil jeg se fejlbesked ved ugyldig e-mail',
    why: 'Features beskrives som user stories med acceptance criteria.',
  },
  {
    bad: '(tom beskrivelse)',
    good: 'Steps to reproduce + forventet/faktisk adfærd',
    why: 'Uden steps kan ingen anden genproducere buggen.',
  },
  {
    bad: 'Issue lukkes manuelt uden PR',
    good: 'Closes #42 i merged PR',
    why: 'Automatisk lukning sikrer sporbarhed fra issue til kode.',
  },
];

export const linkingKeywords = [
  { keyword: 'Closes #42', effect: 'Lukker issue #42 når PR merges' },
  { keyword: 'Fixes #42', effect: 'Samme som Closes — lukker ved merge' },
  { keyword: 'Resolves #42', effect: 'Samme som Closes — lukker ved merge' },
  { keyword: 'Relates to #42', effect: 'Linker uden at lukke — til delvis arbejde' },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Hvad er hovedformålet med GitHub Issues?',
    options: [
      { id: 'a', text: 'At erstatte commits' },
      { id: 'b', text: 'At spore opgaver, bugs og features med status og ansvar' },
      { id: 'c', text: 'At hoste produktionskode' },
      { id: 'd', text: 'At oprette releases automatisk' },
    ],
    correctId: 'b',
    explanation:
      'Issues er opgavestyring på GitHub — fra idé/bug til lukket via PR og release.',
  },
  {
    id: 'q2',
    question: 'Hvordan lukkes et issue automatisk ved merge?',
    options: [
      { id: 'a', text: 'Skriv "Closes #42" i PR-beskrivelsen og merge PR\'en' },
      { id: 'b', text: 'Slet issue manuelt efter merge' },
      { id: 'c', text: 'Opret en ny release' },
      { id: 'd', text: 'Kommenter "done" på issue' },
    ],
    correctId: 'a',
    explanation:
      'Closes/Fixes/Resolves #nummer i PR body lukker issue automatisk når PR merges til main.',
  },
  {
    id: 'q3',
    question: 'Hvad bør en bug-issue minimum indeholde?',
    options: [
      { id: 'a', text: 'Kun titlen "Bug"' },
      { id: 'b', text: 'Steps to reproduce og forventet vs. faktisk adfærd' },
      { id: 'c', text: 'Kun assignee' },
      { id: 'd', text: 'Link til Spotify' },
    ],
    correctId: 'b',
    explanation:
      'En anden skal kunne genproducere buggen. Steps og forventet/faktisk adfærd er minimum.',
  },
  {
    id: 'q4',
    question: 'Hvorfor bruge issue-nummer i branch-navn (fx fix/42-login)?',
    options: [
      { id: 'a', text: 'Git kræver det teknisk' },
      { id: 'b', text: 'Det gør det nemt at finde relateret kode og PR til issue #42' },
      { id: 'c', text: 'Det opretter automatisk en release' },
      { id: 'd', text: 'Det forhindrer merge-konflikter helt' },
    ],
    correctId: 'b',
    explanation:
      'Sporbarhed: fra issue → branch → commits → PR → merge. God vane i teams.',
  },
  {
    id: 'q5',
    question: 'Hvad er forskellen på "Closes #42" og "Relates to #42"?',
    options: [
      { id: 'a', text: 'Ingen forskel' },
      { id: 'b', text: 'Closes lukker issue ved merge; Relates to linker uden at lukke' },
      { id: 'c', text: 'Relates to sletter issue' },
      { id: 'd', text: 'Closes virker kun på releases' },
    ],
    correctId: 'b',
    explanation:
      'Brug Closes når PR fuldt løser issue. Relates to ved delvis arbejde eller reference.',
  },
];
