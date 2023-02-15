import { cn } from "@/utils/tw";
import { RefObject, useEffect, useState } from "react";
import { LegalChessRef } from "../LegalChess";

interface ConversationVariantProps {
  defaultFen: string;
  chessRef: RefObject<LegalChessRef>;

  variant: IChessVariant;
}

export default function ConversationVariant({
  defaultFen,
  chessRef,
  variant,
}: ConversationVariantProps) {
  const [showVariantMoves, setShowVariantMoves] = useState(false);
  const [moveInterval, setMoveInterval] = useState<any>(null);

  const variantName = variant.displayName || variant.moves[0].from;

  useEffect(() => {
    // We should show all moves with a small timeout between them

    if (showVariantMoves) {
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < variant.moves.length) {
          chessRef.current?.move({
            from: variant.moves[idx].from,
            to: variant.moves[idx].to,
          });
          idx++;
        } else {
          clearInterval(interval);
        }
      }, 250);
      setMoveInterval(interval);
    } else {
      clearInterval(moveInterval);
      chessRef.current?.load(defaultFen);
    }

    return () => {
      clearInterval(moveInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showVariantMoves]);

  return (
    <span
      onMouseEnter={() => {
        setShowVariantMoves(true);
        chessRef.current?.load(variant.fen);
      }}
      onMouseLeave={() => {
        setShowVariantMoves(false);
        chessRef.current?.load(defaultFen);
      }}
      className="mx-2"
    >
      {showVariantMoves && (
        <span
          className={cn(
            "peer absolute inset-x-0 -bottom-2 z-50 shadow-lg",
            "w-full translate-y-full p-4",
            "rounded-lg bg-neutral-800"
          )}
        >
          <ul className="flex flex-wrap [&>*]:px-2">
            {variant.moves.map((move, idx) => (
              <li
                key={`${move.from}-${move.to}`}
                onMouseEnter={() => {
                  if (moveInterval) {
                    clearInterval(moveInterval);
                  }

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
                  "rounded-lg hover:text-neutral-300 hover:ring-1 hover:ring-green-900"
                )}
              >
                <code>{`${idx + 1}. ${move.from}-${move.to}`}</code>
              </li>
            ))}
          </ul>
        </span>
      )}
      <span
        className={cn(
          "relative inline rounded-lg px-4 py-1",
          "select-none font-mono text-lg font-bold",
          "transition duration-100",
          "peer-hover:bg-neutral-800 peer-hover:text-neutral-300",
          "hover:bg-neutral-800 hover:text-neutral-300",
          "peer-hover:after:absolute peer-hover:after:top-7 peer-hover:after:left-0 peer-hover:after:h-8 peer-hover:after:w-full",
          "hover:after:absolute hover:after:top-7 hover:after:left-0 hover:after:h-8 hover:after:w-full"
        )}
      >
        {variantName}
      </span>
    </span>
  );
}
