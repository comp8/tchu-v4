import React, { } from "react";

import { useTwitchToken } from "../../../datamgmts/contexts";
import Header from "./Header";
import NeedLogin from "./NeedLogin";

import { useChannelName } from "../../hooks/useChannelName";
import Chat from "./Chat";
import Vote from "./Vote";

interface Props {
  channel: string;
}
export default function MainPage({ channel }: Props) {

  const { isValid: isValidToken } = useTwitchToken();

  if (!isValidToken) {
    return <NeedLogin />;
  }

  return (
    <div>
      <Header />
      <Vote />
      <Chat />
    </div>
  );
}
