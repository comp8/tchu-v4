import tmi from 'tmi.js';

export type Emotes = { [emoteid: string]: string[] };

export type TMIChatUserState = tmi.ChatUserstate;

export interface ChatItem {
  channel: string;
  userstate: tmi.ChatUserstate;
  message: string;
}

export type VOTEITEM_ID = string;
export type VOTE_ID = string;
export type USER_ID = string;
export type ROOM_ID = string;

export type GAME_TYPES = 'SIMPLE_GAME'|'NUMBER_GAME';

export interface UserNamesInfo {
  dname: string;
  uname: string;
}

export type OnChatListener = (channel: string, userstate: tmi.ChatUserstate, message: string, self: boolean) => void;

export type TMIBadges = tmi.Badges;