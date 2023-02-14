interface TransformCommentConverters {
  text: (value: string) => React.ReactNode;
  variant: (value: IChessVariant) => React.ReactNode;
}

export function transformComment(
  comment: IStepComment[],
  converters: TransformCommentConverters
) {
  return comment.map((c) => {
    if (c.type === "text") {
      return converters.text(c.value);
    } else if (c.type === "variant") {
      return converters.variant(c.value);
    }
  });
}
