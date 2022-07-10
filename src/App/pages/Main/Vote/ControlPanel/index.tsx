import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const commandPrefix = '!';
const voteKeywords = ['투표', 'vote'];

function startNumberVote(vote: Vote): Vote {
  for (let i = 0; i < vote.items.length; ++i) {
    const regs = voteKeywords.map(keyword => new RegExp(`^ *${commandPrefix}${keyword} *(${i + 1}) *$`, 'i'));
    vote.items[i].predicate = (msg) => regs.some(r => r.test(msg));
  }
  return vote;
}
function startVote(vote: Vote): Vote {
  vote.start = Date.now();
  vote.state = 'open';
  if (vote.type === 'number') {
    return startNumberVote(vote);
  }
  return vote;
}

interface ItemProps {
  data: VoteItem;
  editable: boolean;
  onChange: (value: string) => void;
}
function Item(props: ItemProps) {
  const { data, editable, onChange } = props;
  // const [value, setValue] = useState<string>(props.data.title);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    // setValue(value);
    onChange?.(value);
  }, [onChange]);

  return (
    <li>
      {
        editable ? (
          <input type={'text'} placeholder={data.id} value={data.title} onChange={handleChange} />
        ) : (
          <span>{data.id}:{data.title}</span>
        )
      }
    </li>
  );
}

interface Props {
  vote: Vote;
  onChange: (vote: Vote) => void;
}
export default function ControlPanel(props: Props) {

  const { vote, onChange } = props;

  const createVoteItem = () => {
    if (vote?.state !== 'ready') {
      return;
    }
    vote.items.push({
      id: uuidv4(),
      predicate: null,
      title: '',
    });
    onChange?.(vote);
  }

  const handleClick_Start = useCallback(() => {
    if (vote?.state !== 'ready') {
      // already started or terminated
      return;
    }
    if (vote.items.length <= 0) {
      // no item
      return;
    }
    onChange?.(startVote(vote));
  }, [vote, onChange]);

  const handleClick_Stop = useCallback(() => {
    if (vote?.state !== 'open') {
      // ?
      return;
    }
    vote.state = 'closed';
    vote.end = Date.now();
    onChange?.(vote);
  }, [vote, onChange]);

  const handleChangeItem = useCallback((id: string, title: string) => {
    if (vote?.state !== 'ready') {
      return;
    }
    const idx = vote.items?.findIndex(item => item.id === id);
    if (idx >= 0) {
      vote.items[idx].title = title;
      onChange?.(vote);
    }
  }, [vote, onChange]);

  const editable: boolean = vote?.state === 'ready';

  return (
    <div>
      {
        process.env.NODE_ENV === 'development' && vote && <>
          <button onClick={handleClick_Start}>Start</button>
          <button onClick={handleClick_Stop}>Stop</button>
          <span>id: {vote.id}</span>
          <span>mode: {vote.type}</span>
          <span>state: {vote.state}</span>
          {
            vote.items?.length > 0 ? (
              <ul>
                {
                  vote.items.map(item =>
                    <Item
                      key={item.id}
                      data={item}
                      editable={editable}
                      onChange={(title) => handleChangeItem(item.id, title)}
                    />)
                }
              </ul>
            ) : (
              <p>no item</p>
            )
          }
          <button onClick={createVoteItem}>+</button>
        </>
      }
    </div>
  )
}