import React, { createContext, useContext, useEffect, useState } from "react";

import { getTwitchAuthUrl } from "../../Twitch/api/auth";
import { validateAccessToken } from "../../Twitch/api/validate-token";

import Config from '../../config';
import { useNavigate } from "react-router-dom";
import { useLocalStorageState } from "../../hooks/usePersistentState";

const TokenContext = createContext<string>(null);

interface Props {
  children?: React.ReactElement;
}
function TwitchTokenProvider(props: Props) {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorageState<string>('token', '');

  const clientId = Config.Twitch.clientId;

  useEffect(() => {
    if (token) {
      // validate
      validateAccessToken(token).then(r => {
        if (!r || !r.user_id) {
          // invalid
          if (r?.status >= 400) {
            // has error message
            console.error(r.message);
          }
          // reset token
          setToken('');
        }
      })
    }
    else {
      // grant
      const url = getTwitchAuthUrl({ client_id: clientId, redirect_uri: Config.Twitch.redirectUri, scopes: Config.Twitch.scope, force_verify: false });
      navigate(url, { replace: true });
    }
  }, [token]);

  return (
    <TokenContext.Provider value={token}>
      {props.children}
    </TokenContext.Provider>
  );
}

const useTwitchToken = (): Readonly<string> => useContext(TokenContext);

export { TwitchTokenProvider, useTwitchToken };