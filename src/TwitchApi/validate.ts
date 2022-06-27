interface ITwitchValidateSuccess {
  client_id: string;
  login: string;
  scopes: string[];
  user_id: string;
  expires_in: number;
}

interface ITwitchValidateFailed {
  status: number;
  message: string;
}

type ITwitchValidateResponse = ITwitchValidateSuccess & ITwitchValidateFailed;

export async function validateTwitchAccessToken(token: string): Promise<ITwitchValidateResponse> {
  const url = 'https://id.twitch.tv/oauth2/validate';
  const r = await fetch(url, {
    headers: {
      'Authorization': 'OAuth ' + token
    }
  });
  return await r.json() as ITwitchValidateResponse;
}
