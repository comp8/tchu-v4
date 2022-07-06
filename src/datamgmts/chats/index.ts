import { useLayoutEffect } from "react";
import { Database } from "./implements";

type BadgeId = string;
type BadgeVersion = string;

type EmoteId = string;

type UserId = string;
type UserName = string;
type DisplayName = string;
type ChatId = string;
type Timestamp = number;

type EmoteFragment = { id: EmoteId; };
type TextFragment = string;
type ChatMessage = (EmoteFragment | TextFragment)[];

interface Badge {
  id: BadgeId;
  v: BadgeVersion;
}

interface User {
  id: UserId;
  n: UserName;
  d: DisplayName;
  b?: Badge[];
}

interface Chat {
  id: ChatId;
  u: User;
  m: ChatMessage;
  t: Timestamp;
}

class ChatDatabase {
  private max: number = Infinity;
  public chats: Chat[] = [];

  constructor(max: number) {
    this.max = max > 0 ? max : 1;
    this.chats = [];
  }

  public append(chat: Chat) {
    if (!chat) return;
    if (this.chats.length >= this.max) {
      this.chats = this.chats.slice(-this.max + 1);
    }
    this.chats.push(chat);
  }

  public clear() {
    this.chats = [];
  }

  get lastId() {
    return this.chats.length > 0 ? this.chats[this.chats.length - 1].id : null;
  }
}
