declare type DeepReadonly<T> = { readonly [key in keyof T]: DeepReadonly<T[key]> };
declare type DeepMutable<T> = { -readonly [key in keyof T]: DeepMutable<T[key]> };
declare type DeepKeepMutable<T, K extends keyof T> = DeepReadonly<Omit<T, K>> & DeepMutable<Pick<T, K>>;

declare type Predicate<T> = (arg0: T) => boolean;


type VoteType = 'simple' | 'number';
type VoteState = 'ready' | 'open' | 'closed';


interface Winner {
  _uuid: string;
  vid: string;
  uid: string;
  uname: string;
  dname: string;
  badge?: [id: string, version: string];
}

type SubscriberBadgeId = 'founder' | 'subscriber';