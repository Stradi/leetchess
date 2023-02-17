import { cn } from "@/utils/tw";
import * as HoverCard from "@radix-ui/react-hover-card";

import { RefObject, useEffect, useState } from "react";
import { LegalChessRef } from "../LegalChess";
import { ChevronDownIcon } from "../ui/Icons";

interface VariantProps {
  defaultFen: string;
  chessRef: RefObject<LegalChessRef>;
  variant: IChessVariant;
}

export default function Variant({
  defaultFen,
  chessRef,
  variant,
}: VariantProps) {
  const [moveIndex, setMoveIndex] = useState(0);
  const [moveInterval, setMoveInterval] = useState<NodeJS.Timer | null>(null);

  const variantName = variant.displayName || variant.moves[0].from;

  useEffect(() => {
    return () => {
      deleteInterval();
    };
  }, []);

  function deleteInterval() {
    moveInterval && clearInterval(moveInterval);
    setMoveInterval(null);
  }

  useEffect(() => {
    if (moveIndex === variant.moves.length) {
      deleteInterval();
    }
  }, [moveIndex]);

  function onOpenChange(open: boolean) {
    if (open) {
      chessRef.current?.load(variant.fen);

      let idx = 0;
      const interval = setInterval(() => {
        if (idx < variant.moves.length) {
          chessRef.current?.move({
            from: variant.moves[idx].from,
            to: variant.moves[idx].to,
          });
          idx++;
          setMoveIndex(idx);
        }
      }, 500);

      setMoveInterval(interval);
    } else {
      setMoveIndex(0);
      deleteInterval();
      chessRef.current?.load(defaultFen);
    }
  }

  return (
    <HoverCard.Root openDelay={200} closeDelay={50} onOpenChange={onOpenChange}>
      <HoverCard.Trigger
        className={cn(
          "px-2 py-1 select-none rounded-2xl space-x-1 group inline-block",
          "text-sm font-mono font-medium tracking-tight text-neutral-400",
          "hover:bg-neutral-800 data-[state='open']:bg-neutral-800",
          "hover:text-neutral-50 data-[state='open']:text-neutral-50",
          "transition duration-100"
        )}
      >
        <span>{variantName}</span>
        <ChevronDownIcon
          svgClassName="inline-block transition-transform duration-100 group-data-[state='open']:rotate-180 mb-1"
          size="xs"
          stroke="thicker"
        />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className={cn(
            "z-10 p-2 rounded-xl",
            "bg-neutral-800 text-sm shadow-md",
            "",
            "data-[state='open']:animate-scaleIn data-[state='closed']:animate-scaleOut"
          )}
        >
          <ul className="[&>*]:px-2 grid grid-cols-4">
            {variant.moves.map((move, idx) => (
              <li
                key={`${move.from}-${move.to}`}
                onMouseEnter={() => {
                  moveInterval && deleteInterval();
                  chessRef.current?.load(variant.fen);

                  for (const move of variant.moves.slice(0, idx + 1)) {
                    chessRef.current?.move({
                      from: move.from,
                      to: move.to,
                    });
                  }
                }}
                onMouseLeave={() => {
                  chessRef.current?.load(variant.fen);
                }}
                className={cn(
                  "cursor-pointer font-bold text-neutral-400",
                  "rounded-lg hover:text-neutral-300 hover:ring-1 hover:ring-green-900",
                  idx === moveIndex - 1 &&
                    moveInterval !== null &&
                    "ring-green-900 text-neutral-300 ring-1"
                )}
              >
                <code>{`${idx + 1}. ${move.from}-${move.to}`}</code>
              </li>
            ))}
          </ul>
          <HoverCard.Arrow className="fill-neutral-800" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
