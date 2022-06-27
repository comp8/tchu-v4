import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import StyledButton from "../Components/Views/StyledButton";
import Config from "../config";

import style from './AppIntro.css';

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
        <Link className={style.btnMine} to={'/app/' + myChannel}>{t('Go to my channel', { channelName: myChannel })}</Link>
        <StyledButton
          backColor={Config.style.defaultTheme["color-back-1"]}
          borderColor={'transparent'}
          foreColor={Config.style.defaultTheme["color-black"]}
          hoverEffect="normal"
          onClick={handleClick_other}
        >
          <div className={style.btnOther}>{t('Go to other channel')}</div>
        </StyledButton>
      </div>
    </div>
  );
};