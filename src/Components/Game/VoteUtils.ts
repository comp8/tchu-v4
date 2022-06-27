
import { GAME_TYPES } from '../../common/Types';
import Config from '../../config';
import { IVoteSession } from '../../Store';

export function voteTest(rules: string[] | string, message: string): number {
  if (typeof rules === 'string') {
    rules = [rules];
  }
  const n = rules.map(rule => {
    const match = new RegExp(rule).exec(message);
    if (match) {
      if (match[1]) {
        return parseInt(match[1]) - 1;
      }
      return 0;
    }
    return -1;
  }).filter(e => e >= 0).pop();
  return typeof n === 'number' ? n : -1;
}

export function voteIsReady(vote: IVoteSession): boolean {
  if (!vote) return false;
  const { start_date, end_date, items } = vote;
  return !start_date && !end_date;
}

export function voteIsOpen(vote: IVoteSession): boolean {
  if (!vote) return false;
  const { start_date, end_date } = vote;
  const now = Date.now();
  return !!start_date && start_date < now && (!end_date || now < end_date);
}

export function VoteRules(gameType: GAME_TYPES): string[] {
  if (gameType === 'SIMPLE_GAME') {
    return Config.VOTE_RULES.SIMPLE_GAME;
  }

  if (gameType === 'NUMBER_GAME') {
    return Config.VOTE_RULES.NUMBER_GAME;
  }

  console.warn('wrong game_type', gameType);
  return [];
}