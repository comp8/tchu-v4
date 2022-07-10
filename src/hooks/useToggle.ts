import { useCallback, useState } from "react";

export function useToggle(initialValue: boolean): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialValue);
  const toggle = useCallback(() => setState(old => !old), []);
  return [state, toggle];
}

// export function useSeq<T extends string>(states: T[]): [T, () => void] {
//   const [idx, setIdx] = useState<number>(0);
//   const next = useCallback(() => {
//     setIdx((old) => {
//       return (old + 1) % states.length;
//     })
//   }, [...states]);

//   return [states[idx], next];
// }
