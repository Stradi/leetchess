import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { ChessgroundRef } from '../Chessground';
import LegalChess, { LegalChessRef } from '../LegalChess';

export interface TutorialProps {
  data: IChessTutorial;
}

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export default function Tutorial({ data }: TutorialProps) {
  const chessRef = useRef<LegalChessRef>(null);
  const boardRef = useRef<ChessgroundRef>(null);

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const currentGame = data.games[currentGameIndex];
  const currentMove = currentGame.moves[currentMoveIndex];

  return (
    <div className="flex gap-4 rounded-3xl bg-neutral-800 p-6">
      <LegalChess boardRef={boardRef} ref={chessRef} className="aspect-square w-3/5 shrink-0 grow-0" startingFen={currentGame.headers['FEN'] ?? DEFAULT_FEN} />
      <div className="flex w-2/5 flex-col gap-4 rounded-2xl bg-neutral-900 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-50">{data.name}</h1>
          <h2 className="text-sm font-medium text-neutral-500">{data.subtitle}</h2>
        </div>
        <hr className="border-neutral-800" />
        <div className="h-0 grow overflow-y-scroll" id="conversation">
          ABC
        </div>
        <hr className="border-neutral-800" />
        <div className="flex gap-2">
          <Button variant="secondary">Hint</Button>
          <Button className="w-full">Next Step</Button>
        </div>
        <hr className="border-neutral-800" />

        <p className="select-none text-sm font-medium text-neutral-500">
          <span className="flex justify-between">
            Step 0<span>No hints available</span>
          </span>
        </p>
      </div>
    </div>
  );
}
