import React from "react";
import { Badges } from "../../../../../components/Badges";
import ChatStoreTypes from "../../../../../datamgmts/chat-store/types";
import { useChatStore } from "../../../../../datamgmts/contexts";
import { v4 as uuidv4 } from 'uuid';
import { Badges as TMIBadges } from "tmi.js";

const MAX_CANDIDATES = 5000;

function getSubscriberBadge(badges: TMIBadges): [SubscriberBadgeId, string] | null {
  if (!badges) return null;
  if (badges.founder) return ['founder', badges.founder];
  if (badges.subscriber) return ['subscriber', badges.subscriber];
  return null;
}

function selectRandom<T = any>(inputArray: DeepReadonly<T[]>, max: number): T[] {
  const arr = [...inputArray] as T[];
  const result: T[] = [];
  while (arr.length > 0 && result.length < max) {
    const idx = Math.random() * arr.length | 0;
    const item = arr.splice(idx, 1)[0];
    result.push(item);
  }
  return result;
}

export interface Candidate {
  badge?: [id: string, version: string];
  dname: string;
  uname: string;
  uid: string;
}

interface Props {
  chats: DeepReadonly<ChatStoreTypes.Chat[]>;
  onRoll(candidates: Candidate[]): void;
}

export default function ViewerListPanel(props: Props) {
  const { chats, onRoll } = props;

  const roll = () => {
    if (chats?.length <= 0) {
      // alert
      console.log('no target');
    }
    else {
      const candidates: Candidate[] = selectRandom(chats, MAX_CANDIDATES).map(({ u: user }) => ({
        badge: getSubscriberBadge(user.b),
        dname: user.d,
        uname: user.n,
        uid: user.id,
      }));
      onRoll(candidates);
    }
  }

  return (
    <div>
      <header></header>
      <ul>
        {
          chats?.map(c => {
            return (c?.u &&
              <li key={c.u.id}>
                <Badges data={c.u.b} />
                <span>{c.u.n}</span>
              </li>
            )
          })
        }
      </ul>
      <footer>
        <button onClick={roll}>Roll</button>
      </footer>
    </div>
  );
}
