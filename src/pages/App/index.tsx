import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Navigate, } from 'react-router-dom';
import { useBadgeSets as useBadgeSet, useBroadcasterInfo, useChatClient, useTwitchValidation } from "../../TwitchApi";

import style from './style.css';
import AppIntro from "../AppIntro";
import ChannelHeader from "../../components/ChannelHeader";
import { useTranslation } from "react-i18next";
import Actions from "../../store/actions";
import ChatClientContext from "../../contexts/ChatClient";
import BadgeContext from "../../contexts/Badge";
import RemoveTrailingSlash from "../../components/RemoveTrailingSlash";
import Game from "../../components/Game";
import { ChatWindow, ChatWindowHidden } from "../../components/ChatWindow";
import StyledButton from "../../components/StyledButton";

import { ToastContainer } from 'react-toastify';

function useChatToggler(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [visibility, setVisibility] = useState<boolean>(true);

  return [visibility, setVisibility];
}

interface AppProp {

}

export default function App(props: AppProp) {

  const { login, user_id, access_token } = useTwitchValidation();

  const { channel } = useParams();
  const broadcasterInfo = useBroadcasterInfo({ access_token, channel });

  const badgeSet = useBadgeSet(broadcasterInfo?.uid);
  const chatClient = useChatClient({ channel });

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isChatVisible, changeChatVisibility] = useChatToggler();

  useEffect(() => {
    dispatch(Actions.Chats.Clear());
    dispatch(Actions.Users.Clear());
    dispatch(Actions.Votes.Clear());
  }, [channel]);

  return (
    <ChatClientContext.Provider value={chatClient}>
      <BadgeContext.Provider value={badgeSet}>
        <div className={[style.wrapper, isChatVisible ? style.chatVisible : style.chatInvisible].join(' ')} >
          {
            !access_token ? <Navigate to={'/?sign-in'} /> : null
          }
          {
            !login || !user_id ? (
              <p>{t('waiting for validation')}</p>
            ) : (
              !channel ? (
                <AppIntro myChannel={login} />
              ) : (
                <>
                  <RemoveTrailingSlash />
                  <ChannelHeader className={style.header} displayName={broadcasterInfo.dname} userName={broadcasterInfo.uname} profileImage={broadcasterInfo.profile} />
                  <Game className={style.gamePanel} />
                  {
                    isChatVisible ?
                      (
                        <ChatWindow className={style.chatPanel} MaxItems={200} onChangeVisibility={changeChatVisibility} />
                      )
                      :
                      (
                        <ChatWindowHidden onChangeVisibility={changeChatVisibility} />
                      )
                  }
                </>
              )
            )
          }
          <ToastContainer closeOnClick  />
        </div>
      </BadgeContext.Provider>
    </ChatClientContext.Provider>
  );
}