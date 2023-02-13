import { useCallback, useEffect, useRef, useState } from "react";
import { ChessgroundRef } from "./Chessground";
import LegalChess, { LegalChessRef } from "./LegalChess";

function convertShape(shape: IChessShape) {
  return {
    orig: shape.from,
    dest: shape.to,
    brush: shape.color || "green",
  };
}

export interface TutorialProps {
  data: IChessTutorial;
}

export default function Tutorial({ data }: TutorialProps) {
  const chessRef = useRef<LegalChessRef>(null);
  const boardRef = useRef<ChessgroundRef>(null);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [helpIndex, setHelpIndex] = useState(0);
  const [canMakeMove, setCanMakeMove] = useState(false);

  const safeIncrementStep = useCallback(() => {
    if (currentStepIndex < data.steps.length - 1) {
      setHelpIndex(0);
      setCurrentStepIndex(currentStepIndex + 1);
      const nextStep = data.steps[currentStepIndex + 1];

      if (nextStep.shapes) {
        boardRef.current?.setAutoShapes(nextStep.shapes.map(convertShape));
      } else {
        boardRef.current?.setAutoShapes([]);
      }

      if (nextStep.move) {
        setCanMakeMove(true);
      } else {
        setCanMakeMove(false);
      }
    }
  }, [currentStepIndex, data.steps]);

  const safeIncrementHelp = useCallback(() => {
    const helps = data.steps[currentStepIndex].helps;
    if (!helps) {
      return;
    }

    if (helpIndex <= helps.length - 1) {
      setHelpIndex(helpIndex + 1);

      boardRef.current?.setAutoShapes(
        helps.slice(0, helpIndex + 1).map(convertShape)
      );
    }
  }, [helpIndex, currentStepIndex, data.steps]);

  useEffect(() => {
    if (data.steps[currentStepIndex].autoPlay) {
      chessRef.current?.move(data.steps[currentStepIndex].move as IChessMove);
      safeIncrementStep();
    }
  }, [currentStepIndex, data.steps, safeIncrementStep]);

  function onMove(move: { from: string; to: string }) {
    if (!canMakeMove) {
      chessRef.current?.undo();
      return;
    }

    const requiredMove = data.steps[currentStepIndex].move as IChessMove;

    if (move.from === requiredMove.from && move.to === requiredMove.to) {
      safeIncrementStep();
    } else {
      chessRef.current?.undo();
    }
  }

  return (
    <div>
      <LegalChess
        boardRef={boardRef}
        ref={chessRef}
        className="w-[500px] h-[500px]"
        startingFen={data.startingFen}
        onMove={onMove}
      />
      <div>{data.steps[currentStepIndex].explanation}</div>
      <button onClick={() => !canMakeMove && safeIncrementStep()}>Next</button>
      <button onClick={() => safeIncrementHelp()}>Help!</button>
    </div>
  );
}
