import React from "react";

import style from './Emoticon.css';

interface EmoticonProps {
  id: string;
}

export default function Emoticon({ id }: EmoticonProps) {
  const theme_mode: 'light' | 'dark' = 'light';
  const format = 'default';
  const scale: '1.0' | '2.0' | '3.0' = '2.0';
  const url = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme_mode}/${scale}`;
  return (
    <span className={`${style.wrapper} emoticon-wrapper`}>
      <img className={style.emoticon} src={url} alt={'emoticon'} />
    </span>
  );
}
