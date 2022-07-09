import React from 'react';
import Config from '../../../../config';
import { getTwitchAuthUrl } from '../../../../Twitch/api/auth';

export default function NeedLogin() {

  const url = getTwitchAuthUrl({
    client_id: Config.Twitch.clientId,
    redirect_uri: Config.Twitch.redirectUri,
    scopes: Config.Twitch.scope,
    force_verify: false
  });

  return <a href={url}>Login</a>;
}
