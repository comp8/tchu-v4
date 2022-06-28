import React from "react";

import style from './style.css';

interface Props {
  total?: number;
  current?: number;
  excludes?: number;
}

export default function VoterCounter(props: Props) {

  const current = props.total === props.current ? null : props.current;
  const total = props.total || 0;

  return (
    <div className={style.wrapper}>
      {
        current ? (
          <>
            <div className={style.current}>{current}</div>
          </>
        ) : null
      }
      <div className={style.total}>{total}</div>
      {
        props.excludes ? (
          <div className={style.excludes}>{props.excludes}</div>
        ) : null
      }
    </div>
  )
}