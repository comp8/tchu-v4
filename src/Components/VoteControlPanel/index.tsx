import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IChatClientListener } from "../../TwitchApi";
import { generateShortId } from "../../common/utils";
import ChatClientContext from "../../contexts/ChatClient";
import { IVoteSession, RootState } from "../../store";
import Actions from "../../store/actions";
import { voteIsOpen, voteIsReady, voteTest } from "../../common/VoteUtils";
import InputForm from "../InputForm";

import style from './style.css';
import StyledButton from "../StyledButton";
import Config from "../../config";
import { useTranslation } from "react-i18next";

interface VoteControlPanelProps {
  onStarted?: () => void;
  onEnded?: () => void;
  onFailed?: () => void;
  onSelectVoteItem: (voteItemId: string) => void;
  className?: string;
}

export default function VoteControlPanel(props: VoteControlPanelProps) {

  const dispatch = useDispatch();
  const current = useSelector<RootState, IVoteSession>(state => state?.votes?.current);
  const [items, setItems] = useState<string[]>(current?.items?.map(e => e.title));

  const handleChange = (items: string[]) => setItems(items);

  const client = useContext(ChatClientContext);

  useEffect(() => {
    const listener: IChatClientListener<'chat'> = (channel, userstate, message, self) => {
      if (voteIsOpen(current)) {
        const idx = voteTest(current.rule, message);
        if (0 <= idx && idx < current.items?.length) {
          dispatch(Actions.Votes.Append({ idx, chat: { channel, userstate, message } }));
        }
      }
    };
    client.on('chat', listener);

    return () => {
      client.removeListener('chat', listener);
    }
  }, [client, current]);

  const handleStart = useCallback(() => {
    if (voteIsReady(current)) {
      console.log('start');
      const voteItemId = generateShortId();
      dispatch(Actions.Votes.Update({
        vote: {
          items: items.map(e => ({ id: voteItemId, title: e })),
          start_date: Date.now(),
        }
      }));
      props.onSelectVoteItem(null);
    }
  }, [current, props.onSelectVoteItem]);

  const handleStop = useCallback(() => {
    dispatch(Actions.Votes.Close());
  }, []);

  const { t } = useTranslation();

  if (!current) {
    return null;
  }
  return (
    <div className={`${style.wrapper} ${props.className || ''}`}>
      <div className={style.toolbar}>
        <StyledButton
          backColor={Config.style.defaultTheme["color-theme"]}
          foreColor={Config.style.defaultTheme["color-back-1"]}
          borderColor={Config.style.defaultTheme["color-theme"]}
          hoverEffect="pulse"
          onClick={handleStart}
        >
          <span className={`${style.btn} ${style.btnStart}`}>{t('Start Vote')}</span>
        </StyledButton>
        <StyledButton
          backColor={Config.style.defaultTheme["color-back-1"]}
          foreColor={Config.style.defaultTheme["color-theme"]}
          borderColor={Config.style.defaultTheme["color-theme"]}
          hoverEffect="normal"
          onClick={handleStop}
        >
          <span className={`${style.btn} ${style.btnStop}`}>{t('Stop Vote')}</span>
        </StyledButton>
      </div>
      {
        current.type === 'NUMBER_GAME' ? (
          <InputForm items={items} onChange={handleChange} />
        ) : (
          null
        )
      }
    </div>
  );
}