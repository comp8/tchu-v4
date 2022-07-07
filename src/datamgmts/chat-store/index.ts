export * from './types';
export * from './parseEmotes';

import ChatStoreTypes from './types';

export class ChatStore {
  private max: number = Infinity;
  public chats: ChatStoreTypes.Chat[] = [];

  constructor(max: number) {
    this.max = max > 0 ? max : 1;
    this.chats = [];
  }

  public append(chat: ChatStoreTypes.Chat) {
    if (!chat) return;
    if (this.chats.length >= this.max) {
      this.chats = this.chats.slice(-this.max + 1);
    }
    this.chats.push(chat);
  }

  public clear() {
    this.chats = [];
  }

  public destroy() {
    this.clear();
  }

  get lastId() {
    return this.chats.length > 0 ? this.chats[this.chats.length - 1].id : null;
  }

  get consumer(): Readonly<{ chats: ReadonlyArray<ChatStoreTypes.Chat>, lastId: Readonly<string> }> {
    const self = this;
    return {
      get chats() {
        return self.chats;
      },
      get lastId() {
        return self.lastId;
      },
    }
  }
}
