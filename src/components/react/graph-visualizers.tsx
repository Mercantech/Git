import GitWorkflowGraph from './GitWorkflowGraph';
import {
  BranchGraphSvg,
  CommitZonesGraph,
  ReleaseGraphSvg,
  PullRequestGraphSvg,
  MergeGraphSvg,
  IssueGraphSvg,
} from './git-graphs';
import type { GitGraphStep } from '../../content/git-graph';
import './git-graph.css';

interface Props {
  steps: GitGraphStep[];
}

export function CommitGraphVisualizer({ steps }: Props) {
  return (
    <GitWorkflowGraph
      steps={steps}
      hint="Klik på trinene og se hvordan ændringer bevæger sig gennem Git's zoner"
      ariaLabel="Commit workflow"
      legend={[
        { dotClass: 'git-graph__legend-dot--working', label: 'working dir' },
        { dotClass: 'git-graph__legend-dot--staging', label: 'staging' },
        { dotClass: 'git-graph__legend-dot--commit', label: 'repository' },
        { dotClass: 'git-graph__legend-dot--remote', label: 'GitHub' },
      ]}
      renderGraph={(state) => <CommitZonesGraph state={state} />}
    />
  );
}

export function ReleaseGraphVisualizer({ steps }: Props) {
  return (
    <GitWorkflowGraph
      steps={steps}
      hint="Klik på trinene og se hvordan tag, release og Actions hænger sammen"
      ariaLabel="Release workflow"
      legend={[
        { dotClass: 'git-graph__legend-dot--commit', label: 'commit' },
        { dotClass: 'git-graph__legend-dot--tag', label: 'tag' },
        { dotClass: 'git-graph__legend-dot--remote', label: 'remote' },
        { dotClass: 'git-graph__legend-dot--actions', label: 'Actions' },
      ]}
      renderGraph={(state) => <ReleaseGraphSvg state={state} />}
    />
  );
}

export function PullRequestGraphVisualizer({ steps }: Props) {
  return (
    <GitWorkflowGraph
      steps={steps}
      hint="Klik på trinene og se PR'en fra push til merge på main"
      ariaLabel="Pull request workflow"
      legend={[
        { dotClass: 'git-graph__legend-dot--main', label: 'main' },
        { dotClass: 'git-graph__legend-dot--feature', label: 'feature branch' },
        { dotClass: 'git-graph__legend-dot--merge', label: 'merge' },
      ]}
      renderGraph={(state) => <PullRequestGraphSvg state={state} />}
    />
  );
}

export function MergeGraphVisualizer({ steps }: Props) {
  return (
    <GitWorkflowGraph
      steps={steps}
      hint="Klik på trinene og se merge — med og uden konflikt"
      ariaLabel="Merge workflow"
      legend={[
        { dotClass: 'git-graph__legend-dot--main', label: 'main' },
        { dotClass: 'git-graph__legend-dot--feature', label: 'feature branch' },
        { dotClass: 'git-graph__legend-dot--conflict', label: 'konflikt' },
        { dotClass: 'git-graph__legend-dot--merge', label: 'merge' },
      ]}
      renderGraph={(state) => <MergeGraphSvg state={state} />}
    />
  );
}

export function IssueGraphVisualizer({ steps }: Props) {
  return (
    <GitWorkflowGraph
      steps={steps}
      hint="Klik på trinene og se issue #42 koblet til branch, PR og main"
      ariaLabel="Issue workflow"
      legend={[
        { dotClass: 'git-graph__legend-dot--issue', label: 'issue' },
        { dotClass: 'git-graph__legend-dot--feature', label: 'branch' },
        { dotClass: 'git-graph__legend-dot--merge', label: 'lukket' },
      ]}
      renderGraph={(state) => <IssueGraphSvg state={state} />}
    />
  );
}

export { BranchGraphSvg };
