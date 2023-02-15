import { cn } from "@/utils/tw";
import { RefObject, useState } from "react";
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

  const variantName = variant.displayName || variant.moves[0].from;

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
            "peer absolute inset-x-0 bottom-0 z-50",
            "w-full translate-y-full p-4",
            "rounded-lg bg-blue-50 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500"
          )}
        >
          <ul className="flex flex-wrap [&>*]:px-2">
            {variant.moves.map((move, idx) => (
              <li
                key={`${move.from}-${move.to}`}
                onMouseEnter={() => {
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
                  "cursor-pointer font-bold text-black",
                  "rounded-lg hover:ring-1 hover:ring-blue-500"
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
          "inline-block rounded-lg px-4",
          "select-none font-mono text-lg font-bold",
          "transition duration-100",
          "peer-hover:bg-blue-50 peer-hover:text-black peer-hover:ring-1 peer-hover:ring-blue-500",
          "hover:bg-blue-50 hover:text-black hover:ring-1 hover:ring-blue-500"
        )}
      >
        {variantName}
      </span>
    </span>
  );
}
