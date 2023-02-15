type TChessRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TChessFile = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type TChessSquare = `${TChessFile}${TChessRank}`;
type TChessHighlightColors = "blue" | "green" | "red" | "yellow";

interface IChessMove {
  from: TChessSquare;
  to: TChessSquare;
}

interface IChessHighlight {
  from: TChessSquare;
  to?: TChessSquare;

  color?: TChessHighlightColors;
}

interface IChessHint {
  highlight: IChessHighlight;
  text?: string;
}

interface IChessVariant {
  displayName?: string;
  fen: string;
  moves: IChessMove[];
}

type IStepComment =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "variant";
      value: IChessVariant;
    };

interface ITutorialStep {
  fen: string;

  move?: IChessMove;
  autoPlay?: boolean = false;

  comment?: IStepComment[];
  afterMove?: IStepComment[];

  hints?: IChessHint[];
  highlights?: IChessHighlight[];
}

interface IChessTutorial {
  id: number;
  name: string;
  subtitle: string;
  steps: ITutorialStep[];
}
