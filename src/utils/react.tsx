import React from 'react';

export function joinReactChildren(children: React.ReactNode[], seperator: React.ReactNode) {
  return children.reduce((prev, curr, idx) => {
    const keyedSeperator = Object.create({
      ...(seperator as React.ReactElement),
      key: `seperator-${idx}`,
    });

    return [prev, keyedSeperator, curr];
  });
}

export function findByType<T extends React.ElementType>(children: React.ReactNode, type: T): React.ReactElement<T>[] {
  return React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === type
  ) as React.ReactElement<T>[];
}
