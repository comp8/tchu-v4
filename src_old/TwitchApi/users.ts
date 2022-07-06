import Config from "../config";

interface ITwitchUserResponse {
  data: ITwitchUser[];
}
interface ITwitchUser {
  id: string;
  login: string;
  display_name: string;
  description: string;
  broadcaster_type: string;
  offline_image_url: string;
  profile_image_url: string;
  type: 'staff' | 'admin' | 'global_mod' | '';
  view_count: number;
  email?: string;
  created_at: string;
}

interface IFetchUsersOptions {
  ids?: string[];
  logins?: string[];
  access_token: string;
}

export async function fetchUsers({ ids, logins, access_token }: IFetchUsersOptions): Promise<ITwitchUserResponse> {
  const url = 'https://api.twitch.tv/helix/users';

  ids = ids || [];
  logins = logins || [];

  const params = [...ids.map(e => 'id=' + e), ...logins.map(e => 'login=' + e)];
  if (params.length <= 0) {
    return null;
  }

  try {
    const response = await fetch(url + '?' + params.join('&'), {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Client-Id': Config.Twitch.clientId
      },
      method: 'GET',
    });

    if (response.status === 200) {
      return await response.json();
    }
    console.error(response);
  }
  catch (ex) {
    console.error(ex);
  }
  return null;
}

interface IFetchUsersFollowsOptions {
  from_id?: string;
  to_id?: string;
  first?: number;
  after?: string;
  access_token: string;
}
interface ITwitchUserFollowsResponse {
  total: number;
  pagination?: {
    cursor?: string;
    [key: string]: string;
  };
  data: ITwitchUserFollows[];
}
interface ITwitchUserFollows {
  followed_at: string;
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
}

export async function fetchUsersFollows({ from_id, to_id, after, first, access_token }: IFetchUsersFollowsOptions): Promise<ITwitchUserFollowsResponse> {
  const url = 'https://api.twitch.tv/helix/users/follows';

  if (!from_id && !to_id) return null;

  const params = new URLSearchParams();

  from_id && params.set('from_id', from_id);
  to_id && params.set('to_id', to_id);
  after && params.set('after', after);
  first && params.set('first', first.toString());

  try {
    const response = await fetch(url + '?' + params.toString(), {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Client-Id': Config.Twitch.clientId
      },
      method: 'GET',
    });

    if (response.status === 200) {
      return await response.json();
    }
    console.error(response);
  }
  catch (ex) {
    console.error(ex);
  }
  return null;
}