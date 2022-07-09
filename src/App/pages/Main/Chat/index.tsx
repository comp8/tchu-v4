import React, { useCallback } from "react";
import { useChatStore } from "../../../../datamgmts/contexts";
import { useSessionStorageState } from "../../../../hooks/usePersistentState";

const MaxItems = 300;

export default function Chat() {
  const [hidden, setHidden] = useSessionStorageState<boolean>('hideChat', false);
  const { lastId, store } = useChatStore();

  return (
    hidden ? (
      <>
        <div>Chat--hidden</div>
        <button onClick={() => setHidden(false)}>show</button>
      </>
    ) : (
      <>
        <div>Chat</div>
        <button onClick={() => setHidden(true)}>hide</button>
        <ul>
          {
            store?.chats?.slice(-MaxItems).map(c => (
              <li key={c.id}>
                <span>{c.u.d}</span>
                <span>:</span>
                <span>{c.raw}</span>
              </li>
            ))
          }
        </ul>
      </>
    )
  )
}