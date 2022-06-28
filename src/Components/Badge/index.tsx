import React, { useContext } from "react";
import BadgeContext from "../../contexts/Badge";

import style from './style.css';

interface BadgeProps {
  badgeId: string;
  version: string;
}

export function Badge({ badgeId, version }: BadgeProps) {
  
  const badgeSets = useContext(BadgeContext);

  const url = badgeSets?.[badgeId]?.versions?.[version]?.image_url_1x;

  return (
    url ? (
      <span className={style.wrapper}>
        <img className={style.badge} src={url} />
      </span>
    ) : null
  );
}
