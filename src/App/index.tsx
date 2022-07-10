import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Config from '../config';
import { ChannelInfoProvider, ChatStoreProvider, TwitchTokenProvider } from "../datamgmts/contexts";
import { useChatClient } from "../Twitch";
import { useChannelName } from "./hooks/useChannelName";
import AuthPage from "./pages/Auth";
import ErrorPage from "./pages/Error";
import Fallback from "./pages/Fallback";
import MainPage from "./pages/Main";

export default function App() {
  const clientId = Config.Twitch.clientId;

  const [channel, setChannel] = useChannelName();

  return (
    <React.StrictMode>
      <BrowserRouter>
        <TwitchTokenProvider onInitChannel={setChannel}>
          <Routes>
            <Route index element={
              <ChannelInfoProvider channel={channel}>
                <ChatStoreProvider channel={channel} >
                  <MainPage channel={channel} />
                </ChatStoreProvider>
              </ChannelInfoProvider>
            } />
            <Route path="auth/*" element={<AuthPage />} />
            <Route path="error" element={<ErrorPage />}>
              <Route path=":name/*" element={<ErrorPage />} />
            </Route>
            <Route path="*" element={<Fallback />} />
          </Routes>
        </TwitchTokenProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}