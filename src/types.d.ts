import { PGT } from './utils/pgt/pgt.types';

type TChessRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type TChessFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
type TChessSquare = `${TChessFile}${TChessRank}`;
type TChessHighlightColor = 'blue' | 'green' | 'red' | 'yellow';

interface ITag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface ITutorial {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  tags: ITag[] | string[];
  pgt: PGT;
}
