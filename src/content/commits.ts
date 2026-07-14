import type { FlowNode, GuideStep, QuizQuestion } from './releases';
import type { GitGraphStep } from './git-graph';

export interface ConventionalType {
  id: string;
  label: string;
  emoji: string;
  description: string;
  example: string;
  bump: string;
}

export const whyCommitPoints = [
  {
    title: 'Et snapshot af dit arbejde',
    text: 'En commit gemmer præcis hvordan koden så ud på et givent tidspunkt — som et foto I kan vende tilbage til.',
  },
  {
    title: 'Historie og sporbarhed',
    text: 'Med gode commit-beskeder kan I (og jeres kunde) følge hvad der er ændret, hvornår og hvorfor.',
  },
  {
    title: 'Teamarbejde',
    text: 'Commits er byggestenene i samarbejdet. Små, tydelige commits gør det nemt for holdkammerater at forstå og reviewe jeres ændringer.',
  },
  {
    title: 'Tryghed ved fejl',
    text: 'Har I lavet noget forkert? Med commits kan I rulle tilbage til en tidligere version uden panik.',
  },
];

export const teamConventions = [
  {
    title: 'Commit ofte',
    text: 'Lav små commits med én logisk ændring ad gangen — ikke én kæmpe commit fredag eftermiddag med hele sprinten.',
  },
  {
    title: 'Skriv til mennesker',
    text: 'Commit-beskeden skal forklare hvad og hvorfor — ikke bare "fix" eller "update". Forestil dig at en holdkammerat læser den om 3 måneder.',
  },
  {
    title: 'Brug conventional commits',
    text: 'Formatet type(scope): beskrivelse gør historikken læsbar og kobler direkte til semver og release-noter.',
  },
  {
    title: 'Commit aldrig direkte på main',
    text: 'Arbejd på en feature branch og merge via pull request. Main er jeres leverance-klare kode.',
    highlight: true,
  },
];

export const conventionalTypes: ConventionalType[] = [
  {
    id: 'feat',
    label: 'feat',
    emoji: '✨',
    description: 'Ny funktionalitet — noget brugeren kan se eller bruge.',
    example: 'feat(auth): tilføj login med JWT',
    bump: 'MINOR',
  },
  {
    id: 'fix',
    label: 'fix',
    emoji: '🐛',
    description: 'Fejlrettelse — noget der var i stykker virker nu.',
    example: 'fix(form): valider e-mail korrekt',
    bump: 'PATCH',
  },
  {
    id: 'chore',
    label: 'chore',
    emoji: '🔧',
    description: 'Vedligehold — opdater dependencies, config, build-setup. Ingen bruger-synlig ændring.',
    example: 'chore(deps): opdater Next.js til v15',
    bump: 'Ingen (typisk)',
  },
  {
    id: 'docs',
    label: 'docs',
    emoji: '📝',
    description: 'Kun dokumentation — README, kommentarer, guides.',
    example: 'docs(readme): tilføj opsætningsvejledning',
    bump: 'Ingen',
  },
  {
    id: 'refactor',
    label: 'refactor',
    emoji: '♻️',
    description: 'Omstrukturering uden ændring af funktionalitet — renere kode, samme adfærd.',
    example: 'refactor(api): udtræk validering til helper',
    bump: 'Ingen',
  },
  {
    id: 'test',
    label: 'test',
    emoji: '✅',
    description: 'Tilføj eller ret tests — ingen produktionskode ændret.',
    example: 'test(auth): tilføj unit tests til login',
    bump: 'Ingen',
  },
];

export const flowNodes: FlowNode[] = [
  {
    id: 'working',
    label: 'Working dir',
    title: 'Du arbejder lokalt',
    description:
      'Når du redigerer filer i dit projekt, er ændringerne først kun i din working directory. Git tracker dem, men de er endnu ikke en del af historikken.',
  },
  {
    id: 'stage',
    label: 'git add',
    title: 'Stage ændringer',
    description:
      'Staging area er en "forberedelseszone". Med git add vælger du præcis hvilke ændringer der skal med i næste commit — ikke nødvendigvis alle filer.',
    command: 'git add src/login.ts\n# eller alt:\ngit add .',
  },
  {
    id: 'commit',
    label: 'git commit',
    title: 'Gem snapshot',
    description:
      'En commit gemmer de stagede ændringer permanent i Git-historikken med en besked, forfatter og tidsstempel.',
    command: 'git commit -m "feat(auth): tilføj login-side"',
  },
  {
    id: 'push',
    label: 'git push',
    title: 'Del med teamet',
    description:
      'Push sender dine commits til GitHub, så holdkammerater kan se dem og du kan oprette en pull request.',
    command: 'git push origin feature/login',
  },
];

export const graphSteps: GitGraphStep[] = [
  {
    id: 'working',
    label: 'Working dir',
    title: 'Du redigerer filer',
    description:
      'Ændringer i din editor lander i working directory. Git kan se dem (git status), men de er endnu ikke staged eller committed.',
    graphState: 'working',
  },
  {
    id: 'stage',
    label: 'git add',
    title: 'Staging area',
    description:
      'git add flytter valgte ændringer til staging — en forberedelseszone. Du vælger præcis hvad næste commit skal indeholde.',
    command: 'git add src/login.ts',
    graphState: 'stage',
  },
  {
    id: 'commit',
    label: 'git commit',
    title: 'Snapshot gemmes',
    description:
      'Commit opretter et permanent snapshot i dit lokale repository. Det er nu en del af Git-historikken.',
    command: 'git commit -m "feat(auth): tilføj login-side"',
    graphState: 'commit',
  },
  {
    id: 'push',
    label: 'git push',
    title: 'Send til GitHub',
    description:
      'Push kopierer dine commits til remote (origin). Nu kan teamet se dem og du kan oprette en PR.',
    command: 'git push origin feature/login',
    graphState: 'push',
  },
];

export const guideSteps: GuideStep[] = [
  {
    id: 'status',
    title: 'Tjek hvad der er ændret',
    summary: 'Brug git status og git diff til at se dine ændringer før du committer.',
    details:
      'Før du committer, bør du altid vide præcis hvad du putter i historikken. git status viser ændrede, staged og untracked filer. git diff viser de konkrete linje-ændringer.',
    code: 'git status\n\n# Se ændringer i filer:\ngit diff\n\n# Se hvad der er staged:\ngit diff --staged',
    codeLabel: 'Terminal',
  },
  {
    id: 'stage',
    title: 'Stage relevante filer',
    summary: 'Vælg hvilke ændringer der hører sammen i denne commit.',
    details:
      'En god commit indeholder én logisk ændring. Stage kun de filer der hører til — undgå at blande login-feature med en unrelated README-ændring.',
    code: '# Stage specifikke filer:\ngit add src/pages/login.astro\n\n# Stage dele af en fil (interaktivt):\ngit add -p',
    codeLabel: 'Terminal',
  },
  {
    id: 'commit',
    title: 'Commit med en god besked',
    summary: 'Skriv en conventional commit-besked der forklarer hvad og hvorfor.',
    details:
      'Brug formatet type(scope): beskrivelse. Beskrivelsen i imperativ form ("tilføj" ikke "tilføjet"). Scope er valgfri men hjælper med at gruppere ændringer.',
    code: 'git commit -m "feat(auth): tilføj login-side med JWT"\n\n# Med længere body:\ngit commit -m "fix(form): valider e-mail" -m "Tomme strenge og ugyldige domæner afvises nu korrekt."',
    codeLabel: 'Terminal',
  },
  {
    id: 'verify',
    title: 'Verificer commit',
    summary: 'Tjek at committet ser rigtigt ud i historikken.',
    details:
      'Brug git log til at se din seneste commit. git show viser præcis hvad committet indeholder — filer og linje-ændringer.',
    code: 'git log --oneline -5\n\ngit show HEAD',
    codeLabel: 'Terminal',
  },
  {
    id: 'push',
    title: 'Push til GitHub',
    summary: 'Send committet til remote så teamet kan se det.',
    details:
      'Push altid til en feature branch — aldrig direkte til main. Derefter opretter du en pull request for review og merge.',
    code: 'git push origin feature/login',
    codeLabel: 'Terminal',
  },
];

export const badGoodExamples = [
  {
    bad: 'fix',
    good: 'fix(nav): luk mobilmenu ved klik udenfor',
    why: 'Forklar hvad der blev rettet og hvor.',
  },
  {
    bad: 'update og ting',
    good: 'feat(dashboard): tilføj projektoversigt',
    why: 'Brug type og scope — "update" siger intet.',
  },
  {
    bad: 'WIP',
    good: 'refactor(api): udtræk fetch-logik til service',
    why: 'WIP-commits hører ikke til i delt historik — commit når ændringen er færdig.',
  },
  {
    bad: 'fixed bug reported by teacher',
    good: 'fix(auth): redirect til login ved udløbet session',
    why: 'Beskriv problemet løst, ikke hvem der rapporterede det.',
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Hvad gør git add?',
    options: [
      { id: 'a', text: 'Opretter en commit med alle ændrede filer' },
      { id: 'b', text: 'Flytter ændringer til staging area, klar til commit' },
      { id: 'c', text: 'Pusher ændringer til GitHub' },
      { id: 'd', text: 'Sletter ændringer i working directory' },
    ],
    correctId: 'b',
    explanation:
      'git add stager ændringer — de er markeret til næste commit, men endnu ikke gemt i historikken. Først git commit gemmer dem.',
  },
  {
    id: 'q2',
    question: 'Hvilken commit-type bruger du til en ny side i appen?',
    options: [
      { id: 'a', text: 'fix' },
      { id: 'b', text: 'feat' },
      { id: 'c', text: 'chore' },
      { id: 'd', text: 'docs' },
    ],
    correctId: 'b',
    explanation:
      'feat markerer ny funktionalitet som brugeren kan se — f.eks. en ny side, knap eller feature.',
  },
  {
    id: 'q3',
    question: 'Hvad er forskellen på git commit og git push?',
    options: [
      { id: 'a', text: 'Ingen forskel — de gør det samme' },
      { id: 'b', text: 'commit gemmer lokalt; push sender commits til remote (GitHub)' },
      { id: 'c', text: 'push gemmer lokalt; commit sender til GitHub' },
      { id: 'd', text: 'commit kræver internet; push virker offline' },
    ],
    correctId: 'b',
    explanation:
      'commit opretter et snapshot i dit lokale repository. push uploader dine lokale commits til GitHub, så teamet kan se dem.',
  },
  {
    id: 'q4',
    question: 'Hvilken semver-bump hører typisk til en fix-commit?',
    options: [
      { id: 'a', text: 'MAJOR' },
      { id: 'b', text: 'MINOR' },
      { id: 'c', text: 'PATCH' },
      { id: 'd', text: 'Ingen bump nødvendig' },
    ],
    correctId: 'c',
    explanation:
      'fix er fejlrettelser uden ny funktionalitet — det svarer til PATCH i semantisk versionering (v0.2.0 → v0.2.1).',
  },
  {
    id: 'q5',
    question: 'Hvorfor bør du undgå at committe direkte på main?',
    options: [
      { id: 'a', text: 'Git tillader det teknisk set ikke' },
      { id: 'b', text: 'Main er leverance-klar kode — ændringer skal gå via branch og PR med review' },
      { id: 'c', text: 'Commits på main slettes automatisk efter 24 timer' },
      { id: 'd', text: 'Main kan kun indeholde releases, ikke commits' },
    ],
    correctId: 'b',
    explanation:
      'Main er det kunden ser. Arbejd på feature branches, commit der, og merge via pull request — så I holder main stabil og leverance-klar.',
  },
];
