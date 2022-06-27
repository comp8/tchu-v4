import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IVoteItem, IVotesState, RootState } from "../../Store";
import VoterList from "../VoterList";
import NewGame from "./NewGame";
import VoteControlPanel from "../Views/VoteControlPanel";

import style from './Game.css';
import StyledButton from "../Views/StyledButton";
import Config from "../../config";
import { useDispatch } from "react-redux";
import Actions from "../../Store/actions";
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

  const {t} = useTranslation();

  return (
    <div className={`${props.className} ${style.wrapper}`}>
      <VoterList className={style.leftPanel} {...{ current, selectedVoteItem }} />
      <div className={style.rightPanel}>
        <nav className={style.navBar}>
          <StyledButton
          backColor={Config.style.defaultTheme["color-back-1"]}
          foreColor={Config.style.defaultTheme["color-gray-dark"]}
          borderColor='transparent'
          hoverEffect='normal'
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
