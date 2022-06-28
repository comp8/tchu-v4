import React from "react";
import Emoticon from "../../../Emoticon";

function Text({ str }: { str: string }) {
  return <span className='chat-message__text'>{str}</span>
}

interface ChatMessageProps {
  message: string;
  emotes: { [id: string]: string[] };
}

export default function ChatMessage(props: ChatMessageProps) {
  const { message, emotes: emotesObj } = props;

  let elements: React.ReactElement[] = [];

  if (emotesObj) {
    let emotesArr: [string, number, number][] = [];
    Object.keys(emotesObj).forEach(key => {
      [...emotesObj[key]].forEach(position => {
        let match = /^(\d+)-(\d+)$/.exec(position);
        if (match) {
          let a = parseInt(match[1]);
          let b = parseInt(match[2]);
          emotesArr.push([key, a, b]);
        }
      });
    });
    if (emotesArr.length > 0) {
      emotesArr.sort((a, b) => a[1] - b[1]);

      let i = 0;
      for (const emote of emotesArr) {
        const emoteId = emote[0];
        const begin = emote[1];
        const end = emote[2];

        if (i < begin) {
          elements.push(<Text str={message.slice(i, begin)} />);
        }
        elements.push(<Emoticon id={emoteId} />);
        i = end + 1;
      }
      if (i < message.length) {
        elements.push(<Text str={message.slice(i)} />);
      }
    }
  }

  if (elements.length <= 0) {
    elements.push(<Text str={message} />);
  }

  return (
    <span className='chat-message'>
      {
        ...elements
      }
    </span>
  );
}
