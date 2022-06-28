import React from "react";
import { TMIBadges, UserNamesInfo } from "../../common/Types";
import { Badges } from "../Badges";

export interface UserNameProps extends UserNamesInfo {
  badges: TMIBadges;
  color: string;
  className?: string;
  delimiter?: true;
}

export default function UserName(props: UserNameProps) {
  const { uname, dname, color, badges } = props;

  return (
    <span className={props.className}>
      <Badges badges={badges} />
      <span className='chat-name' style={{ color }}>
        <span className={'chat-name__display-name'}>{dname}</span>
        {
          uname != dname ? (
            <span className={'chat-name__login-name'}>({uname})</span>
          ) : null
        }
        {
          props.delimiter ? <span className='chat-name__delimiter'>:</span> : null
        }
      </span>
    </span>
  );
}