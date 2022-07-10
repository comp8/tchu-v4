import React from "react";
import { Sequence } from "../../../../../components/Sequence";
import { Candidate } from "../ViewerListPanel";

interface Props {
  candidates: Candidate[];
}

export default function WinnerDialog(props: Props) {

  const { candidates } = props;

  return (
    <Sequence durations={[5000, 0]}>{(idx, t) =>
      idx === 0 ? <span>rolling</span> : <span>winner: {candidates[0].dname}</span>
    }</Sequence>
  )
}