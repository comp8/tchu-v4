import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useChatClient } from "../../Twitch";
import { ChatStore, parseEmotes } from "../chat-store";
import ChatStoreTypes from "../chat-store/types";
import Config from '../../config';

const ChatStoreContext = createContext<ChatStore>(null);

interface Props {
  channel?: string;
  children?: React.ReactElement;
}
function ChatStoreProvider(props: Props) {
  const { channel } = props;
  const [store, setStore] = useState<ChatStore>();

  useEffect(() => {
    const cs = new ChatStore(Infinity);
    setStore(cs);

    return () => {
      cs.destroy();
    }
  }, [channel]);

  useChatClient({
    clientId: Config.Twitch.clientId,
    channels: channel ? [channel] : [],
    onInit: (client) => {
      client.on('chat', (channel, userstate, message, self) => {
        userstate && store?.append({
          id: userstate.id,
          u: {
            id: userstate["user-id"],
            d: userstate["display-name"],
            n: userstate.username,
            b: userstate.badges,
          },
          m: parseEmotes(message, userstate.emotes),
          t: +new Date(userstate["tmi-sent-ts"]),
          raw: message,
        });
      });
      client.on('clearchat', () => {
        store?.clear();
      });
    }
  }, [store]);

  return (
    <ChatStoreContext.Provider value={store}>
      {props.children}
    </ChatStoreContext.Provider>
  )
}

const useChatStoreContext = () => useContext(ChatStoreContext);

function useChatStore(deps: React.DependencyList = []) {
  const store = useChatStoreContext();
  const [lastId, setLastId] = useState<string>();

  useEffect(() => {
    const fn = (store: ChatStore) => {
      setLastId(store.lastId);
    };

    store?.subscribe(fn);
    return () => {
      store?.unsubscribe(fn);
    }
  }, [store, ...deps]);

  return { lastId, store };
}

export { ChatStoreProvider, useChatStore };