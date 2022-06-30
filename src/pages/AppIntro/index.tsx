import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../components/StyledButton";

import Config from "../../config";

import style from './style.css';

interface Props {
  myChannel: string;
}

export default function AppIntro(props: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { myChannel } = props;
  const handleClick_other = useCallback(() => {
    const targetChannel = prompt(t('AppIntro: Input channel name'), myChannel);
    if (targetChannel) {
      navigate('/app/' + targetChannel);
    }
  }, [myChannel]);

  return (
    <div className={style.wrapper}>
      <div className={style.appDesc}>
        <h3>{t('appName')}</h3>
        <span>{t('appDesc')}</span>
      </div>
      <div className={style.buttons}>
        <StyledButton
          theme={{
            backColor: 'var(--global-color-theme-1)',
            borderColor: 'var(--global-color-theme-2)',
            borderWidth: '0.3em'
          }}
          Link={{ to: '/app/' + myChannel, }}
        >
          <div className={[style.btn, style.btnMine].join(' ')}>
            {t('Go to my channel', { channelName: myChannel })}
          </div>
        </StyledButton>
        <StyledButton
          theme={{
            backColor: Config.style.defaultTheme["color-back-1"],
            borderColor: Config.style.defaultTheme["color-back-1"],
          }}
          effectOff
          onClick={handleClick_other}
        >
          <div className={[style.btn, style.btnOther].join(' ')}>
            {t('Go to other channel')}
          </div>
        </StyledButton>
      </div>
    </div>
  );
};