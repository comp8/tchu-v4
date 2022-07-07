import React, { useState } from "react";

import Config from '../config';
import { ChannelInfoProvider, ChatStoreProvider, TwitchTokenProvider } from "../datamgmts/contexts";
import { useChatClient } from "../Twitch";

export default function App() {
  const clientId = Config.Twitch.clientId;
  const [channel, setChannel] = useState<string>(null);

  useChatClient({
    clientId,
    channels: channel ? [channel] : [],
    onceInit: (client) => {
      client.on('chat', (channel, userstate, message, self) => {

      })
    }
  });

  return (
    <React.StrictMode>
      <TwitchTokenProvider>
        <ChatStoreProvider channel={channel} >
          <ChannelInfoProvider channel={channel}>
            <div></div>
          </ChannelInfoProvider>
        </ChatStoreProvider>
      </TwitchTokenProvider>
    </React.StrictMode>
  )
}