import React from "react";
import { ChatItem } from "../../common/Types";
import { arbitraryColor } from "../../common/utils";
import ChatMessage from "../ChatWindow/ChatRow/ChatMessage";
import UserName from "../UserName";

interface ChatRowProps {
  data: ChatItem;
  className?:string;
}

export default function ChatRow(props: ChatRowProps) {

  const { data } = props;

  return (
    <li className={props.className} data-channel={data.channel}>
      <UserName
        className='chat-name-wrapper'
        badges={data.userstate.badges}
        dname={data.userstate["display-name"]}
        uname={data.userstate.username}
        color={data.userstate.color || arbitraryColor(data.userstate["user-id"])}
        delimiter
      />
      <ChatMessage
        message={data.message}
        emotes={data.userstate.emotes}
      />
    </li>
  );
}
