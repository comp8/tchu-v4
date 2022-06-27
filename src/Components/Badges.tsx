import React, { useContext } from "react";
import { TMIBadges } from "../common/Types";
import BadgeContext from "../Contexts/BadgeContext";

import style from './Badge.css';

interface BadgeProps {
  badgeId: string;
  version: string;
}

function Badge({ badgeId, version }: BadgeProps) {
  
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

export function Badges({ badges }: { badges: TMIBadges }) {

  return (
    <span className={style.badgeArray}>
      {
        badges ? (
          Object.keys(badges).map(key => <Badge key={key} badgeId={key} version={badges[key]} />)
        ) : null
      }
    </span>
  );
}
