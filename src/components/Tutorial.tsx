import { ITutorial } from '@/types';
import { PGTCommand } from '@/utils/pgt/pgt.types';
import { cn } from '@/utils/tw';
import { Move } from 'chess.js';
import { DrawShape } from 'chessground/draw';
import { useEffect, useMemo, useRef, useState } from 'react';
import Button from './Button';
import { ChessgroundRef } from './Chessground';
import LegalChess, { LegalChessRef } from './LegalChess';

export interface TutorialProps {
  data: ITutorial;
}

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function commandsToShapes(commands: PGTCommand[]) {
  return commands.map((command) => {
    const { name: fn, args } = command;
    if (fn === 'highlight') {
      return {
        brush: 'green',
        orig: args[0],
      } as DrawShape;
    } else if (fn === 'arrow') {
      return {
        brush: 'green',
        orig: args[0],
        dest: args[1],
      } as DrawShape;
    }

    return {} as DrawShape;
  });
}

// TODO: Please find a way to refactor this TRASH!!
export default function Tutorial({ data }: TutorialProps) {
  const chessRef = useRef<LegalChessRef>(null);
  const boardRef = useRef<ChessgroundRef>(null);

  const stepNumberPadding = data.pgt.steps.length.toString().length;

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const currentStep = data.pgt.steps[currentStepIdx];

  const [commentHistory, setCommentHistory] = useState<string[]>([data.description]);
  const latestCommentRef = useRef<HTMLDivElement>(null);

  const currentMoveComments = useMemo(() => {
    if (!currentStep) return [];
    if (currentStep.type === 'MOVE') {
      const allComments = currentStep.value.comments;
      return allComments.filter((comment) => comment.type === 'COMMENT').map((comment: any) => comment.value.text);
    }
    return [];
  }, [currentStep]);

  const currentMoveHighlights = useMemo(() => {
    if (!currentStep) return [];
    if (currentStep.type === 'MOVE') {
      const allComments = currentStep.value.comments;
      return (
        allComments.filter((comment) => comment.type === 'COMMAND').map((command) => command.value as PGTCommand) ?? []
      );
    } else if (currentStep.type === 'COMMENT') {
      const commands = currentStep.value.commands;
      return commands ?? [];
    }

    return [];
  }, [currentStep]);

  useEffect(() => {
    console.log(currentStepIdx, currentStep);
    if (!currentStep) return;

    if (currentStep.type === 'COMMAND') {
      const { name: fn, args } = currentStep.value;
      if (fn === 'fen') {
        chessRef.current?.load(args[0]);
        nextStep();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  useEffect(() => {
    latestCommentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commentHistory]);

  const userHasToPlay = currentStep ? currentStep.type === 'MOVE' && !currentStep.value.autoplay : false;
  const isLastStep = currentStepIdx === data.pgt.steps.length;
  const isStart = currentStepIdx === 0;

  function nextStep(playMove = true) {
    if (isLastStep) return;

    boardRef.current?.setAutoShapes(commandsToShapes(currentMoveHighlights));
    if (currentStep.type === 'COMMENT') {
      setCommentHistory([...commentHistory, currentStep.value.text]);
    } else if (currentStep.type === 'MOVE') {
      playMove && chessRef.current?.move(currentStep.value.moveSan);
      setCommentHistory([...commentHistory, ...currentMoveComments]);
    }

    setCurrentStepIdx(currentStepIdx + 1);
  }

  function onMove(move: Move) {
    if (isLastStep) {
      chessRef.current?.undo();
      return;
    }

    if (!userHasToPlay || currentStep.type !== 'MOVE' || move.san !== currentStep.value.moveSan) {
      chessRef.current?.undo();
    }

    if (currentStep.type === 'MOVE' && userHasToPlay) {
      move.san === currentStep.value.moveSan && nextStep(false);
    }
  }

  return (
    <div className="mx-auto flex h-screen max-h-screen w-full flex-col items-stretch gap-4 rounded-3xl bg-neutral-800 p-2 sm:p-2 md:h-full md:flex-row md:p-6">
      <LegalChess
        boardRef={boardRef}
        ref={chessRef}
        className="mx-auto aspect-square h-auto w-full shrink-0 grow-0 sm:w-2/3 md:w-3/5"
        startingFen={DEFAULT_FEN}
        onMove={onMove}
      />
      <div className="mx-auto flex max-h-[calc(97.5vh-100vw)] w-full grow flex-col gap-1 rounded-2xl bg-neutral-900 p-2 sm:w-2/3 md:max-h-[unset] md:w-2/5 md:gap-4 md:p-4">
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
        </div>
        <hr className="border-neutral-800" />
        <div className="flex gap-2">
          <Button
            disabled={userHasToPlay}
            className="w-full"
            onClick={() => {
              if (userHasToPlay || isLastStep) return;
              nextStep();
            }}
          >
            {isStart ? 'Start' : isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
        <hr className="border-neutral-800" />

        <p className="select-none text-sm font-medium text-neutral-500">
          <span className="flex justify-between">
            <span>
              {isStart ? `Not Started` : isLastStep ? `Finished` : `Step ${currentStepIdx}/${data.pgt.steps.length}`}
            </span>
            <span>No hints available</span>
          </span>
        </p>
      </div>
    </div>
  );
}
