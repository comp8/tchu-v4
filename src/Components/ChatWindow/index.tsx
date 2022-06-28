import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatRow from "../ChatRow";
import { useSelector } from "react-redux";
import { IChatsState, RootState } from "../../store";

import style from './style.css';

function useAutoScroller<T extends HTMLElement>() {
  const ref = useRef<T>();

  useLayoutEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView({ block: 'end' });
  });

  return { ref };
}

interface ChatWindowProps {
  MaxItems: number;
  className?: string;
}

export default function ChatWindow(props: ChatWindowProps) {

  const { MaxItems } = props;
  const { items } = useSelector<RootState, IChatsState>(state => state.chats);

  const channel = useSelector<RootState, string>(state => state.channel.uname);

  const { ref: ulRef } = useAutoScroller<HTMLUListElement>();

  return (
    <div className={`${props.className} ${style.wrapper}`}>
      <div className={style.header}>
        <span className={style.channel}>
          {channel ? `#${channel}` : 'Chat'}
        </span>
      </div>
      <div className={style.content}>
        {
          items.length > 0 ? (
            <ul className={style.chatList} ref={ulRef}>
              {
                items.map(c => <ChatRow className={style.chatItem} key={c.userstate.id} data={c} />).slice(-MaxItems)
              }
            </ul>
          ) : (
            // <SpinnerClock color="#e0e0e0" speed={1.2} hmRatio={6.0} reverse />
            <div className={style.spinnerWrapper}><span className={`${style.spinner} icon-spinner-x`}></span></div>
          )
        }
      </div>
      <div className={style.footer}>
        {/* <p>&nbsp;</p> */}
      </div>
    </div>
  );
}