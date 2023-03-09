export interface Pgt {
  headers: Header[];
  steps: Step[];
}

export interface Header {
  key: string;
  value: string;
}

export type Type = 'COMMENT' | 'MOVE';
export interface Step {
  type: Type;
  value: StepValue;
}

export interface CommentStep {
  type: 'COMMENT';
  value: CommenStepValue;
}

export interface CommentStepValue {
  text: string;
  commands: Command[];
}

export interface MoveStep {
  type: 'MOVE';
  value: MoveStepValue;
}

export interface MoveStepValue {
  autoplay: boolean;
  moveSan: string;
  nags: string[];
  comments: Comment[];
}

export type StepValue = CommentStepValue | MoveStepValue;

export interface Command {
  name: string;
  args: string[];
}

export interface Comment {
  type: Type;
  value: CommentValue;
}

export interface CommentValue {
  text: string;
  commands: Command[];
}
