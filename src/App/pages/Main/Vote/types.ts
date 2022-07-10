interface Vote {
  id: string;
  type: VoteType;
  state: VoteState;
  items: VoteItem[];
  start?: number;
  end?: number;
}

interface VoteItem {
  id: string;
  title: string;
  predicate: Predicate<string>;
}
