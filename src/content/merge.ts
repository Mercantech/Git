import type { FlowNode, GuideStep, QuizQuestion } from './releases';

export interface MergeStrategy {
  id: string;
  label: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  when: string;
  recommended?: boolean;
}

export interface ConflictStep {
  id: string;
  label: string;
  title: string;
  description: string;
  code?: string;
  fileContent?: string;
  resolved?: boolean;
}

export const whyMergePoints = [
  {
    title: 'Samler teamets arbejde',
    text: 'Merge er øjeblikket hvor jeres feature bliver en del af main — klar til næste sprint og release.',
  },
  {
    title: 'Integrering kræver samarbejde',
    text: 'Når to har ændret samme kode, skal I aftale hvad der er rigtigt. Det er normalt — ikke en fejl.',
  },
  {
    title: 'Konflikter er en samtale',
    text: 'En merge conflict siger: "I har begge rørt dette — lad os beslutte sammen." Det er Git der beskytter jer mod at overskrive hinanden.',
  },
  {
    title: 'Forebyg med gode vaner',
    text: 'Opdater branch fra main ofte, hold PRs små og kommuniker hvem der arbejder på hvad — så får I færre konflikter.',
  },
];

export const teamConventions = [
  {
    title: 'Squash and merge på PRs',
    text: 'Som udgangspunkt bruger I "Squash and merge" på GitHub — én pæn commit på main per feature.',
  },
  {
    title: 'Opdater fra main før merge',
    text: 'Før I merger: merge eller rebase main ind i jeres branch og løs konflikter dér — ikke på main.',
  },
  {
    title: 'Løs konflikter sammen',
    text: 'Forstår du ikke begge ændringer? Tag en kort snak med den der lavede den anden ændring — blind sletning giver bugs.',
  },
  {
    title: 'Test efter merge',
    text: 'Efter konfliktløsning: kør appen og tests. Konfliktmarkører væk betyder ikke automatisk at koden virker.',
    highlight: true,
  },
];

export const mergeStrategies: MergeStrategy[] = [
  {
    id: 'merge',
    label: 'Merge commit',
    title: 'Create a merge commit',
    description:
      'Bevarer hele historikken fra feature-branchen og opretter et merge commit på main. Git-grafen viser tydeligt at to grene mødtes.',
    pros: ['Fuld historik bevares', 'Simpelt og sikkert', 'Godt til større features med mange commits'],
    cons: ['Main-historik kan blive "busket"', 'Mange små commits fra WIP kan rodne historikken'],
    when: 'Bruges når I vil bevare alle commits fra branchen som de er.',
  },
  {
    id: 'squash',
    label: 'Squash and merge',
    title: 'Squash and merge',
    description:
      'Squasher alle commits fra PR\'en til én enkelt commit på main. PR-titel og beskrivelse bliver typisk commit-beskeden.',
    pros: ['Ren main-historik — én commit per feature', 'Nem at læse git log', 'Perfekt til elev-PRs'],
    cons: ['Individuelle commits fra branchen forsvinner på main', 'Squashed commit får ny hash'],
    when: 'Anbefalet som standard i jeres PR-workflow.',
    recommended: true,
  },
  {
    id: 'rebase',
    label: 'Rebase and merge',
    title: 'Rebase and merge',
    description:
      'Rebaser branchens commits oven på main uden merge commit. Historikken bliver lineær — som om I altid arbejdede på main.',
    pros: ['Helt lineær historik', 'Ingen merge commits'],
    cons: ['Kræver mere Git-erfaring', 'Kan give konflikter under rebase', 'Omskriver commit-historik'],
    when: 'Bruges i modne teams med lineær historik-politik — sjældent nødvendigt i elevprojekter.',
  },
];

export const conflictSteps: ConflictStep[] = [
  {
    id: 'trigger',
    label: 'Konflikt opstår',
    title: 'Git stopper merge',
    description:
      'Når du merger main ind i din branch (eller omvendt), og samme linjer er ændret forskelligt, stopper Git og beder dig løse det manuelt.',
    code: 'git checkout feature/dashboard\ngit merge main\n\n# CONFLICT (content): Merge conflict in src/App.tsx\n# Automatic merge failed; fix conflicts and then commit.',
    fileContent: `# Filen er endnu uændret — Git venter på dig`,
  },
  {
    id: 'markers',
    label: 'Se markører',
    title: 'Conflict markers i filen',
    description:
      'Git indsætter markører i filen: <<<<<<< (din version), ======= (skillelinje), >>>>>>> (main/anden branch). Alt mellem markørerne skal erstattes af den endelige kode.',
    fileContent: `function getTitle() {
<<<<<<< HEAD
  return "Dashboard";
=======
  return "Projektoversigt";
>>>>>>> main
}`,
  },
  {
    id: 'resolve',
    label: 'Vælg løsning',
    title: 'Rediger til final kode',
    description:
      'Slet markørerne og skriv den kode der skal bruges — måske én version, måske en kombination. Spørg din makker hvis du er i tvivl.',
    fileContent: `function getTitle() {
  return "Projektoversigt";
}`,
    resolved: true,
  },
  {
    id: 'stage',
    label: 'Stage fil',
    title: 'Markér som løst',
    description:
      'Når filen er korrekt, stage den med git add. Git forstår at konflikten i den fil er løst.',
    code: 'git add src/App.tsx\n\n# Tjek status:\ngit status\n# All conflicts fixed but you are still merging.',
    fileContent: `function getTitle() {
  return "Projektoversigt";
}`,
    resolved: true,
  },
  {
    id: 'commit',
    label: 'Afslut merge',
    title: 'Commit merge',
    description:
      'Afslut med git commit. Git åbner ofte en editor med en forudfyldt merge-besked — gem og luk.',
    code: 'git commit -m "merge main into feature/dashboard"\n\n# Eller fortsæt med PR efter push:\ngit push',
    fileContent: `function getTitle() {
  return "Projektoversigt";
}`,
    resolved: true,
  },
];

export const flowNodes: FlowNode[] = [
  {
    id: 'update',
    label: 'Hent main',
    title: 'git pull / merge main',
    description:
      'Opdater din branch med det seneste fra main inden merge til main. Konflikter løses her — ikke på main.',
    command: 'git checkout feature/dashboard\ngit merge main',
  },
  {
    id: 'conflict',
    label: 'Konflikt?',
    title: 'Løs manuelt',
    description:
      'Hvis Git rapporterer conflict: åbn filerne, fjern markører, test, git add, git commit.',
  },
  {
    id: 'pr',
    label: 'PR merge',
    title: 'Merge på GitHub',
    description:
      'Når branch er opdateret og CI grøn: Squash and merge på GitHub. Konflikter kan også løses i GitHub UI.',
  },
  {
    id: 'local',
    label: 'Opdater lokal',
    title: 'git pull main',
    description:
      'Efter merge på GitHub: checkout main og pull så din lokale main matcher remote.',
    command: 'git checkout main\ngit pull origin main',
  },
];

export const guideSteps: GuideStep[] = [
  {
    id: 'prevent',
    title: 'Forebyg konflikter',
    summary: 'Pull main ofte ind i din branch mens du arbejder.',
    details:
      'Jo længere din branch lever uden at synce med main, jo større risiko for konflikter. Sync dagligt eller når holdkammerater har merged.',
    code: 'git checkout feature/dashboard\ngit merge main',
    codeLabel: 'Terminal',
  },
  {
    id: 'identify',
    title: 'Identificer konflikter',
    summary: 'git status viser hvilke filer der har konflikter.',
    details:
      'Søg efter <<<<<<< i projektet. Din editor (VS Code, Cursor) fremhæver ofte konflikter med knapper "Accept Current/Incoming/Both".',
    code: 'git status\n\n# Unmerged paths:\n#   both modified:   src/App.tsx',
    codeLabel: 'Terminal',
  },
  {
    id: 'resolve',
    title: 'Løs og test',
    summary: 'Rediger filer, fjern markører, kør appen.',
    details:
      'Forstå begge ændringer før du vælger. Nogle gange skal du beholde begge dele — f.eks. import fra den ene og logik fra den anden.',
    code: '# Før (konflikt):\n<<<<<<< HEAD\nreturn "Dashboard";\n=======\nreturn "Projektoversigt";\n>>>>>>> main\n\n# Efter (løst):\nreturn "Projektoversigt";',
    codeLabel: 'Kode',
  },
  {
    id: 'complete',
    title: 'Stage og commit',
    summary: 'git add de løste filer og afslut merge.',
    details:
      'Alle konfliktfiler skal stages. git status skal vise "All conflicts fixed". Derefter commit for at afslutte merge.',
    code: 'git add src/App.tsx\ngit commit -m "merge main into feature/dashboard"',
    codeLabel: 'Terminal',
  },
  {
    id: 'github',
    title: 'Merge PR på GitHub',
    summary: 'Når branch er grøn: Squash and merge.',
    details:
      'GitHub viser "This branch has conflicts" hvis I ikke har merged main ind. Løs lokalt, push, og merge-knappen bliver tilgængelig.',
    code: '# GitHub: Squash and merge\n# Derefter lokalt:\ngit checkout main\ngit pull origin main',
    codeLabel: 'GitHub / Terminal',
  },
];

export const preventionTips = [
  'Merge main ind i din branch mindst dagligt',
  'Kommuniker hvem der rører samme filer',
  'Hold PRs små — færre filer = færre konflikter',
  'Brug issue board så to ikke tager samme opgave',
  'Løs konflikter med det samme — de bliver ikke bedre med tiden',
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Hvad betyder det når Git rapporterer en merge conflict?',
    options: [
      { id: 'a', text: 'Din kode er slettet permanent' },
      { id: 'b', text: 'Samme sted i filen er ændret forskelligt — du skal vælge den endelige version' },
      { id: 'c', text: 'Du har ikke adgang til repository' },
      { id: 'd', text: 'Main er korrupt og skal nulstilles' },
    ],
    correctId: 'b',
    explanation:
      'Konflikter opstår når Git ikke automatisk kan beslutte hvilken ændring der er rigtig. Du løser det manuelt og committer.',
  },
  {
    id: 'q2',
    question: 'Hvilken merge-strategi anbefales som standard til jeres PRs?',
    options: [
      { id: 'a', text: 'Squash and merge' },
      { id: 'b', text: 'Force push to main' },
      { id: 'c', text: 'Slet branchen uden merge' },
      { id: 'd', text: 'Cherry-pick hver fil manuelt' },
    ],
    correctId: 'a',
    explanation:
      'Squash and merge giver én pæn commit per feature på main — nem historik og godt til elevprojekter.',
  },
  {
    id: 'q3',
    question: 'Hvad skal du gøre EFTER du har redigeret en fil med konfliktmarkører?',
    options: [
      { id: 'a', text: 'git push med det samme uden add' },
      { id: 'b', text: 'git add filen og derefter git commit for at afslutte merge' },
      { id: 'c', text: 'Slet branchen og start forfra' },
      { id: 'd', text: 'Lade markørerne blive — Git fjerner dem automatisk' },
    ],
    correctId: 'b',
    explanation:
      'Stage de løste filer med git add, test koden, og afslut med git commit. Markører må aldrig committes.',
  },
  {
    id: 'q4',
    question: 'Hvor bør du løse merge-konflikter?',
    options: [
      { id: 'a', text: 'Direkte på main i produktion' },
      { id: 'b', text: 'På din feature branch inden PR merges' },
      { id: 'c', text: 'Kun i GitHub Issues' },
      { id: 'd', text: 'I CHANGELOG.md' },
    ],
    correctId: 'b',
    explanation:
      'Merge main ind i feature branch, løs konflikter dér, test, push — så er PR klar til Squash and merge.',
  },
  {
    id: 'q5',
    question: 'Hvad markerer linjen ======= i en konfliktfil?',
    options: [
      { id: 'a', text: 'Slut på filen' },
      { id: 'b', text: 'Skillelinje mellem din version og den anden branch\'s version' },
      { id: 'c', text: 'At koden er kompileret korrekt' },
      { id: 'd', text: 'En kommentar Git ignorerer' },
    ],
    correctId: 'b',
    explanation:
      '<<<<<<< din side, ======= skillelinje, >>>>>>> deres side. Slet alle tre markører når du har valgt den endelige kode.',
  },
];
