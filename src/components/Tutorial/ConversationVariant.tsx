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
            "peer absolute left-0 right-0 bottom-0 z-50",
            "p-4 translate-y-full w-full",
            "bg-blue-50 rounded-lg shadow-lg shadow-blue-500/20 ring-1 ring-blue-500"
          )}
        >
          <ul className="flex [&>*]:px-2 flex-wrap">
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
                  "hover:ring-1 hover:ring-blue-500 rounded-lg"
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
          "font-mono text-lg select-none font-bold",
          "transition duration-100",
          "peer-hover:ring-1 peer-hover:ring-blue-500 peer-hover:text-black peer-hover:bg-blue-50",
          "hover:ring-1 hover:ring-blue-500 hover:text-black hover:bg-blue-50"
        )}
      >
        {variantName}
      </span>
    </span>
  );
}
