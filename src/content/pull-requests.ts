import type { FlowNode, GuideStep, QuizQuestion } from './releases';
import type { GitGraphStep } from './git-graph';

export interface PrWorkflowStep {
  id: string;
  label: string;
  title: string;
  description: string;
  status: 'draft' | 'open' | 'review' | 'changes' | 'approved' | 'merged';
  tip?: string;
}

export const whyPrPoints = [
  {
    title: 'Kvalitetsport til main',
    text: 'En PR er det sted hvor kode tjekkes inden den rammer main — jeres leverance-klare gren.',
  },
  {
    title: 'Dialog og læring',
    text: 'Review er ikke kontrol for kontrollens skyld. Det er en samtale hvor teamet deler viden og fanger fejl tidligt.',
  },
  {
    title: 'Dokumentation af beslutninger',
    text: 'PR-beskrivelse, kommentarer og godkendelser gemmer hvorfor I valgte som I gjorde — guld værd uger senere.',
  },
  {
    title: 'Synlighed for kunden og underviser',
    text: 'Pull requests viser præcis hvad der er bygget i sprinten. Det er jeres historie før release.',
  },
];

export const teamConventions = [
  {
    title: 'Små PRs',
    text: 'En PR per feature eller fix. Store PRs med 50 filer er næsten umulige at reviewe ordentligt.',
  },
  {
    title: 'Beskriv hvad og hvorfor',
    text: 'Titel + beskrivelse skal forklare ændringen for nogen der ikke har siddet i jeres hoved. Link til issue.',
  },
  {
    title: 'Vent på review',
    text: 'Merge ikke din egen PR uden at en holdkammerat har set på den — medmindre I har aftalt andet.',
  },
  {
    title: 'Grøn CI før merge',
    text: 'Alle checks skal være grønne. En PR med røde tests merges ikke — fix først, så merge.',
    highlight: true,
  },
];

export const prDescriptionTemplate = `## Hvad gør denne PR?
Kort beskrivelse af ændringen — hvad kan brugeren/kunden nu gøre?

## Hvorfor?
Kontekst: sprint-opgave, bug, kundeforespørgsel.

## Sådan testes det
1. Gå til /login
2. Indtast test-bruger
3. Verificer redirect til dashboard

## Relateret
Closes #42`;

export const reviewChecklist = [
  'Koden gør det den skal — har du testet manuelt?',
  'Navngivning og struktur følger projektets konventioner',
  'Ingen unødvendige filer (console.log, kommenteret kode, node_modules)',
  'Commit-beskeder er conventional commits',
  'PR-beskrivelsen forklarer ændringen uden at man skal gætte',
  'Ingen merge-konflikter — branch er opdateret fra main',
];

export const workflowSteps: PrWorkflowStep[] = [
  {
    id: 'open',
    label: 'Opret PR',
    title: 'Åbn pull request',
    description:
      'På GitHub: Pull requests → New pull request. Vælg feature branch som source og main som target. Skriv titel og beskrivelse.',
    status: 'open',
    tip: 'Brug "Closes #12" i beskrivelsen for at linke issue automatisk.',
  },
  {
    id: 'review',
    label: 'Code review',
    title: 'Teamet reviewer',
    description:
      'Holdkammerater læser diff\'en linje for linje. De kan efterlade kommentarer, stille spørgsmål og foreslå ændringer.',
    status: 'review',
    tip: 'Vær konstruktiv: "Hvad tænker du om at udtrække dette?" frem for "Det her er forkert".',
  },
  {
    id: 'changes',
    label: 'Ret feedback',
    title: 'Adresser kommentarer',
    description:
      'Forfatteren retter kode baseret på feedback, pusher nye commits til samme branch — PR\'en opdateres automatisk.',
    status: 'changes',
    tip: 'Svar på kommentarer når du har rettet ("Fixed in abc123") så reviewer ved det er håndteret.',
  },
  {
    id: 'approved',
    label: 'Godkendt',
    title: 'Approve',
    description:
      'Når reviewer er tilfreds, trykker de Approve. Mange teams kræver mindst én approval før merge.',
    status: 'approved',
    tip: 'Approval betyder "jeg stoler på at dette kan merges" — ikke bare "jeg har skimmet det".',
  },
  {
    id: 'merged',
    label: 'Merge',
    title: 'Merge til main',
    description:
      'Med grøn CI og approval merges PR\'en ind i main. Feature-branchen kan slettes bagefter.',
    status: 'merged',
    tip: 'Efter merge: git checkout main && git pull — så er du klar til næste feature branch.',
  },
];

export const graphSteps: GitGraphStep[] = [
  {
    id: 'pushed',
    label: 'Push branch',
    title: 'Branch på GitHub',
    description: 'Feature-branchen er pushet. Commits eksisterer på remote — klar til pull request.',
    command: 'git push -u origin feature/login',
    graphState: 'pushed',
  },
  {
    id: 'open',
    label: 'Opret PR',
    title: 'Pull request åben',
    description: 'PR oprettes: main ← feature/login. Diff vises, CI starter.',
    graphState: 'open',
  },
  {
    id: 'review',
    label: 'Review',
    title: 'Code review',
    description: 'Teamet gennemgår ændringer. Nye commits på branchen opdaterer PR automatisk.',
    graphState: 'review',
  },
  {
    id: 'approved',
    label: 'Godkendt',
    title: 'Approved',
    description: 'Mindst én reviewer har godkendt. CI er grøn. Klar til merge.',
    graphState: 'approved',
  },
  {
    id: 'merged',
    label: 'Merged',
    title: 'Merged til main',
    description: 'Squash and merge — feature-commits bliver én commit på main. Branch kan slettes.',
    command: 'git checkout main && git pull',
    graphState: 'merged',
  },
];

export const flowNodes: FlowNode[] = [
  {
    id: 'push',
    label: 'Push branch',
    title: 'Branch på GitHub',
    description:
      'PR kræver at din feature branch er pushet til GitHub. Uden push kan du ikke oprette en PR.',
    command: 'git push -u origin feature/login',
  },
  {
    id: 'create',
    label: 'Opret PR',
    title: 'New pull request',
    description:
      'Vælg base: main ← compare: feature/login. GitHub viser diff og om der er konflikter.',
  },
  {
    id: 'review',
    label: 'Review',
    title: 'Files changed',
    description:
      'Reviewers gennemgår ændringer under "Files changed". Inline-kommentarer på specifikke linjer.',
  },
  {
    id: 'ci',
    label: 'CI checks',
    title: 'Automatiske tests',
    description:
      'GitHub Actions kører tests og build. Røde checks blokerer typisk merge — fix og push igen.',
  },
  {
    id: 'merge',
    label: 'Merge',
    title: 'Merge pull request',
    description:
      'Squash merge, merge commit eller rebase — for elever er "Squash and merge" ofte finest (én commit på main).',
    command: '# Efter merge på GitHub:\ngit checkout main\ngit pull origin main',
  },
];

export const guideSteps: GuideStep[] = [
  {
    id: 'ready',
    title: 'Sørg for at branchen er klar',
    summary: 'Feature færdig, committet og pushet. CI grøn lokalt hvis muligt.',
    details:
      'Tjek at alle commits er pushet, at PR\'en ikke er for stor, og at du har testet manuelt. Opdater branch fra main hvis nødvendigt.',
    code: 'git push origin feature/dashboard\n\n# Opdater fra main hvis teamet har merged:\ngit checkout feature/dashboard\ngit merge main',
    codeLabel: 'Terminal',
  },
  {
    id: 'create',
    title: 'Opret pull request',
    summary: 'GitHub → Pull requests → New. Vælg branch og skriv titel + beskrivelse.',
    details:
      'Titlen bør matche conventional commits: feat(dashboard): tilføj projektoversigt. Beskriv hvad, hvorfor og hvordan man tester.',
    code: '# På GitHub:\n# Pull requests → New pull request\n# base: main ← compare: feature/dashboard',
    codeLabel: 'GitHub',
  },
  {
    id: 'review',
    title: 'Få review fra teamet',
    summary: 'Bed en holdkammerat om at kigge på "Files changed".',
    details:
      'Reviewer læser koden, efterlader kommentarer og vælger Approve eller Request changes. Forfatter svarer og retter.',
    code: '# Reviewer på GitHub:\n# Files changed → Add comment → Review changes\n# Submit: Approve / Request changes',
    codeLabel: 'GitHub',
  },
  {
    id: 'fix',
    title: 'Ret feedback og push',
    summary: 'Nye commits på samme branch opdaterer PR\'en automatisk.',
    details:
      'Du behøver ikke oprette ny PR. Push til feature-branchen — GitHub opdaterer diff og genkører CI.',
    code: 'git add .\ngit commit -m "fix(dashboard): håndter tom projektliste"\ngit push',
    codeLabel: 'Terminal',
  },
  {
    id: 'merge',
    title: 'Merge og opryd',
    summary: 'Merge når approved og CI er grøn. Slet branch og opdater lokal main.',
    details:
      'Klik "Squash and merge" eller "Merge pull request" på GitHub. Slet remote branch. Lokalt: checkout main, pull, slet feature branch.',
    code: 'git checkout main\ngit pull origin main\ngit branch -d feature/dashboard',
    codeLabel: 'Terminal',
  },
];

export const goodBadExamples = [
  {
    bad: 'Update',
    good: 'feat(auth): tilføj login med JWT',
    why: 'Titlen skal sige hvad PR\'en gør — "Update" siger intet.',
  },
  {
    bad: 'Fixed stuff, please merge ASAP!!!',
    good: 'fix(form): valider e-mail og vis fejlbesked',
    why: 'Professionel tone. Beskriv den konkrete rettelse.',
  },
  {
    bad: '(ingen beskrivelse)',
    good: 'Beskrivelse med hvad / hvorfor / test / Closes #42',
    why: 'Reviewer og kunde skal forstå ændringen uden at gætte.',
  },
  {
    bad: 'PR med 40 filer og 3 features',
    good: 'Én PR per feature — fx kun login-flowet',
    why: 'Små PRs reviewes hurtigere og bedre.',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Hvad er hovedformålet med en pull request?',
    options: [
      { id: 'a', text: 'At erstatte git push' },
      { id: 'b', text: 'At få kode reviewet og merged ind i main på en kontrolleret måde' },
      { id: 'c', text: 'At oprette en release' },
      { id: 'd', text: 'At slette en feature branch' },
    ],
    correctId: 'b',
    explanation:
      'PR er kvalitetsporten til main: review, diskussion og CI inden kode merges.',
  },
  {
    id: 'q2',
    question: 'Hvad sker der når du pusher nye commits til en branch med åben PR?',
    options: [
      { id: 'a', text: 'Du skal oprette en ny PR' },
      { id: 'b', text: 'PR\'en opdateres automatisk med de nye ændringer' },
      { id: 'c', text: 'PR\'en lukkes automatisk' },
      { id: 'd', text: 'Main opdateres med det samme' },
    ],
    correctId: 'b',
    explanation:
      'PR følger branchen. Nye commits pushes til samme branch — diff og checks opdateres.',
  },
  {
    id: 'q3',
    question: 'Hvornår bør du merge en PR?',
    options: [
      { id: 'a', text: 'Straks når du har oprettet den' },
      { id: 'b', text: 'Når den er approved og CI/checks er grønne' },
      { id: 'c', text: 'Kun fredag eftermiddag' },
      { id: 'd', text: 'Når main har konflikter' },
    ],
    correctId: 'b',
    explanation:
      'Merge når kode er reviewet, godkendt og tests passerer. Aldrig med røde checks.',
  },
  {
    id: 'q4',
    question: 'Hvad gør "Closes #42" i en PR-beskrivelse?',
    options: [
      { id: 'a', text: 'Sletter issue #42 permanent uden merge' },
      { id: 'b', text: 'Linker og lukker automatisk issue #42 når PR merges' },
      { id: 'c', text: 'Opretter en ny release' },
      { id: 'd', text: 'Blokerer merge indtil issue er manuelt lukket' },
    ],
    correctId: 'b',
    explanation:
      'GitHub lukker linkede issues automatisk ved merge — god sporbarhed fra opgave til kode.',
  },
  {
    id: 'q5',
    question: 'Hvem bør typisk godkende (approve) en PR i et elevteam?',
    options: [
      { id: 'a', text: 'Kun underviseren — aldrig holdkammerater' },
      { id: 'b', text: 'En anden i teamet end forfatteren' },
      { id: 'c', text: 'Kun den der har skrevet PR\'en' },
      { id: 'd', text: 'Ingen — approval er valgfrit og meningsløst' },
    ],
    correctId: 'b',
    explanation:
      'Peer review er pointen: friske øjne fanger fejl. Forfatter merger ikke uden at nogen anden har set koden.',
  },
];
