import React, { createContext, useContext, useEffect, useState } from "react";
import { ChatStore } from "../chat-store";

// context
const ChatStoreContext = createContext<ChatStore>(null);

// provider
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

  return (
    <ChatStoreContext.Provider value={store}>
      {props.children}
    </ChatStoreContext.Provider>
  )
}

// consumer
const useChatStore = () => useContext(ChatStoreContext).consumer;

export { ChatStoreProvider, useChatStore };