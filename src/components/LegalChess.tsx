import { Chess, SQUARES } from "chess.js";

import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Chessground from "./Chessground";

export interface LegalChessProps extends ComponentPropsWithoutRef<"div"> {
  startingFen: string;
  onCheckmate?: (winner: "white" | "black") => void;
  onDraw?: () => void;
  onStalemate?: () => void;
  onThreefoldRepetition?: () => void;
  onInsufficientMaterial?: () => void;
}

export default function LegalChess({ startingFen, ...props }: LegalChessProps) {
  const [chessState] = useState<Chess>(new Chess(startingFen));
  const [fen, setFen] = useState(startingFen);

  // Doing this calculation in a callback allows us to memoize the
  // function and only recompute the destinations when the fen changes.
  const generateDestinations = useCallback(() => {
    const destinations = new Map();
    SQUARES.forEach((square) => {
      const moves = chessState.moves({ square, verbose: true });
      if (moves.length) {
        destinations.set(
          square,
          moves.map((move) => move.to)
        );
      }
    });

    return destinations;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);

  const currentTurn = useMemo(
    () => {
      const abbr = chessState.turn();
      const full = abbr === "w" ? "white" : "black";
      return {
        abbr,
        full,
      } as const;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fen]
  );

  useEffect(() => {
    chessState.isCheckmate() && props.onCheckmate?.(currentTurn.full);
    chessState.isDraw() && props.onDraw?.();
    chessState.isStalemate() && props.onStalemate?.();
    chessState.isThreefoldRepetition() && props.onThreefoldRepetition?.();
    chessState.isInsufficientMaterial() && props.onInsufficientMaterial?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);

  function handleMove(orig: string, dest: string) {
    // TODO: We should handle promotions better. Because some tutorials
    // could need a correct promotion move to be made.
    const move = chessState.move({ from: orig, to: dest, promotion: "q" });
    if (move) {
      setFen(chessState.fen());
    }
  }

  return (
    <div {...props}>
      <Chessground
        fen={fen}
        turnColor={currentTurn.full}
        check={chessState.inCheck()}
        movable={{
          free: false,
          showDests: true,
          dests: generateDestinations(),
          color: currentTurn.full,
        }}
        events={{
          move: handleMove,
        }}
      />
    </div>
  );
}
