import { Chessground as _Chessground } from 'chessground';
import { Api as _TChessgroundApi } from 'chessground/api';
import { Config as _TChessgroundConfig } from 'chessground/config';

import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css';
import 'chessground/assets/chessground.cburnett.css';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export interface ChessgroundRef extends _TChessgroundApi {}
export interface ChessgroundProps extends _TChessgroundConfig {}

const Chessground = forwardRef<ChessgroundRef, ChessgroundProps>((props, ref) => {
  const [chessgroundApi, setChessgroundApi] = useState<_TChessgroundApi>();
  const chessgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chessgroundRef && chessgroundRef.current && !chessgroundApi) {
      setChessgroundApi(_Chessground(chessgroundRef.current, props));
    } else if (chessgroundApi) {
      chessgroundApi.set(props);
    }

    // FIXME: Can't call `chessgroundApi.destroy()` in cleanup function
    // because while component is mounted, when I click a button or do
    // something in the page, the chessground component unexpectedly
    // unmounts??? I don't know why this happens. It's probably my bad
    // understanding of Refs and ImperativeHandle.
  }, [chessgroundRef, chessgroundApi, props]);

  useImperativeHandle(ref, () => chessgroundApi!);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={chessgroundRef}
      ></div>
    </div>
  );
});

Chessground.displayName = 'Chessground';
export default Chessground;
