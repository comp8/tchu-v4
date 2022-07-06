import React, { useState } from "react";

import Config from '../config.json';
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

    </React.StrictMode>
  )
}