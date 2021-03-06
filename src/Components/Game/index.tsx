import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IVoteItem, IVotesState, RootState } from "../../store";
import VoterList from "../VoterList";
import NewGame from "../NewGame";
import VoteControlPanel from "../VoteControlPanel";

import style from './style.css';
import StyledButton from "../StyledButton_new";
import Config from "../../config";
import { useDispatch } from "react-redux";
import Actions from "../../store/actions";
import { useTranslation } from "react-i18next";

interface GameProps {
  className?: string;
}

export default function Game(props: GameProps) {

  const dispatch = useDispatch();
  const { current } = useSelector<RootState, IVotesState>(state => state.votes);

  const [selectedVoteItem, selectVoteItem] = useState<IVoteItem>();

  const handleSelectVoteItem = useCallback((voteItemId: string) => {
    selectVoteItem(current?.items?.find(item => item.id === voteItemId));
  }, [current]);

  const handleClick_Home = useCallback(() => {
    dispatch(Actions.Votes.Clear());
  }, []);

  const { t } = useTranslation();

  return (
    <div className={`${props.className} ${style.wrapper}`}>
      <VoterList className={style.leftPanel} {...{ current, selectedVoteItem }} />
      <div className={style.rightPanel}>
        <nav className={style.navBar}>
          <StyledButton
            theme={{
              backColor: Config.style.defaultTheme["color-back-1"],
              borderColor: 'transparent',
            }}
            onClick={handleClick_Home}
          >
            <span className={style.btnHome}>
              <span className="icon-home"></span>
              <span>{t('Home')}</span>
            </span>
          </StyledButton>
        </nav>
        {
          current ? <VoteControlPanel onSelectVoteItem={handleSelectVoteItem} /> : <NewGame />
        }
      </div>
    </div>
  );
}
