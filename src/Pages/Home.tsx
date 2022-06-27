import React from "react";
import Config from "../config";

interface HomeProps {
  auth?: any;
}

export default function Home(props: HomeProps) {

  let force_verify = true;
  try {
    if (!localStorage.getItem('force_verify')) {
      force_verify = false;
    }
  }
  catch (ex) {
    console.log(ex);
  }

  const login_url = 'https://id.twitch.tv/oauth2/authorize?' + new URLSearchParams({
    response_type: 'token',
    force_verify: force_verify.toString(),
    redirect_uri: Config.Twitch.redirect_uri,
    scope: Config.Twitch.scope.join(' '),
    client_id: Config.Twitch.clientId,
  }).toString();

  return (
    <>
      <p>
        {
          '트위치 투표 추첨기'
        }
      </p>
      <a href={login_url}>들어가기</a>
    </>
  );
};