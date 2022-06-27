import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Actions from '../Store/actions';
import { BadgeSets, fetchBadgeSets } from './badges';
import { fetchUsers } from './users';
import { validateTwitchAccessToken } from './validate';

export * from './users';
export * from './badges';
export * from './validate';
export * from './ChatClient';


export function useTwitchValidation(deps: React.DependencyList = []) {
  const [loginInfo, setLoginInfo] = useState<{ login?: string, user_id?: string }>({});
  const { login, user_id } = loginInfo;

  const token = localStorage.getItem('token');

  useEffect(() => {
    let timerId: number | NodeJS.Timeout = null;

    async function validate() {
      const r = await validateTwitchAccessToken(token);
      if (r?.user_id && r.login) {
        if (r.expires_in) {
          clearTimeout(timerId);
          const interval = (r.expires_in - Date.now()) / 2;
          timerId = setTimeout(() => validate(), interval);
        }
        setLoginInfo({ login: r.login, user_id: r.user_id });
      }
      if (!r || r.status > 400) {
        console.error('token validation error', r);
      }
    }
    validate();

    return () => {
      clearInterval(timerId);
    };
  }, [token, ...deps]);

  return { login, user_id, access_token: token };
}

interface IBroadcasterInfo {
  uid: string;
  uname: string;
  dname: string;
  profile: string;
};
const initialBroadcasterInfo: IBroadcasterInfo = {
  uid: null,
  uname: null,
  dname: null,
  profile: null,
};

export function useBroadcasterInfo({ channel, access_token }: { channel: string, access_token: string }, deps: React.DependencyList = []) {
  const [info, setInfo] = useState<IBroadcasterInfo>(initialBroadcasterInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (channel) {
      fetchUsers({ logins: [channel], access_token }).then(({ data }) => {
        if (data?.[0]?.id) {
          const { display_name: dname, login: uname, id: uid, profile_image_url: thumb } = data[0];
          const obj = { dname, uid, uname, token: access_token };
          setInfo({ uid, dname, uname, profile: thumb });
          dispatch(Actions.Channel.Update({ data: obj }));
        }
      });
    }
    else {
      setInfo(initialBroadcasterInfo);
      dispatch(Actions.Channel.Update({ data: { dname: null, uid: null, uname: null } }));
    }
  }, [channel, ...deps]);

  return info;
}

export function useBadgeSets(user_id: string, deps: React.DependencyList = []) {

  const [badgeSets, setBadgeSets] = useState<BadgeSets>({});

  useEffect(() => {
    user_id && fetchBadgeSets(user_id).then(r => setBadgeSets(r?.badge_sets || {}));
  }, [user_id, ...deps]);

  return badgeSets;
}
