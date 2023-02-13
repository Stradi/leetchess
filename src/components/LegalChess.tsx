import { Chess, SQUARES } from "chess.js";

import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Chessground, { ChessgroundRef } from "./Chessground";

export interface LegalChessRef extends Chess {}
export interface LegalChessProps extends ComponentPropsWithoutRef<"div"> {
  boardRef?: React.RefObject<ChessgroundRef>;
  startingFen: string;
  onCheckmate?: (winner: "white" | "black") => void;
  onDraw?: () => void;
  onStalemate?: () => void;
  onThreefoldRepetition?: () => void;
  onInsufficientMaterial?: () => void;

  onMove?: (move: { from: string; to: string }) => void;
}

const LegalChess = forwardRef<LegalChessRef, LegalChessProps>(
  (
    {
      boardRef,
      startingFen,
      onCheckmate,
      onDraw,
      onStalemate,
      onThreefoldRepetition,
      onInsufficientMaterial,
      onMove,
      ...props
    },
    ref
  ) => {
    const [chessState] = useState<Chess>(new Chess(startingFen));
    const [fen, setFen] = useState(startingFen);

    useImperativeHandle(ref, () => {
      // We should intercept all methods that mutate the chessboard state
      // and update the fen state. If we don't do this, the fen state will
      // be out of sync with the chessboard state. Also we wouldn't be
      // able to update chess state outside of this component.
      // This is a bit of a hack, but it works.

      const methodsToIntercept = [
        "clear",
        "reset",
        "load",
        "loadPgn",
        "move",
        "put",
        "remove",
        "reset",
        "undo",
      ] as const;

      methodsToIntercept.forEach((methodName) => {
        const originalMethod = chessState[methodName] as (
          ...args: any[]
        ) => any;
        chessState[methodName] = (...args: any[]) => {
          const result = originalMethod.apply(chessState, args);
          setFen(chessState.fen());
          return result;
        };
      });

      return chessState;
    });

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
      chessState.isCheckmate() && onCheckmate?.(currentTurn.full);
      chessState.isDraw() && onDraw?.();
      chessState.isStalemate() && onStalemate?.();
      chessState.isThreefoldRepetition() && onThreefoldRepetition?.();
      chessState.isInsufficientMaterial() && onInsufficientMaterial?.();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fen]);

    function handleMove(orig: string, dest: string) {
      // TODO: We should handle promotions better. Because some tutorials
      // could need a correct promotion move to be made.
      const move = chessState.move({ from: orig, to: dest, promotion: "q" });
      if (move) {
        setFen(chessState.fen());

        // In here we are basically queueing the onMove call until the js engine
        // executes the current call stack. This is because we want to make sure
        // that the chessboard state is updated before the onMove callback is
        // called. Technically any timeout will work, but 0 is the fastest and
        // we don't want to restrict the user of this component.
        setTimeout(() => {
          onMove?.({
            from: move.from,
            to: move.to,
          });
        }, 0);
      }
    }

    return (
      <div {...props}>
        <Chessground
          ref={boardRef}
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
);

LegalChess.displayName = "LegalChess";
export default LegalChess;
