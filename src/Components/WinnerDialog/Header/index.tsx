import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useTwitchViewer } from "../../../hooks/useTwitchViewer";
import { RootState } from "../../../store";
import { fetchUsers, fetchUsersFollows } from "../../../TwitchApi";
import { Badge } from "../../Badge";
import UserName from "../../UserName";

export interface IWinnerInfo {
  _uuid: string;
  badge: { id: string; version: string; };
  displayName: string;
  userName: string;
  userId: string;
}

interface Props {
  winnerInfo: IWinnerInfo;
}

export default function Header(props: Props) {

  const { winnerInfo } = props;

  return (
    <div>
      <span>
        {
          winnerInfo.badge ? (
            <Badge badgeId={winnerInfo.badge.id} version={winnerInfo.badge.version} />
          ) : null
        }
        <span>{winnerInfo.displayName}</span>
      </span>
      <span>{winnerInfo.userName}</span>
      <span>{winnerInfo.userId}</span>
    </div>
  )
}