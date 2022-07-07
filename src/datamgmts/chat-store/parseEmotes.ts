import tmi from 'tmi.js';
import ChatStoreTypes from './types';

export function parseEmotes(message: string, emoteObj?: tmi.CommonUserstate['emotes']): ChatStoreTypes.ChatMessage {
  if (!emoteObj) {
    return [message];
  }

  const result: ChatStoreTypes.ChatMessage = [];

  Object.keys(emoteObj)
    .map(id => emoteObj[id].map(item => {
      const [start, end] = item.split('-').map(e => parseInt(e));
      return { start, end, id };
    }))
    .flat()
    .sort((a, b) => a.start - b.end)
    .reduce((prevIndex, emote) => {
      if (prevIndex != emote.start)
        result.push(message.slice(prevIndex, emote.start));
      result.push({ id: emote.id });
      return emote.end + 1;
    }, 0);

  return result;
}