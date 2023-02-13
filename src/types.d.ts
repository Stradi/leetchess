type TChessRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TChessFile = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type TChessSquare = `${TChessFile}${TChessRank}`;
type TChessShapeColors = "blue" | "green" | "red" | "yellow";

interface IChessMove {
  from: TChessSquare;
  to: TChessSquare;
}

interface IChessHelp {
  shape: IChessShape;
  explanation?: string;
}

interface IChessShape {
  from: TChessSquare;
  to?: TChessSquare;

  color?: TChessShapeColors = "green";
}

interface ITutorialStep {
  move?: IChessMove;
  explanation?: string;
  autoPlay?: boolean = false;

  helps?: IChessHelp[];
  shapes?: IChessShape[];
}

interface IChessTutorial {
  id: number;
  name: string;
  subtitle: string;
  startingFen: string;
  steps: ITutorialStep[];
}
