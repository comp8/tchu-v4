import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatItem } from "../../../common/Types";
import { RootState } from "../../../store";
import ChatMessage from "../../ChatWindow/ChatRow/ChatMessage";

import style from './style.css';

interface Props {
  userId: string;
  profileImage: string;
}
export default function Conversation(props: Props) {
  const items = useSelector<RootState, ChatItem[]>(state => state.chats.items);
  const chats = items?.filter(chat => chat?.userstate?.["user-id"] === props.userId) || [];
  const [history, setHistory] = useState<ChatItem[]>(chats);

  useLayoutEffect(() => {
    setHistory(history => [...history, ...chats.filter(e => !history.includes(e))]);
  }, [items]);

  console.warn('TODO');
  
  return (
    <ul className={style.list}>
      {
        history.map(item => (
          <li key={item.userstate.id} className={style.balloonWrapper}>
            <span className='TODO: remove me'>timestamp</span>
            <img className={style.profile} src={props.profileImage} />
            <div className={style.balloon}>
              <ChatMessage message={item.message} emotes={item.userstate.emotes} />
            </div>
          </li>)
        )
      }
    </ul>
  )
}