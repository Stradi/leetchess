import { transformComment } from "@/utils/comment";
import { cn } from "@/utils/tw";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import Card from "../Card";
import { ChessgroundRef } from "../Chessground";
import LegalChess, { LegalChessRef } from "../LegalChess";
import ConversationVariant from "./ConversationVariant";

function convertHighlight(highlight: IChessHighlight) {
  return {
    orig: highlight.from,
    dest: highlight.to,
    brush: highlight.color || "green",
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
  const [hintIndex, setHintIndex] = useState(0);

  const isCompleted = currentStepIndex === data.steps.length - 1;
  const currentStep = data.steps[currentStepIndex];

  function isHintAvailable() {
    const hints = data.steps[currentStepIndex].hints;
    return hints && hintIndex < hints.length;
  }

  function availableHintCount() {
    const hints = data.steps[currentStepIndex].hints;
    return hints ? hints.length - hintIndex : 0;
  }

  function safeIncrementStep() {
    if (currentStepIndex < data.steps.length - 1) {
      setHintIndex(0);
      setCurrentStepIndex(currentStepIndex + 1);

      const nextStep = data.steps[currentStepIndex + 1];

      if (nextStep.highlights) {
        boardRef.current?.setAutoShapes(
          nextStep.highlights.map(convertHighlight)
        );
      } else {
        boardRef.current?.setAutoShapes([]);
      }
    }
  }

  function safeIncrementHint() {
    const hints = data.steps[currentStepIndex].hints;
    if (!hints) {
      return;
    }

    if (hintIndex <= hints.length - 1) {
      setHintIndex(hintIndex + 1);

      boardRef.current?.setAutoShapes(
        hints
          .slice(0, hintIndex + 1)
          .map((hint) => convertHighlight(hint.highlight))
      );
    }
  }

  function textConverter(value: string) {
    return <span>{value}</span>;
  }

  const variantConverter = useCallback(
    (value: IChessVariant) => {
      return (
        <ConversationVariant
          defaultFen={currentStep.fen}
          chessRef={chessRef}
          variant={value}
        />
      );
    },
    [currentStep]
  );

  const getConversationHistory = useCallback(() => {
    const history = data.steps
      .slice(0, currentStepIndex + 1)
      .map((step, idx) => {
        if (step.comment) {
          const node = transformComment(step.comment, {
            text: textConverter,
            variant: variantConverter,
          });

          return (
            <div
              key={idx}
              ref={idx === currentStepIndex ? latestExplanationRef : null}
              className={cn(
                "font-medium text-neutral-500",
                idx === currentStepIndex && "text-neutral-900"
              )}
            >
              <div className="relative">{node}</div>
            </div>
          );
        }
      })
      .filter((x) => x);

    return <div className="space-y-4">{history}</div>;
  }, [data.steps, currentStepIndex, variantConverter]);

  useEffect(() => {
    chessRef.current?.load(currentStep.fen);

    if (currentStep.move && currentStep.autoPlay) {
      chessRef.current?.move({
        from: currentStep.move.from,
        to: currentStep.move.to,
      });

      safeIncrementStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex]);

  useEffect(() => {
    latestExplanationRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStepIndex, hintIndex]);

  function onMove(move: { from: string; to: string }) {
    if (!currentStep.move) {
      chessRef.current?.load(currentStep.fen);
      return;
    }

    const requiredMove = data.steps[currentStepIndex].move as IChessMove;
    if (move.from === requiredMove.from && move.to === requiredMove.to) {
      safeIncrementStep();
    } else {
      chessRef.current?.load(currentStep.fen);
    }
  }

  return (
    <div className="md:flex md:gap-4 space-y-4 md:space-y-0">
      <LegalChess
        boardRef={boardRef}
        ref={chessRef}
        className="flex-grow-0 flex-shrink-0 aspect-square md:w-3/5"
        startingFen={currentStep.fen}
        onMove={onMove}
      />
      <Card className="flex flex-col md:w-2/5">
        <div>
          <h1 className="text-2xl font-medium text-neutral-700">{data.name}</h1>
          <h2 className="text-sm font-medium text-neutral-500">
            {data.subtitle}
          </h2>
        </div>
        <div className="grow md:h-0 h-36 overflow-y-scroll">
          {getConversationHistory()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            disabled={!isHintAvailable()}
            onClick={() => safeIncrementHint()}
          >
            Hint
          </Button>
          <Button
            disabled={currentStep.move && !isCompleted}
            onClick={() => !currentStep.move && safeIncrementStep()}
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
              {isHintAvailable()
                ? `${availableHintCount()} hints available`
                : "No hints available."}
            </span>
          </span>
        </p>
      </Card>
    </div>
  );
}