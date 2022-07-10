import React from "react";
import { Badges as TMIBadges } from "tmi.js";
import { useChannelInfo } from "../../datamgmts/contexts";

interface Props {
  data?: TMIBadges;
  subsOnly?: true;
}

export function Badges(props: Props) {
  const { badges: badgeSets } = useChannelInfo();
  const { data, subsOnly } = props;

  return data && (
    <span>
      {
        Object.keys(data).map((id) => {
          const version = data[id];
          const item = badgeSets[id].versions[version];
          if (item && (subsOnly !== true || (id === 'subscriber' || id === 'founder'))) {
            return (
              <span>
                <img key={id}
                  title={item.description}
                  alt={item.title}
                  src={item.image_url_1x}
                  srcSet={`${item.image_url_1x} 1x, ${item.image_url_2x} 2x, ${item.image_url_4x} 4x`}
                />
              </span>
            );
          }
          return null;
        })
      }
    </span>
  );
}