import React, { useCallback } from "react";
import { useChannelInfo } from "../../../../datamgmts/contexts";
import { useLocalStorageState } from "../../../../hooks/usePersistentState";
import { useChannelName } from "../../../hooks/useChannelName";

function ChannelButton() {

  const [_, setChannel] = useChannelName();
  const info = useChannelInfo();

  const handleClick = () => {
    const channel = prompt('change channel ?', info.channel);
    if (channel && channel !== info.channel) {
      setChannel(channel);
    }
  }

  return (
    <div>
      {
        info &&
        <div onClick={handleClick}>
          <img style={{ width: '50px', height: '50px' }} src={info.profile} />
          <span>{info.channel}</span>
        </div>
      }
    </div>
  )
}

function Logout() {
  const [_, setToken] = useLocalStorageState('token', '');
  const handleClick = useCallback(() => { setToken('') }, []);
  return <button onClick={handleClick}>Logout</button>
}

export default function Header() {
  return (
    <header>
      <ChannelButton />
      <Logout />
    </header>
  );
}