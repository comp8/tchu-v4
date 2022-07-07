interface Options {
  force_verify?: boolean;
  redirect_uri: string;
  scopes: string[];
  client_id: string;
}

export function getTwitchAuthUrl(options: Options) {
  const { force_verify, client_id, redirect_uri, scopes } = options;

  const url = 'https://id.twitch.tv/oauth2/authorize?' + new URLSearchParams({
    response_type: 'token',
    client_id,
    redirect_uri,
    scope: scopes.join(' '),
    force_verify: force_verify.toString(),
  }).toString();

  return url;
}