import React from "react";
import { TMIBadges } from "../../common/Types";
import { Badge } from "../Badge";

export function Badges({ badges }: { badges: TMIBadges }) {

  return (
    <span className={'badges-wrapper'}>
      {
        badges ? (
          Object.keys(badges).map(key => <Badge key={key} badgeId={key} version={badges[key]} />)
        ) : null
      }
    </span>
  );
}
