export interface SourceMeta {
  file?: string;      // e.g. "app/components/Hero.tsx"
  line?: number;      // e.g. 42
  component?: string; // e.g. "Hero" (derived from file path)
}

export interface Comment {
  id: string;
  pagePath: string;
  elementSelector: string;
  offsetX: number;
  offsetY: number;
  body: string;
  createdAt: string;
  resolved: boolean;
  parentId?: string;
  source?: SourceMeta; // Source code location for engineers/agents
}

export interface CommentPosition {
  x: number;
  y: number;
  selector: string;
  offsetX: number;
  offsetY: number;
  source?: SourceMeta;
}
