import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import tmi from 'tmi.js';
import Config from '../config';
import Actions from '../store/actions';

const connection_delay = 600;

interface ChatClientProps {
  channels: string[];
  username?: string;
  password?: string;
}

export class ChatClient extends tmi.Client {

  constructor(props: ChatClientProps) {
    super({
      options: {
        // debug: process.env.NODE_ENV === 'development',
        clientId: Config.Twitch.clientId
      },
      identity: props.username && props.password ? {
        username: props.username,
        password: 'oauth:' + props.password,
      } : undefined,
      channels: [
        ...props.channels
      ],
    });
  }

  destroy() {
    this.removeAllListeners();
    const readyState = this.readyState();
    if (readyState !== 'CLOSED') {
      try {
        this.disconnect();
        console.log(readyState, this.readyState());
      } catch (ex) { }
    }
  }
}

export type IChatClientListener<TEventName extends keyof tmi.Events> = tmi.Events[TEventName];

export function useChatClient(opts: { channel: string, name?: string, pass?: string }, deps: React.DependencyList = []) {

  const { channel, name: username, pass: password } = opts;

  const dispatch = useDispatch();
  const [client, setClient] = useState<ChatClient>(null);

  useEffect(() => {
    const cc = new ChatClient(Object.assign({
      channels: [channel]
    },
      username && password ? { username, password } : null
    ));

    cc.on('chat', (channel, userstate, message, self) => {
      dispatch(Actions.Chats.Append({ chat: { channel, userstate, message } }));
      dispatch(Actions.Users.Update({ chat: { channel, userstate, message } }));
    });
    cc.on('clearchat', () => {
      dispatch(Actions.Chats.Clear());
    });

    const delayedConnect = (delay: number) => setTimeout(() => cc.connect(), delay);
    const timerId = delayedConnect(connection_delay);

    setClient(cc);

    return () => {
      clearTimeout(timerId);
      cc.destroy();
      setClient(null);
    };
  }, [channel, username, password, ...deps]);

  return client;
}
