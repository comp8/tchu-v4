import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BadgeSets, fetchBadgeSets, fetchUsers } from "../../Twitch";
import Config from '../../config';
import { useTwitchToken } from "./Token";

const ChannelInfoContext = createContext<ChannelInfo>(null);

type ChannelId = string;
type ChannelName = string;
type DisplayName = string;
type ImageSrc = string;

interface ChannelInfo {
  id: ChannelId;
  badges: BadgeSets;
  channel: ChannelName;
  display: DisplayName;
  profile: ImageSrc;
}

interface FetchParams {
  channel: string;
  accessToken: string;
}

async function fetchChannelInfo({ channel, accessToken }: FetchParams): Promise<ChannelInfo> {
  const usersResponse = await fetchUsers({
    clientId: Config.Twitch.clientId,
    access_token: accessToken,
    logins: [channel],
  });

  const user = usersResponse?.data?.filter(user => user.login === channel && user.id).pop();
  if (!user) {
    throw 'invalid user (?)';
  }

  const { id, display_name: display, profile_image_url: profile } = user;

  const response2 = await fetchBadgeSets(id);
  const badges = response2?.badge_sets;
  if (!badges) {
    throw 'badgesets';
  }

  return { badges, channel, display, id, profile };
}

type OnErrorCallback = (msg: string, ...args: any[]) => void;

interface HookParams {
  channel: string;
  accessToken: string;
  onError: OnErrorCallback;
}

function useChannelInfoFetcher({ channel, accessToken, onError }: HookParams, deps: React.DependencyList = []) {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>();

  useEffect(() => {
    (channel && accessToken) && fetchChannelInfo({ channel, accessToken })
      .then(info => setChannelInfo(info))
      .catch(err => onError?.(err));
  }, [channel, accessToken, ...deps]);

  return channelInfo;
}

interface Props {
  channel: string;
  children?: React.ReactElement;
}

function ChannelInfoProvider(props: Props) {
  const { channel } = props;
  const [retryCount, setRetryCount] = useState<number>(0);

  const accessToken = useTwitchToken();

  const onError: OnErrorCallback = useCallback((msg, ...args) => {
    console.error(msg, ...args);
    setRetryCount(n => n + 1);
  }, [setRetryCount]);

  const channelInfo = useChannelInfoFetcher({ channel, accessToken, onError }, [retryCount]);

  return (
    <ChannelInfoContext.Provider value={channelInfo}>
      {props.children}
    </ChannelInfoContext.Provider>
  )
}

const useChannelInfo = (): Readonly<ChannelInfo> => useContext(ChannelInfoContext);

export { ChannelInfoProvider, useChannelInfo };