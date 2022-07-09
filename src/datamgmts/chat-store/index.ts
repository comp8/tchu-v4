export * from './types';
export * from './parseEmotes';

import ChatStoreTypes from './types';

type Callback = (store: ChatStore) => void;

export class ChatStore {
  private _max: number = Infinity;
  private _chats: ChatStoreTypes.Chat[] = [];
  private _callbacks: Callback[] = [];

  constructor(max: number) {
    this._max = max > 0 ? max : 1;
    this._chats = [];
  }

  private notify() {
    this._callbacks.forEach(fn => fn(this));
  }

  public append(chat: ChatStoreTypes.Chat) {
    if (!chat) return;
    if (this._chats.length >= this._max) {
      this._chats = this._chats.slice(-this._max + 1);
    }
    this._chats.push(chat);
    this.notify();
  }
  
  public clear() {
    this._chats = [];
    this.notify();
  }
  
  public destroy() {
    this.clear();
  }

  public subscribe(listener: Callback) {
    this._callbacks.push(listener);
  }

  public unsubscribe(listener: Callback) {
    const idx = this._callbacks.indexOf(listener);
    idx >= 0 && this._callbacks.splice(idx, 1);
  }

  get chats(): DeepReadonly<ChatStoreTypes.Chat[]> {
    return this._chats;
  }
  get last(): DeepReadonly<ChatStoreTypes.Chat> {
    return this._chats.length > 0 ? this._chats[this._chats.length - 1] : null;
  }
  get lastId(): string {
    return this.last?.id;
  }
}
