import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatRow from "./ChatRow";
import { useSelector } from "react-redux";
import { IChatsState, RootState } from "../../store";

import style from './style.css';
import StyledButton from "../StyledButton_new";
import { useTranslation } from "react-i18next";
import { ChatItem } from "../../common/Types";
import { lerp } from "../../common/utils";

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
  onChangeVisibility: (visibility: boolean) => void;
}

export function ChatWindow(props: ChatWindowProps) {

  const { MaxItems } = props;
  const { items } = useSelector<RootState, IChatsState>(state => state.chats);

  const channel = useSelector<RootState, string>(state => state.channel.uname);

  const { ref: ulRef } = useAutoScroller<HTMLUListElement>();

  const handleClickHideButton = useCallback(() => {
    props.onChangeVisibility?.(false);
  }, [props.onChangeVisibility]);

  const { t } = useTranslation();

  return (
    <div className={`${props.className || ''} ${style.wrapper}`}>
      <div className={style.header}>
        <StyledButton
          title={t('Hide Chat')}
          theme={{
            backColor: 'transparent',
            borderWidth: '0',
          }}
          effectOff
          className={style.hideChatButton}
          onClick={handleClickHideButton}
        >
          <i className={'icon-right'} /><span className={style.hideChatButtonDesc} data-title={t('Hide Chat')}></span>
        </StyledButton>
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

interface ChatWindowHiddenProps {
  onChangeVisibility: (visibility: boolean) => void;
}

export function ChatWindowHidden(props: ChatWindowHiddenProps) {

  const maxCount = 999;
  const animDuration = 180;

  const items = useSelector<RootState, ChatItem[]>(state => state.chats?.items);
  const chatId = (items?.[items.length - 1]?.userstate?.id);

  const [count, setCount] = useState<number>(0);
  const [animTick, setAnimTick] = useState<number>(0);

  useLayoutEffect(() => {
    // count
    setCount(n => n + 1);

    // anim
    const timestamp = Date.now();
    let handleId = requestAnimationFrame(update);
    function update() {
      const dt = Date.now() - timestamp;
      setAnimTick(Math.min(dt / animDuration, 1));

      handleId = dt <= animDuration ? requestAnimationFrame(update) : null;
    }
    return () => {
      cancelAnimationFrame(handleId);
    }
  }, [chatId]);

  const { t } = useTranslation();
  const handleClick = useCallback(() => {
    props.onChangeVisibility?.(true);
  }, [props.onChangeVisibility]);

  return (
    <div className={style.showChatButtonWrapper}>
      <StyledButton
        title={t('Show Chat')}
        theme={{
          backColor: 'var(--global-color-theme)',
          borderWidth: '0',
          borderRadius: '50%',
        }}
        effectOff
        className={style.showChatButton}
        onClick={handleClick}
      >
        <i className='icon-chat-empty' />
      </StyledButton>
      {
        count > 0 ? (
          <div style={{
            position: 'absolute',
            top: lerp(-0.2, -0.5, animTick) + 'em',
            right: '.5em',
            pointerEvents: 'none',
            transform: 'translate(50%, 0)'
          }}>
            <span style={{
              padding: '0.5em',
              backgroundColor: 'var(--global-color-red)',
              color: 'var(--global-color-white)',
              fontSize: '0.5em',
              borderRadius: '.5em',
              fontFamily: 'monospace',
            }}>{count <= maxCount ? count : (maxCount + '+')}</span>
          </div>
        ) : null
      }
    </div>
  );
}