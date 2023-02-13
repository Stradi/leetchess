import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "./Button";
import Card from "./Card";
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
  const latestExplanationRef = useRef<HTMLParagraphElement>(null);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [helpIndex, setHelpIndex] = useState(0);
  const [canMakeMove, setCanMakeMove] = useState(false);

  const isHelpAvailable = useMemo(() => {
    const helps = data.steps[currentStepIndex].helps;
    return helps && helpIndex < helps.length;
  }, [currentStepIndex, data.steps, helpIndex]);

  const availableHelpCount = useMemo(() => {
    const helps = data.steps[currentStepIndex].helps;
    return helps ? helps.length - helpIndex : 0;
  }, [currentStepIndex, data.steps, helpIndex]);

  const isCompleted = useMemo(() => {
    return currentStepIndex === data.steps.length - 1;
  }, [currentStepIndex, data.steps]);

  const getExplanationText = useCallback(() => {
    const refCondition = (idx: number) =>
      idx === allExplanations.length + openedHelps.length - 1;

    const allExplanations = data.steps
      .filter((step) => step.explanation)
      .slice(0, currentStepIndex + 1)
      .map((step) => step.explanation);

    const allHelps = data.steps[currentStepIndex].helps || [];
    const openedHelps = allHelps
      .slice(0, helpIndex)
      .filter((help) => help.explanation)
      .map((help) => help.explanation);

    return [...allExplanations, ...openedHelps].map((text, idx) => (
      <p ref={refCondition(idx) ? latestExplanationRef : undefined} key={idx}>
        {text}
      </p>
    ));
  }, [currentStepIndex, data.steps, helpIndex]);

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
        helps.slice(0, helpIndex + 1).map((help) => convertShape(help.shape))
      );
    }
  }, [helpIndex, currentStepIndex, data.steps]);

  useEffect(() => {
    if (data.steps[currentStepIndex].autoPlay) {
      chessRef.current?.move(data.steps[currentStepIndex].move as IChessMove);
      safeIncrementStep();
    }
  }, [currentStepIndex, data.steps, safeIncrementStep]);

  useEffect(() => {
    latestExplanationRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStepIndex, helpIndex]);

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
    <div className="flex gap-4">
      <LegalChess
        boardRef={boardRef}
        ref={chessRef}
        className="flex-grow-0 flex-shrink-0 aspect-square w-3/5"
        startingFen={data.startingFen}
        onMove={onMove}
      />
      <Card className="flex flex-col w-2/5">
        <div>
          <h1 className="text-2xl font-medium text-neutral-700">{data.name}</h1>
          <h2 className="text-sm font-medium text-neutral-500">
            {data.subtitle}
          </h2>
        </div>
        <div className="space-y-4 grow h-0 overflow-y-scroll">
          {getExplanationText()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            disabled={!isHelpAvailable}
            onClick={() => safeIncrementHelp()}
          >
            Hint
          </Button>
          <Button
            disabled={canMakeMove && !isCompleted}
            onClick={() => !canMakeMove && safeIncrementStep()}
          >
            {isCompleted ? "Next Lesson" : "Next Step"}
          </Button>
        </div>
        <p className="text-sm font-medium text-neutral-500 select-none">
          <span className="flex justify-between">
            {!isCompleted ? (
              <span>
                Step {currentStepIndex + 1} of {data.steps.length}
              </span>
            ) : (
              <span>Completed</span>
            )}
            <span>
              {isHelpAvailable
                ? `${availableHelpCount} hints available`
                : "No hints available."}
            </span>
          </span>
        </p>
      </Card>
    </div>
  );
}
