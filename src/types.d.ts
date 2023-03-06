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

type IChessTutorial = IChessTutorialMeta & {
  games: IPgn[];
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

interface IPgnCommentCommand {
  name: string;
  args: string[];
}

interface IPgnComment {
  text: string;
  commands: IPgnCommentCommand[];
}

interface IPgnMove {
  moveNumber: number;
  move: string;
  comments: IPgnComment[];
}

interface IPgn {
  intro: IPgnComment[];
  headers: {
    [key: string]: string;
  };
  comments: IPgnComment[];
  moves: IPgnMove[];
  result: string;
}
