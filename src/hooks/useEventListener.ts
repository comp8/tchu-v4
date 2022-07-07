import React, { useEffect, useRef } from "react";

export function useWindowEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
  deps?: React.DependencyList
) {
  const ref = useRef<(this: Window, ev: WindowEventMap[K]) => any>();

  useEffect(() => {
    ref.current = listener;
  }, [listener]);

  useEffect(() => {
    const handler = (ev: WindowEventMap[K]) => ref.current?.call(window, ev);

    window.addEventListener(type, handler, options);

    return () => {
      window.removeEventListener(type, handler, options);
    }
  }, [type, options, ...(deps ? deps : [])]);
}
