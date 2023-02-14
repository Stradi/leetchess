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

interface ITutorialStep {
  move?: IChessMove;
  autoPlay?: boolean = false;

  text?: string;
  afterMove?: string;

  hints?: IChessHint[];
  highlights?: IChessHighlight[];
}

interface IChessTutorial {
  id: number;
  name: string;
  subtitle: string;
  startingFen: string;
  steps: ITutorialStep[];
}
