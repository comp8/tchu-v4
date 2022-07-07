import tmi from 'tmi.js';
import ChatStoreTypes from './types';

export function parseEmotes(message: string, emoteObj?: tmi.CommonUserstate['emotes']): ChatStoreTypes.ChatMessage {
  // if (emoteObj) {
  //   try {
  //     Object.keys(emoteObj).map(id => {
  //       emoteObj[id].map(item => {
  //         const [start, end] = item.split('-');
  //         return 
  //       })
  //     })
  //   }
  //   catch (err) {
  //     console.error('emotes parsing error', emoteObj);
  //   }
  // }

  return [message];
}