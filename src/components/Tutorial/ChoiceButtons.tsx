import { cn } from '@/utils/tw';
import { useState } from 'react';
import Button from '../Button';

interface ChoiceButtonsProps {
  choices: {
    text: string;
    correct: boolean;
  }[];
  onCorrectButtonClicked?: (data: { text: string; correct: boolean }) => void;
}

export default function ChoiceButtons({ choices, onCorrectButtonClicked }: ChoiceButtonsProps) {
  const [disabledButtons, setDisabledButtons] = useState<number[]>([]);

  function onButtonClicked(idx: number, isCorrect: boolean) {
    if (!isCorrect) {
      setDisabledButtons([...disabledButtons, idx]);
      return;
    }

    onCorrectButtonClicked?.(choices[idx]);
  }

  return (
    <div className="grid grid-cols-2 gap-1 md:flex md:flex-col md:gap-2">
      {choices.map((choice, idx) => (
        <Button
          key={idx}
          disabled={disabledButtons.includes(idx)}
          className={cn(
            'w-full text-xs md:text-sm',
            disabledButtons.includes(idx) && 'bg-red-900 opacity-100 brightness-50'
          )}
          onClick={() => {
            if (disabledButtons.includes(idx)) return;
            onButtonClicked(idx, choice.correct);
          }}
        >
          {choice.text}
        </Button>
      ))}
    </div>
  );
}
