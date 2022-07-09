import React, {  } from "react";

import { useTwitchToken } from "../../../datamgmts/contexts";
import Header from "./Header";
import NeedLogin from "./NeedLogin";

import { useChannelName } from "../../hooks/useChannelName";
import Chat from "./Chat";

export default function MainPage() {

  const { isValid: isValidToken } = useTwitchToken();
  const [channel] = useChannelName();

  if (!isValidToken) {
    return <NeedLogin />;
  }

  return (
    <div>
      <Header />
      <Chat />
    </div>
  );
}