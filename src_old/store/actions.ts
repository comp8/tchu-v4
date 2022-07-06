import { createAction } from "@reduxjs/toolkit";
import { ChatItem } from "../common/Types";
import { BadgeSets } from "../TwitchApi";
import { IChannelState, IVoteSession } from "./types";

namespace Actions {

  export module Votes {
    export const Create = createAction<{ vote: IVoteSession }>('Votes/Create');
    export const Update = createAction<{ vote: Partial<IVoteSession> }>('Votes/Update');
    export const Append = createAction<{ idx: number; chat: ChatItem }>('Votes/Append');
    export const Close = createAction<void>('Votes/Close');
    export const Clear = createAction<void>('Votes/Clear');
  };

  export module Chats {
    export const Append = createAction<{ chat: ChatItem }>('Chats/Append');
    export const Clear = createAction<void>('Chats/Clear');
  };

  export module Users {
    export const Update = createAction<{ chat: ChatItem }>('Users/Update');
    export const Clear = createAction<void>('Users/Clear');
  };

  export module Channel {
    export const Update = createAction<{ data: IChannelState }>('Channel/Update');
    export const Logout = createAction<{ data: IChannelState }>('Channel/Logout');
  }
}

export default Actions;