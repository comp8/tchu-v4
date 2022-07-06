import React, { useLayoutEffect, useState } from 'react';

interface Props {
  loop?: true;
  durations: number[];
  children(index: number, t: number): React.ReactElement;
}

export function Sequence(props: Props) {
  const { durations, loop } = props;
  const [result, setResult] = useState<{ idx: number, t: number }>({ idx: 0, t: 0 });

  useLayoutEffect(() => {
    const sum = durations.reduce((p, e) => p + e, 0);
    let start = Date.now();
    let timerId = setInterval(() => {
      let idx = 0, t = 0;
      let dt = Date.now() - start;
      for (const duration of durations) {
        if (dt > duration) {
          dt -= duration;
          ++idx;
        }
        else {
          t = dt / duration;
          t = t < 0 ? 0 : t;
          break;
        }
      }
      if (idx < durations.length) {
        setResult({ idx, t });
      }
      else {
        if (loop === true) {
          setResult({ idx: 0, t: 0 });
          start += sum;
        }
        else {
          clearInterval(timerId);
          timerId = null;
          setResult({ idx: durations.length - 1, t: 1 });
        }
      }
    }, 0);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  return props.children(result.idx, result.t);
}