export interface GitGraphStep {
  id: string;
  label: string;
  title: string;
  description: string;
  command?: string;
  graphState: string;
}

export interface GitGraphLegendItem {
  dotClass: string;
  label: string;
}
