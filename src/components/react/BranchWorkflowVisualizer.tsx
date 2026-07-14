import GitWorkflowGraph from './GitWorkflowGraph';
import { BranchGraphSvg } from './git-graphs';
import type { BranchWorkflowStep } from '../../content/branches';
import './git-graph.css';

const LEGEND = [
  { dotClass: 'git-graph__legend-dot--main', label: 'main' },
  { dotClass: 'git-graph__legend-dot--feature', label: 'feature branch' },
  { dotClass: 'git-graph__legend-dot--merge', label: 'merge' },
];

interface Props {
  steps: BranchWorkflowStep[];
}

export default function BranchWorkflowVisualizer({ steps }: Props) {
  return (
    <GitWorkflowGraph
      steps={steps}
      hint="Klik på trinene og se hvordan feature branch og main hænger sammen"
      ariaLabel="Branch workflow"
      legend={LEGEND}
      renderGraph={(state) => <BranchGraphSvg state={state} />}
    />
  );
}
