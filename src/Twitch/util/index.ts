import { Badges } from "tmi.js";

export function isSubscriber(b: Badges) {
  return b.subscriber || b.founder;
}