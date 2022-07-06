import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

interface IOptions {
  duration: number;
}

interface IReturnType {
  t: number;
  ctrl: {
    pause: () => void;
    abort: () => void;
    resume: (from0?: boolean) => void;
    toggle: () => void;
  }
}

interface TimerState {
  timestamp: number;
  isPaused: boolean;
  isAborted: boolean;
  pausedTime: number | null;
  resumeTime: number | null;
}

export function useAnimTime01(options: IOptions, deps?: React.DependencyList): IReturnType {
  const { duration } = options;
  const depList = deps ? [duration, ...deps] : [duration];

  const [time, setTime] = useState<number>(0);

  const stateRef = useRef<TimerState>({
    timestamp: 0,
    isPaused: false,
    isAborted: false,
    pausedTime: null,
    resumeTime: null,
  });

  const ctrl: IReturnType['ctrl'] = {
    abort: useCallback(() => {
      stateRef.current && (stateRef.current.isAborted = true);
    }, []),
    pause: useCallback(() => {
      if (!stateRef.current) return;
      if (!stateRef.current.isPaused) {
        stateRef.current.isPaused = true;
        stateRef.current.pausedTime = Date.now();
      }
    }, []),
    resume: useCallback((from0: boolean) => {
      if (!stateRef.current) return;
      if (from0) {
        stateRef.current.isPaused = false;
        stateRef.current.isAborted = false;
        stateRef.current.timestamp = stateRef.current.pausedTime = stateRef.current.resumeTime = Date.now();
      }
      else if (stateRef.current.isPaused) {
        stateRef.current.isPaused = false;
        stateRef.current.resumeTime = Date.now();
      }
    }, []),
    toggle: useCallback(() => {
      if (!stateRef.current) return;
      const { current } = stateRef;
      if (!current.isPaused) {
        stateRef.current.isPaused = true;
        stateRef.current.pausedTime = Date.now();
      }
      else {
        stateRef.current.isPaused = false;
        stateRef.current.resumeTime = Date.now();
      }
    }, []),
  };

  useLayoutEffect(() => {
    const state: TimerState = stateRef.current = {
      timestamp: Date.now(),
      isPaused: false,
      isAborted: false,
      pausedTime: null,
      resumeTime: null,
    };

    let handle: number | null;

    function update() {
      const { isPaused, isAborted, pausedTime, resumeTime } = state;

      if (isAborted) {
        handle = null;
        return;
      }

      if (isPaused) {
        handle = requestAnimationFrame(update);
        return;
      }
      else if (pausedTime) {
        state.timestamp = state.timestamp + (resumeTime || Date.now()) - pausedTime;
        state.pausedTime = null;
        state.resumeTime = null;
      }

      const dt = Date.now() - state.timestamp;

      if (dt <= duration) {
        setTime(dt / duration);
        handle = requestAnimationFrame(update);
      }
      else {
        setTime(1);
        handle = null;
      }
    }
    update();

    return () => {
      cancelAnimationFrame(handle);
    }
  }, depList);

  return { t: time, ctrl };
}
