import { ChatItem as IChatItem, GAME_TYPES, USER_ID, VOTEITEM_ID, VOTE_ID } from "../common/Types";
import { BadgeSets as IBadgeSets } from "../TwitchApi/badges";

export interface IChannelState {
  dname?: string;
  uname?: string;
  uid?: string;
  token?: string;
}

export interface IBadgesState {
  badge_sets?: IBadgeSets;
}

export type IUserData = {
  id: string;
  subs: string | null;
  founder: string | null;
  color: string;
  dname: string;
  uname: string;
  last: {
    emotes?: Record<string, string[]>;
    msg: string;
    time: number;
  };
  votes: {
    [vote_id: string]: {
      item_id: string;
      msg: string;
      time: number;
    };
  };
};

export interface IUsersState {
  data: Record<USER_ID, IUserData>;
}

export type IVoteItem = {
  id: string;
  title: string;
}

export interface IVoteSession {
  channel: string;
  id: VOTE_ID;
  type: GAME_TYPES;
  rule: string[];
  items: IVoteItem[];
  created_date: number;
  start_date?: number;
  end_date?: number;
  voters: {
    [userId: USER_ID]: {
      subs: string | null;
      founder: string | null;
      uid: USER_ID;
      uname: string;
      dname: string;
      to: VOTEITEM_ID;
      msg: string;
      time: number;
    }
  }
}

export interface IVotesState {
  current: IVoteSession;
}

export interface IChatsState {
  items: IChatItem[];
}
