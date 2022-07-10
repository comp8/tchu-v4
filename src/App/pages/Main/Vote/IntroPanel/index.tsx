import React, { useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';

const createSimpleGame = (): Vote => ({
  id: uuidv4(),
  type: 'simple',
  state: 'ready',
  items: [{
    id: uuidv4(),
    title: 'default',
    predicate: () => true,
  }],
});

const createNumberGame = (): Vote => ({
  id: uuidv4(),
  type: 'number',
  state: 'ready',
  items: [],
});

interface Props {
  onCreate: (vote: Vote) => void;
}

export default function IntroPanel(props: Props) {

  const { onCreate } = props;

  return (
    <>
      <button onClick={useCallback(() => onCreate(createSimpleGame()), [onCreate])}>SimpleGame</button>
      <button onClick={useCallback(() => onCreate(createNumberGame()), [onCreate])}>NumberGame</button>
      <p>description</p>
    </>
  )
}