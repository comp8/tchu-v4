import React, { useCallback, useState } from "react";
import { useChatStore } from "../../../../datamgmts/contexts";
import ControlPanel from "./ControlPanel";
import IntroPanel from "./IntroPanel";
import ResultPanel from "./ResultPanel";
import ViewerListPanel, { Candidate } from "./ViewerListPanel";
import { v4 as uuidv4 } from 'uuid';
import WinnerDialog from "./WinnerDialog";

const cloneVote = (vote: Vote): Vote => ({
  ...vote, items: [...vote.items]
});

interface RollData {
  _uuid: string;
  candidates: Candidate[];
}

export default function VoteComponent() {
  const [vote, setVote] = useState<Vote>();
  const [selectedVoteItems, selectVoteItems] = useState<Set<string>>(new Set());
  const [rollData, setRollData] = useState<RollData>();

  const { store } = useChatStore();

  const handleRoll = useCallback((candidates: Candidate[]) => {
    setRollData(candidates?.length >= 0 ? { _uuid: uuidv4(), candidates } : null);
  }, [setRollData]);

  let content: React.ReactElement = null;

  switch (vote?.state) {
    case 'closed':
      content = <ResultPanel vote={vote} selectedItems={selectedVoteItems} onSelect={(selected) => selectVoteItems(new Set(selected))} />;
      break;
    case 'ready':
    case 'open':
      content = <ControlPanel vote={vote} onChange={(vote) => setVote(cloneVote(vote))} />;
      break;
    default: // no vote
      content = <IntroPanel onCreate={(vote) => setVote(cloneVote(vote))} />;
      break;
  }

  return (
    <div>
      <ViewerListPanel chats={store?.chats} onRoll={handleRoll} />
      {content}
      {
        rollData?._uuid && rollData.candidates?.length &&
        <WinnerDialog key={rollData._uuid} candidates={rollData.candidates} />
      }
    </div>
  )
}