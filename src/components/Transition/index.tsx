import { useState, useEffect } from "react";

interface Props {
  duration: number;
  children(t: number, done: boolean): React.ReactElement;
}

export function Transition(props: Props) {
  const [t, setT] = useState<number>(0);
  const { duration } = props;

  useEffect(() => {
    const start = Date.now();
    let timerId = setInterval(() => {
      const dt = Date.now() - start;
      if (dt < duration) {
        let t = dt / duration;
        t = t < 0 ? 0 : t;
        setT(t);
      }
      else {
        clearInterval(timerId);
        timerId = null;
        setT(1);
      }
    }, 0);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  return props.children(t, t >= 1);
}