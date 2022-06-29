import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Config from "../../config";

import style from './style.css';
import { useLogout } from "../../hooks/useLogout";
import StyledButton from "../StyledButton_new";

interface Props {
  className?: string;
  displayName?: string;
  userName?: string;
  profileImage?: string;
}

export default function ChannelHeader(props: Props) {
  const displayName = props.displayName || '';
  const userName = props.userName || '';
  const profileImage = props.profileImage || Config.Twitch.profile_fallback;

  const logout = useLogout();

  const { t } = useTranslation();

  return (
    <header className={`${props.className} ${style.wrapper}`}>
      <StyledButton
        theme={{
          backColor: 'transparent',
          borderColor: 'transparent'
        }}
        className={style.channelBtn}
        effectOff
        Link={{ to: '/app', replace: true }}
      >
        <div className={style.channelInfo}>
          <span className={style.profileWrapper} >
            <img className={style.profile} src={profileImage} alt={`${displayName} profile image`} />
          </span>
          <span className={style.displayName}>{displayName}</span>
          {
            displayName !== userName ? (
              <span className={style.userName}>{userName}</span>
            ) : null
          }
        </div>
      </StyledButton>
      <StyledButton
        theme={{
          backColor: 'transparent',
          borderColor: 'transparent',
        }}
        className={style.logoutBtn}
        effectOff
        onClick={logout}
      >
        <span className={style.logoutBtnText}>{t('Logout')}</span>
      </StyledButton>
    </header>
  );
}