import React from "react";
import { useTranslation } from "react-i18next";
import Config from "../../config";

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

  const {t} = useTranslation();
  return (
    <>
      <p>
        {
          t('appName')
        }
      </p>
      <a href={login_url}>{t('Login')}</a>
    </>
  );
};