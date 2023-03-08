type TChessRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TChessFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
type TChessSquare = `${TChessFile}${TChessRank}`;
type TChessHighlightColor = 'blue' | 'green' | 'red' | 'yellow';

interface IChessMove {
  from: TChessSquare;
  to: TChessSquare;
}

interface IChessHighlight {
  from: TChessSquare;
  to?: TChessSquare;

  color?: TChessHighlightColor;
}

interface IChessTutorialMeta {
  id: number;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  tags: ITag[] | string[];
}

interface ICommand {
  function: string;
  args: string[];
}

interface IStepComment {
  type: 'COMMENT';
  value: string;
}

interface TStepCommand {
  type: 'COMMAND';
  value: TCommand;
}

interface IChessTutorialCommentStep {
  type: 'COMMENT';
  value: {
    text: string;
    commands?: TCommand[];
  };
}

interface IChessTutorialMoveStep {
  type: 'MOVE';
  value: {
    autoplay: boolean;
    moveNumber: number;
    moveSan: string;
    comments: (TStepComment | TStepCommand)[];
  };
}

type TChessTutorial = IChessTutorialMeta & {
  headers: {
    key: string;
    value: string;
  }[];
  steps: (TChessTutorialMoveStep | TChessTutorialCommentStep)[];
};

interface ITag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface ILearningPath {
  id: number;
  name: string;
  slug: string;
  description: string;
  tags: ITag[] | string[];
  tutorials: IChessTutorial[] | string[];
}
