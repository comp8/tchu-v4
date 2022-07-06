import { createContext } from "react";

type ChannelId = string;
type ChannelName = string;
type DisplayName = string;

interface BadgeSet {
  [id: string]: {
    [version: string]: any;
  }
}

interface IChannelContext {
  id: ChannelId;
  uname: ChannelName;
  dname: DisplayName;
  badges: BadgeSet;
}

export const ChannelContext = createContext<IChannelContext>({
  id: null, uname: null, dname: null, badges: {}
});