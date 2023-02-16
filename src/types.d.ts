type TChessRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TChessFile = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type TChessSquare = `${TChessFile}${TChessRank}`;
type TChessHighlightColor = "blue" | "green" | "red" | "yellow";

interface IChessMove {
  from: TChessSquare;
  to: TChessSquare;
}

interface IChessHighlight {
  from: TChessSquare;
  to?: TChessSquare;

  color?: TChessHighlightColor;
}

interface IChessHint {
  highlight: IChessHighlight;
}

interface IChessVariant {
  displayName?: string;
  fen: string;
  moves: IChessMove[];
}

type IChessTutorialComment =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "variant";
      value: IChessVariant;
    };

interface IChessTutorialStep {
  fen: string;

  move?: IChessMove;
  autoPlay?: boolean = false;

  comment?: IChessTutorialComment[];
  afterMove?: IChessTutorialComment[];

  hints?: IChessHint[];
  highlights?: IChessHighlight[];
}

interface IChessTutorialMeta {
  id: number;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  categories: string[];
  tags: string[];
}

interface IChessTutorialIndex {
  steps: IChessTutorialStep[];
}

type IChessTutorial = IChessTutorialMeta & IChessTutorialIndex;
