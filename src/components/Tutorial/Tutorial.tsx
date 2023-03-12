import { ITutorial } from '@/types';
import {
  DEFAULT_FEN,
  getChoiceCommandFromStep,
  getCommentsFromStep,
  getFenCommandFromStep,
  getShapesFromStep,
} from './utils';
import { cn } from '@/utils/tw';
import { Move } from 'chess.js';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { ChessgroundRef } from '../Chessground';
import LegalChess, { LegalChessRef } from '../LegalChess';
import ChoiceButtons from './ChoiceButtons';

export interface TutorialProps {
  data: ITutorial;
}

export default function Tutorial({ data }: TutorialProps) {
  const stepNumberPadding = data.pgt.steps.length.toString().length;

  const chessRef = useRef<LegalChessRef>(null);
  const boardRef = useRef<ChessgroundRef>(null);

  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const currentStep = data.pgt.steps[currentStepIdx];

  const [commentHistory, setCommentHistory] = useState<string[]>([data.description]);
  const latestCommentRef = useRef<HTMLDivElement>(null);
  const isLastStep = currentStepIdx === data.pgt.steps.length - 1;
  const isUserTurn = currentStep ? currentStep.type === 'MOVE' && !currentStep.value.autoplay : false;
  const hasStarted = currentStepIdx !== -1;

  const choiceStep = getChoiceCommandFromStep(currentStep);

  useEffect(() => {
    if (!choiceStep) {
      setCommentHistory([...commentHistory, ...getCommentsFromStep(currentStep)]);
    }

    const fen = getFenCommandFromStep(currentStep);
    if (fen) {
      chessRef.current?.load(fen);
    }

    const shapes = getShapesFromStep(currentStep);
    if (shapes) {
      boardRef.current?.setAutoShapes(shapes);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIdx, currentStep]);

  useEffect(() => {
    latestCommentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commentHistory]);

  function nextStep() {
    if (isLastStep) return;

    setCurrentStepIdx(currentStepIdx + 1);
  }

  function onMove(move: Move) {
    if (isLastStep || !isUserTurn || !currentStep) {
      chessRef.current?.undo();
      return;
    }

    if (currentStep.type === 'MOVE' && currentStep.value.moveSan === move.san) {
      nextStep();
    } else {
      chessRef.current?.undo();
    }
  }

  return (
    <div className="relative mx-auto flex h-screen max-h-screen w-full flex-col items-stretch gap-4 rounded-2xl bg-neutral-800 p-2 sm:p-2 md:h-full md:flex-row md:p-6">
      <LegalChess
        boardRef={boardRef}
        ref={chessRef}
        className="mx-auto aspect-square h-auto w-full shrink-0 grow-0 sm:w-2/3 md:w-3/5"
        startingFen={DEFAULT_FEN}
        onMove={onMove}
      />
      <div className="relative mx-auto flex max-h-[calc(97.5vh-100vw)] w-full grow flex-col gap-1 rounded-xl bg-neutral-900 p-2 sm:w-2/3 md:max-h-[unset] md:w-2/5 md:gap-4 md:p-4">
        <div className="text-center">
          <h1 className="text-lg font-bold text-neutral-50 md:text-2xl">{data.name}</h1>
          <h2 className="text-sm font-medium text-neutral-500">{data.subtitle}</h2>
        </div>
        <hr className="border-neutral-800" />
        <div className="overflow-y-scroll md:h-0 md:grow" id="conversation">
          {commentHistory.map((comment, idx) => (
            <div
              key={idx}
              ref={idx === commentHistory.length - 1 ? latestCommentRef : null}
              className={cn(
                'flex gap-1 font-medium text-neutral-600',
                'transition duration-100',
                idx === commentHistory.length - 1 && 'text-neutral-400'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 select-none whitespace-pre font-mono text-xs md:text-sm',
                  idx === commentHistory.length - 1 && 'font-bold text-green-700'
                )}
              >{`${(idx + 1).toString().padStart(stepNumberPadding)}.`}</span>
              <span className="text-sm md:text-base">{comment}</span>
            </div>
          ))}
          {choiceStep && (
            <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-center gap-2 rounded-lg bg-neutral-900 px-2 md:gap-4 md:bg-neutral-900/75 md:px-4">
              <h1 className="text-center text-lg font-bold md:text-xl">Pop Quiz</h1>
              <p className="text-center text-sm md:text-base">{choiceStep.question}</p>
              <ChoiceButtons
                choices={choiceStep.choices}
                onCorrectButtonClicked={(data) => {
                  setCommentHistory([...commentHistory, data.text]);
                  nextStep();
                }}
              />
            </div>
          )}
          {isUserTurn && (
            <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-center gap-2 rounded-lg bg-neutral-900 px-2 md:gap-4 md:bg-neutral-900/75 md:px-4">
              <h1 className="text-center text-lg font-bold md:text-xl">Your Turn!</h1>
              <p className="text-center text-sm md:text-base">{getCommentsFromStep(currentStep)}</p>
            </div>
          )}
        </div>
        <hr className="border-neutral-800" />
        <div className="flex gap-2">
          <Button
            disabled={isUserTurn || choiceStep !== null}
            className="w-full"
            asLink={isLastStep}
            href={data.next ? `/learn/${data.next}` : '/learn'}
            onClick={(e) => {
              if (isUserTurn || choiceStep !== null || isLastStep) return;
              nextStep();
            }}
          >
            {!hasStarted ? 'Start' : isLastStep ? (data.next ? 'Next Lesson' : 'Go to All Lessons') : 'Next'}
          </Button>
        </div>
        <hr className="border-neutral-800" />

        <p className="select-none text-sm font-medium text-neutral-500">
          <span className="flex justify-between">
            <span>
              {!hasStarted
                ? 'Not started'
                : isLastStep
                ? `Finished`
                : `Step ${currentStepIdx + 1}/${data.pgt.steps.length}`}
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
