import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchUsers, fetchUsersFollows } from "../TwitchApi";

export interface IViewerInfo {
  userId: string;
  profileImage: string;
  followed_at: Date;
}
export function useTwitchViewer(userId: string, deps: React.DependencyList = []): IViewerInfo {

  const [info, setInfo] = useState<IViewerInfo>(null);
  const { access_token, channel_uid } = useSelector<RootState, {
    access_token: string; channel_uid: string;
  }>(state => ({ access_token: state.channel.token, channel_uid: state.channel.uid }));

  useLayoutEffect(() => {

    fetchUsers({ access_token: access_token, ids: [userId] })
      .then((r) => {
        if (r?.data?.[0]?.id === userId) {
          const user = r.data[0];
          const { profile_image_url } = user;

          fetchUsersFollows({ from_id: userId, to_id: channel_uid, access_token: access_token })
            .then(r => {
              if (r?.data?.[0]?.from_id === userId) {
                const followData = r.data[0];
                const followed_at = new Date(followData.followed_at);
                setInfo({ userId, followed_at, profileImage: profile_image_url });
              }
            })
        }
      })
  }, [access_token, userId, channel_uid, ...deps]);

  return info;
}