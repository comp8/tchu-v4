import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IUserData, IVoteItem, IVoteSession, RootState } from "../../store";
import UserName from "../UserName";
import SearchBar from "../SearchBar";
import StyledButton from "../StyledButton";

import style from './style.css';
import { testKeyword } from "../../common/utils";
import VoterCounter from "../VoterCounter";
import Config from "../../config";
import { useTranslation } from "react-i18next";

import { toast } from 'react-toastify';

interface VoterListProps {
  current: IVoteSession;
  selectedVoteItem: IVoteItem;
  className?: string;
}

console.warn('TODO: paging');
console.warn('TODO: limit item count');

export default function VoterList(props: VoterListProps) {

  const { current, selectedVoteItem } = props;

  const [keyword, setKeyword] = useState<string>('');
  const users = useSelector<RootState, Record<string, IUserData>>(state => state.users.data);

  const totalVoters = current?.voters ? Object.keys(current.voters)
    .map(uid => ({ id: uid, user: users?.[uid], search: 0 }))
    .filter(e => !!e.user) : [];

  const totalCount = totalVoters.length;

  const selectedVoters = totalVoters
    .filter(e => !selectedVoteItem || selectedVoteItem.id === e.user.votes?.[current.id]?.item_id)
    .sort((a, b) => current.voters[b.id].time - current.voters[a.id].time)
    .map(o => o.user);

  const selectedCount = selectedVoters.length;

  let userElements = selectedVoters;
  if (keyword) {
    console.time('keyword');
    const threshold = Math.max(Math.max(keyword.length - 1, keyword.length * 0.8), 1);
    userElements = userElements
      .map(e => ({ ...e, distance: testKeyword(keyword, [e.dname, e.uname]) }))
      .filter(e => e.distance <= threshold)
      .sort((a, b) => a.distance - b.distance);
    console.timeEnd('keyword');
  }

  const handleKeywordChange = useCallback((val: string) => {
    setKeyword(val.replace(/ /g, ''));
  }, []);

  const { t } = useTranslation();

  return (
    <div className={`${style.wrapper} ${props.className || ''}`}>
      <div className={style.header}>
        <VoterCounter current={selectedCount} total={totalCount} />
        <SearchBar value={keyword} onChange={handleKeywordChange} />
      </div>
      <div className={style.content}>
        <ul className='voter-list__users'>
          {
            keyword && userElements.length === 0 ? <p>{t('Search result: Not found')}</p> : null
          }
          {
            userElements?.map(({ id, color, dname, uname, subs, founder }) =>
              <li key={id}>
                <UserName {...{ color, dname, uname }} badges={{ subscriber: subs, founder }} />
              </li>)
          }
        </ul>
      </div>
      <div className={style.footer}>
        <StyledButton
          theme={{
            backColor: Config.style.defaultTheme["color-theme-1"],
            borderColor: Config.style.defaultTheme["color-theme-1"],
          }}
          effectOff
          style={{ color: 'white', flex: '1' }}
          onClick={() => toast('test', { autoClose: 3000 })}
        >
          <div className={style.rollBtn}>{t('Roll Button')}</div>
        </StyledButton>
      </div>
    </div>
  );
}