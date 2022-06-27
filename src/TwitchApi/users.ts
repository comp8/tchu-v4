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