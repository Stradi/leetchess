import LegalChess, { LegalChessRef } from '@/components/LegalChess';
import { useState, useRef, useEffect } from 'react';

export default function AutoPlayingChess() {
  const chessRef = useRef<LegalChessRef>(null);
  const [_, forceRender] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (chessRef.current?.isGameOver()) {
        clearInterval(interval);
        chessRef.current?.reset();
        forceRender(_ + 1);
      } else {
        chessRef.current?.move(chessRef.current.moves()[Math.floor(Math.random() * chessRef.current.moves().length)]);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [_]);

  return (
    <LegalChess
      className="h-full w-full"
      ref={chessRef}
      onMove={() => {}}
      startingFen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    />
  );
}
