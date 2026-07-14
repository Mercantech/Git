import type { FlowNode, GuideStep, QuizQuestion } from './releases';

export interface BranchWorkflowStep {
  id: string;
  label: string;
  title: string;
  description: string;
  command?: string;
  /** Which commits light up on the graph: 'main' | 'feature' | 'merged' */
  graphState: 'start' | 'branch' | 'work' | 'push' | 'merge';
}

export const whyBranchPoints = [
  {
    title: 'Parallel udvikling',
    text: 'Flere i teamet kan arbejde samtidigt på hver deres feature uden at træde hinanden over tæerne.',
  },
  {
    title: 'Main forbliver stabil',
    text: 'Main er jeres leverance-klare kode. Features udvikles isoleret på branches og merges først når de er klar og reviewet.',
  },
  {
    title: 'Tryg eksperimenteren',
    text: 'Skal I prøve noget risikabelt? Lav en branch. Virker det ikke, sletter I den — main er urørt.',
  },
  {
    title: 'Kobling til sprint og PR',
    text: 'En branch per feature/issue er standard. Den bliver til en pull request og merges når sprint-opgaven er færdig.',
  },
];

export const teamConventions = [
  {
    title: 'Én branch per feature',
    text: 'Navngiv efter opgaven: feature/login, fix/form-validation, chore/update-deps. Ikke "test" eller "marcus-branch".',
  },
  {
    title: 'Start altid fra opdateret main',
    text: 'Før du opretter en branch: git checkout main && git pull. Så undgår I konflikter fra start.',
  },
  {
    title: 'Hold branches kortelevet',
    text: 'En branch bør leve dage — ikke uger. Merge og slet når featuren er færdig, så I undgår store merge-konflikter.',
  },
  {
    title: 'Main = det kunden ser',
    text: 'Ingen direkte commits på main. Alt arbejde sker på branches og ind via pull request — klar til release.',
    highlight: true,
  },
];

export const branchNamingExamples = [
  { good: 'feature/dashboard', bad: 'ny-feature', why: 'Prefix viser type; kebab-case er standard.' },
  { good: 'fix/email-validation', bad: 'fix', why: 'Scope i navnet gør det tydeligt hvad branchen handler om.' },
  { good: 'chore/update-dependencies', bad: 'marcus', why: 'Branches er til opgaver — ikke personnavne.' },
  { good: 'feature/issue-42-user-profile', bad: 'test123', why: 'Kobl gerne til issue-nummer for sporbarhed.' },
];

export const workflowSteps: BranchWorkflowStep[] = [
  {
    id: 'main',
    label: 'main',
    title: 'Start på main',
    description:
      'Main indeholder den seneste stabile kode. Sørg for at den er opdateret fra GitHub før du opretter en ny branch.',
    command: 'git checkout main\ngit pull origin main',
    graphState: 'start',
  },
  {
    id: 'create',
    label: 'Opret branch',
    title: 'Opret feature branch',
    description:
      'Med git checkout -b opretter du en ny branch og skifter til den med det samme. Branchen starter fra mains nuværende commit.',
    command: 'git checkout -b feature/login',
    graphState: 'branch',
  },
  {
    id: 'work',
    label: 'Arbejd & commit',
    title: 'Commit på branchen',
    description:
      'Alle commits lander nu på feature-branchen — main er urørt. Commit ofte med conventional commits mens I bygger featuren.',
    command: 'git add .\ngit commit -m "feat(auth): tilføj login-formular"',
    graphState: 'work',
  },
  {
    id: 'push',
    label: 'Push branch',
    title: 'Push til GitHub',
    description:
      'Push branchen til remote så holdkammerater kan se den, og så I kan oprette en pull request.',
    command: 'git push -u origin feature/login',
    graphState: 'push',
  },
  {
    id: 'merge',
    label: 'Merge via PR',
    title: 'Pull request og merge',
    description:
      'Opret en PR på GitHub, få review, og merge ind i main. Derefter kan branchen slettes — den har gjort sit job.',
    command: '# GitHub: Pull requests → New pull request\n# Efter merge:\ngit branch -d feature/login',
    graphState: 'merge',
  },
];

export const flowNodes: FlowNode[] = [
  {
    id: 'checkout',
    label: 'Opret branch',
    title: 'git checkout -b',
    description:
      'Opretter en ny branch baseret på din nuværende position (typisk main) og skifter til den automatisk.',
    command: 'git checkout -b feature/min-feature',
  },
  {
    id: 'commit',
    label: 'Commit',
    title: 'Arbejd isoleret',
    description:
      'Commits på branchen påvirker ikke main. I kan arbejde frit indtil featuren er klar til review.',
    command: 'git commit -m "feat(scope): beskrivelse"',
  },
  {
    id: 'push',
    label: 'Push branch',
    title: 'Del branchen',
    description:
      'Første push af en ny branch kræver -u for at sætte upstream. Derefter kan du bare bruge git push.',
    command: 'git push -u origin feature/min-feature',
  },
  {
    id: 'pr',
    label: 'Pull Request',
    title: 'Review og merge',
    description:
      'PR er jeres kvalitetsport: code review, diskussion og CI-checks inden ændringer lander på main.',
  },
  {
    id: 'cleanup',
    label: 'Oprydning',
    title: 'Slet branchen',
    description:
      'Efter merge slettes feature-branchen lokalt og på GitHub. Main har nu jeres ændringer.',
    command: 'git branch -d feature/min-feature\ngit push origin --delete feature/min-feature',
  },
];

export const guideSteps: GuideStep[] = [
  {
    id: 'update-main',
    title: 'Opdater main',
    summary: 'Sørg for at main er synkroniseret med GitHub.',
    details:
      'Altid start fra den nyeste main. Det minimerer merge-konflikter og sikrer at jeres branch bygger på det seneste team har merged.',
    code: 'git checkout main\ngit pull origin main',
    codeLabel: 'Terminal',
  },
  {
    id: 'create-branch',
    title: 'Opret og skift til branch',
    summary: 'Opret en feature branch med et beskrivende navn.',
    details:
      'Brug prefix: feature/, fix/, chore/. Navnet skal sige hvad branchen gør — ikke hvem der arbejder på den.',
    code: 'git checkout -b feature/dashboard\n\n# Verificer at du er på branchen:\ngit branch',
    codeLabel: 'Terminal',
  },
  {
    id: 'work',
    title: 'Arbejd og commit',
    summary: 'Byg featuren og commit løbende på branchen.',
    details:
      'Main er beskyttet. Alle ændringer og commits sker på feature-branchen indtil I er klar til pull request.',
    code: '# ... rediger filer ...\ngit add .\ngit commit -m "feat(dashboard): tilføj projektoversigt"',
    codeLabel: 'Terminal',
  },
  {
    id: 'push',
    title: 'Push branchen',
    summary: 'Send branchen til GitHub og sæt upstream.',
    details:
      '-u (--set-upstream) kobler din lokale branch til remote. Efterfølgende pushes kan bruge bare git push.',
    code: 'git push -u origin feature/dashboard',
    codeLabel: 'Terminal',
  },
  {
    id: 'pr-merge',
    title: 'Opret PR og merge',
    summary: 'Pull request på GitHub → review → merge til main.',
    details:
      'Beskriv hvad PR\'en gør og link til issue. Efter merge: checkout main, pull, og slet den lokale feature branch.',
    code: 'git checkout main\ngit pull origin main\ngit branch -d feature/dashboard',
    codeLabel: 'Terminal',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Hvad er hovedformålet med en feature branch?',
    options: [
      { id: 'a', text: 'At erstatte main permanent' },
      { id: 'b', text: 'At udvikle én ændring isoleret uden at påvirke main' },
      { id: 'c', text: 'At gemme releases som v0.2.0' },
      { id: 'd', text: 'At pushe direkte til kunden' },
    ],
    correctId: 'b',
    explanation:
      'Feature branches isolerer arbejde. Main forbliver stabil indtil I merger via pull request.',
  },
  {
    id: 'q2',
    question: 'Hvilken kommando opretter en ny branch og skifter til den?',
    options: [
      { id: 'a', text: 'git branch feature/login' },
      { id: 'b', text: 'git checkout -b feature/login' },
      { id: 'c', text: 'git merge feature/login' },
      { id: 'd', text: 'git tag feature/login' },
    ],
    correctId: 'b',
    explanation:
      'git checkout -b opretter og skifter i ét trin. git branch alene opretter kun — du bliver på nuværende branch.',
  },
  {
    id: 'q3',
    question: 'Hvad bør du gøre FØR du opretter en ny branch?',
    options: [
      { id: 'a', text: 'Slette main' },
      { id: 'b', text: 'Checkout main og pull seneste ændringer' },
      { id: 'c', text: 'Merge alle branches manuelt' },
      { id: 'd', text: 'Oprette en release' },
    ],
    correctId: 'b',
    explanation:
      'Start fra opdateret main så jeres branch bygger på det nyeste team har leveret — færre konflikter senere.',
  },
  {
    id: 'q4',
    question: 'Hvilket branch-navn følger bedst vores konventioner?',
    options: [
      { id: 'a', text: 'marcus-test' },
      { id: 'b', text: 'feature/user-login' },
      { id: 'c', text: 'Branch1' },
      { id: 'd', text: 'main-copy' },
    ],
    correctId: 'b',
    explanation:
      'feature/ prefix + beskrivende kebab-case navn. Personnavne og vage navne gør det svært for teamet at orientere sig.',
  },
  {
    id: 'q5',
    question: 'Hvad sker der med main når du committer på feature/login?',
    options: [
      { id: 'a', text: 'Main opdateres automatisk med dine commits' },
      { id: 'b', text: 'Intet — main er urørt indtil branchen merges via PR' },
      { id: 'c', text: 'Main slettes midlertidigt' },
      { id: 'd', text: 'Commits afvises af Git' },
    ],
    correctId: 'b',
    explanation:
      'Commits på en feature branch påvirker kun den branch. Main opdateres først når PR merges.',
  },
];
