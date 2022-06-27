import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Navigate, } from 'react-router-dom';
import BadgeContext from "../Contexts/BadgeContext";
import ChatClientContext from "../Contexts/ChatClientContext";
import Actions from "../Store/actions";
import ChatWindow from "../Components/ChatWindow";
import Game from "../Components/Game/Game";
import RemoveTrailingSlash from "../Components/RemoveTrailingSlash";
import { useBadgeSets as useBadgeSet, useBroadcasterInfo, useChatClient, useTwitchValidation } from "../TwitchApi";

import style from './App.css';
import AppIntro from "./AppIntro";
import ChannelHeader from "../Components/ChannelHeader";
import { useTranslation } from "react-i18next";

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

  useEffect(() => {
    dispatch(Actions.Chats.Clear());
    dispatch(Actions.Users.Clear());
    dispatch(Actions.Votes.Clear());
  }, [channel]);

  return (
    <ChatClientContext.Provider value={chatClient}>
      <BadgeContext.Provider value={badgeSet}>
        <div className={style.wrapper} >
          {
            !access_token ? <Navigate to={'/?sign-in'} /> : null
          }
          {
            !login || !user_id ? (
              <p>{t('waiting for validation')}</p>
            ) : (
              !channel ? (
                <AppIntro myChannel={login}/>
              ) : (
                <>
                  <RemoveTrailingSlash />
                  <ChannelHeader className={style.header} displayName={broadcasterInfo.dname} userName={broadcasterInfo.uname} profileImage={broadcasterInfo.profile} />
                  <Game className={style.gamePanel} />
                  <ChatWindow className={style.chatPanel} MaxItems={200} />
                </>
              )
            )
          }
        </div>
      </BadgeContext.Provider>
    </ChatClientContext.Provider>
  );
}