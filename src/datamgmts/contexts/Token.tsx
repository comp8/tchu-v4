import React, { createContext, useContext, useEffect, useState } from "react";
import { validateAccessToken } from "../../Twitch/api/validate-token";
import { useLocalStorageState, useSessionStorageState } from "../../hooks/usePersistentState";
import Config from '../../config';

interface ITokenContext {
  accessToken: string;
  isValid: boolean;
}
const TokenContext = createContext<ITokenContext>(null);

interface Props {
  children?: React.ReactElement;
  onInitChannel: (channel: string) => void;
}
function TwitchTokenProvider(props: Props) {
  const [token, setToken] = useLocalStorageState<string>('token', '');
  const [isValid, setValidity] = useState<boolean>(true);

  const clientId = Config.Twitch.clientId;
  const { onInitChannel } = props;

  useEffect(() => {
    if (token) {
      // validate
      validateAccessToken(token).then(r => {
        if (r?.user_id && r.client_id === clientId) {
          // valid
          setValidity(true);
          onInitChannel(r.login);
        }
        else {
          // invalid
          if (r?.status >= 400) {
            // has error message
            console.error(r.message);
          }
          // reset token
          setToken('');
          setValidity(false);
        }
      });
    }
    else {
      setValidity(false);
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ accessToken: token, isValid }}>
      {props.children}
    </TokenContext.Provider>
  );
}

const useTwitchToken = () => useContext(TokenContext);

export { TwitchTokenProvider, useTwitchToken };