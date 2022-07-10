import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useChatStore } from "../../../../../datamgmts/contexts";
import { useToggle } from "../../../../../hooks/useToggle";


interface ItemProps {
  data: VoteItem;
  checked: boolean;
  onClick: () => void;
}
function Item(props: ItemProps) {
  const { checked, data, onClick } = props;
  return <li onClick={onClick}>{checked ? 'o' : 'x'} {data?.title}</li>;
}

interface Props {
  vote: Vote;
  selectedItems: Set<string>;
  onSelect: (ids: Set<string>) => void;
}
export default function ResultPanel(props: Props) {
  const { vote, onSelect, selectedItems } = props;

  useEffect(() => {
    if (vote?.type === 'simple') {
      // select all
      onSelect?.(new Set(vote.items.map(e => e.id)));
    }
  }, [vote, vote?.id]);

  const toggle = (voteItemId: string) => {
    if (selectedItems.has(voteItemId)) {
      selectedItems.delete(voteItemId);
    }
    else {
      selectedItems.add(voteItemId);
    }
    onSelect?.(selectedItems);
  }

  return (
    <div>
      {
        vote?.items &&
        <>
          {/* <DeselectAll /> */}
          <ul>
            {
              vote.items.map(item => <Item
                key={item.id}
                data={item}
                checked={selectedItems.has(item.id)}
                onClick={useCallback(() => { toggle(item.id) }, [item.id])}
              />)
            }
          </ul>
        </>
      }
    </div>
  )
}