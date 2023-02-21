export function joinReactChildren(
  children: React.ReactNode[],
  seperator: React.ReactNode
) {
  return children.reduce((prev, curr, idx) => {
    const keyedSeperator = Object.create({
      ...(seperator as React.ReactElement),
      key: `seperator-${idx}`,
    });

    return [prev, keyedSeperator, curr];
  });
}
