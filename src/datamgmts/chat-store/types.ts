namespace ChatStoreTypes {
  export type BadgeId = string;
  export type BadgeVersion = string;

  export type EmoteId = string;

  export type UserId = string;
  export type UserName = string;
  export type DisplayName = string;
  export type ChatId = string;
  export type Timestamp = number;

  export type EmoteFragment = { id: EmoteId; };
  export type TextFragment = string;
  export type ChatMessage = (EmoteFragment | TextFragment)[];

  export interface Badge {
    id: BadgeId;
    v: BadgeVersion;
  }

  export interface User {
    id: UserId;
    n: UserName;
    d: DisplayName;
    b?: Badge[];
  }

  export interface Chat {
    id: ChatId;
    u: User;
    m: ChatMessage;
    t: Timestamp;
  }
}
export default ChatStoreTypes;