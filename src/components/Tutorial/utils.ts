import { ITutorial } from '@/types';
import { PGTCommand } from '@/utils/pgt/pgt.types';
import { DrawShape } from 'chessground/draw';

export const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export function getFenCommandFromStep(step: ITutorial['pgt']['steps'][number]) {
  if (!step) return '';

  if (step.type === 'MOVE') {
    const commands = step.value.comments.filter((comment) => comment.type === 'COMMAND') as {
      type: 'COMMAND';
      value: PGTCommand;
    }[];
    const fenCommand = commands.find((command) => command.value.name === 'fen');
    if (!fenCommand) {
      return '';
    }

    return fenCommand.value.args[0];
  } else if (step.type === 'COMMENT') {
    const commands = step.value.commands;
    const fenCommand = commands.find((command) => command.name === 'fen');
    if (!fenCommand) {
      return '';
    }

    return fenCommand.args[0];
  } else if (step.type === 'COMMAND') {
    if (step.value.name === 'fen') {
      return step.value.args[0];
    }

    return '';
  }

  return '';
}

export function getShapesFromStep(step: ITutorial['pgt']['steps'][number]) {
  if (!step) return [];

  if (step.type === 'MOVE') {
    const commands = step.value.comments.filter((comment) => comment.type === 'COMMAND') as {
      type: 'COMMAND';
      value: PGTCommand;
    }[];

    const drawableCommands = commands.filter((command) => ['highlight', 'arrow'].includes(command.value.name));

    return drawableCommands.map((command) => {
      const { name: fn, args } = command.value;
      if (fn === 'highlight') {
        return {
          brush: 'green',
          orig: args[0],
        } as DrawShape;
      } else {
        return {
          brush: 'green',
          orig: args[0],
          dest: args[1],
        } as DrawShape;
      }
    });
  } else if (step.type === 'COMMENT') {
    const commands = step.value.commands;
    const drawableCommands = commands.filter((command) => ['highlight', 'arrow'].includes(command.name));

    return drawableCommands.map((command) => {
      const { name: fn, args } = command;
      if (fn === 'highlight') {
        return {
          brush: 'green',
          orig: args[0],
        } as DrawShape;
      } else {
        return {
          brush: 'green',
          orig: args[0],
          dest: args[1],
        } as DrawShape;
      }
    });
  } else if (step.type === 'COMMAND') {
    const { name: fn, args } = step.value;
    if (fn === 'highlight') {
      return [
        {
          brush: 'green',
          orig: args[0],
        } as DrawShape,
      ];
    } else if (fn === 'arrow') {
      return [
        {
          brush: 'green',
          orig: args[0],
          dest: args[1],
        } as DrawShape,
      ];
    }
  }

  return [];
}

export function getCommentsFromStep(step: ITutorial['pgt']['steps'][number]) {
  if (!step) return [];

  if (step.type === 'MOVE') {
    return step.value.comments
      .filter((comment) => comment.type === 'COMMENT')
      .map((comment: any) => comment.value.text as string);
  } else if (step.type === 'COMMENT') {
    return [step.value.text];
  }

  return [];
}

export function getChoiceCommandFromStep(step: ITutorial['pgt']['steps'][number]) {
  if (!step || step.type === 'MOVE' || step.type === 'COMMAND') return null;

  const choiceCommand = step.value.commands.find((command) => command.name === 'choice');
  if (!choiceCommand) return null;

  const choiceObject = {
    question: step.value.text,
    choices: [] as { text: string; correct: boolean }[],
  };
  choiceCommand.args.forEach((arg, index) => {
    choiceObject.choices.push({
      text: arg,
      correct: index === 0,
    });
  });

  return choiceObject;
}
