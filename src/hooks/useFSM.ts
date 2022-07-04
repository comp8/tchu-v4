import { useState } from "react";

type Predicate = () => boolean;

interface Transition<TypeName extends string> {
  test?: Predicate;
  to: TypeName;
}

type States<StateName extends string, K extends StateName> = Record<StateName, Transition<K>[]>;

export function useFSM<StateName extends string, K extends StateName>(init: K, states: States<StateName, K>) {
  const [current, setState] = useState<StateName>(init);

  function next() {
    const transitions = states[current];
    for (const transition of transitions) {
      if (!transition.test || transition.test()) {
        setState(transition.to);
      }
    }
  }

  return { current, requestNext: next };
}