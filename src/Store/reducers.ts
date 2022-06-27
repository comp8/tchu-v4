import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { IChannelState, IChatsState, IUserData, IUsersState, IVotesState } from "./types";
import { arbitraryColor } from "../common/utils";
import Actions from './actions';
import Config from "../config";

export const usersReducer = createReducer<IUsersState>({
  data: {}
}, builder => {
  return builder
    .addCase(Actions.Users.Update, (state, action) => {
      const { chat } = action.payload;
      const { userstate, message } = chat;

      const users = state.data || {};
      const user = users[userstate["user-id"]] || {
        id: userstate["user-id"],
        subs: userstate.badges?.subscriber,
        founder: userstate.badges?.founder,
        color: userstate.color || arbitraryColor(userstate["user-id"]),
        dname: userstate["display-name"],
        uname: userstate.username,
        votes: {}
      } as IUserData;

      user.last = { msg: message, time: Date.now() };

      users[userstate["user-id"]] = user;
      state.data = users;
    })
    .addCase(Actions.Users.Clear, (state, action) => {
      state.data = {};
    })
});

export const votesReducer = createReducer<IVotesState>({
  current: null
}, builder => {
  return builder
    .addCase(Actions.Votes.Create, (state, action) => {
      if (state.current) {
        // backup ?
        state.current = null;
      }
      const vote = action.payload.vote;
      console.assert(!!vote, 'CREATE_VOTE: no data');
      state.current = vote;
    })
    .addCase(Actions.Votes.Update, (state, action) => {
      const vote = action.payload.vote;
      console.assert(!!state.current, 'UPDATE_VOTE: no current-vote');
      console.assert(!!vote, 'UPDATE_VOTE: no data');
      state.current = { ...state.current, ...vote };
    })
    .addCase(Actions.Votes.Append, (state, action) => {
      const { idx, chat } = action.payload;
      const userId = chat.userstate["user-id"];
      if (0 <= idx && idx < state.current?.items?.length) {
        const voteItem = state.current.items[idx];
        state.current.voters[userId] = {
          dname: chat.userstate["display-name"],
          uname: chat.userstate.username,
          subs: chat.userstate.badges?.subscriber,
          founder: chat.userstate.badges?.founder,
          uid: userId, to: voteItem.id, msg: chat.message, time: Date.now()
        };
      }
    })
    .addCase(Actions.Votes.Close, (state, action) => {
      if (state.current) {
        // backup ?
        state.current.end_date = state.current.end_date || Date.now();
      }
    })
    .addCase(Actions.Votes.Clear, (state, action) => {
      state.current = null;
    })
});

export const chatsReducer = createReducer<IChatsState>({
  items: []
}, builder => {
  return builder
    .addCase(Actions.Chats.Append, (state, action) => {
      const { chat } = action.payload;
      chat && (state.items = [...state.items.slice(-Config.MAX_CHATS_IN_MEMORY + 1), chat]);
    })
    .addCase(Actions.Chats.Clear, (state, action) => {
      state.items = [];
    })
});

export const channelReducer = createReducer<IChannelState>({
  dname: null, uid: null, uname: null
}, builder => {
  return builder
    .addCase(Actions.Channel.Update, (state, action) => {
      return action.payload.data;
    })
    .addCase(Actions.Channel.Logout, (state, action) => {
      return { dname: null, token: null, uid: null, uname: null };
    })
})

const reducers = combineReducers({
  votes: votesReducer,
  users: usersReducer,
  chats: chatsReducer,
  channel: channelReducer,
});

export default reducers;