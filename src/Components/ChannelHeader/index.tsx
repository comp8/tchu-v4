import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Config from "../../config";

import style from './style.css';
import { useLogout } from "../../hooks/useLogout";
import StyledButton from "../StyledButton";

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
  const navigate = useNavigate();
  const logout = useLogout();

  const handleClickChannel = () => {
    navigate(`/app`, { replace: true });
  };

  const handleClickLogout = () => logout();

  const { t } = useTranslation();

  return (
    <header className={`${props.className} ${style.wrapper}`}>
      <StyledButton
        className={style.channelBtn}
        foreColor={Config.style.defaultTheme["color-black"]}
        backColor={Config.style.defaultTheme["color-back-1"]}
        borderColor={'transparent'}
        hoverEffect='zoom'
        onClick={handleClickChannel}
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
        backColor="transparent"
        foreColor={Config.style.defaultTheme["color-gray-light"]}
        borderColor="transparent"
        hoverEffect="normal"
        onClick={handleClickLogout}
      >
        <div className={style.logoutBtn}>{t('Logout')}</div>
      </StyledButton>
    </header>
  );
}