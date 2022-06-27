import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GAME_TYPES } from "../../common/Types";
import { generateShortId } from "../../common/utils";
import { IVoteSession, RootState } from "../../Store";
import Actions from "../../Store/actions";
import { VoteRules } from "./VoteUtils";

import style from './NewGame.css';
import StyledButton from "../Views/StyledButton";
import Config from "../../config";
import { useTranslation } from "react-i18next";

interface NewGameProps {
  className?: string;
}

export default function NewGame(props: NewGameProps) {

  const channel = useSelector<RootState, string>(state => state.channel.uname);
  const dispatch = useDispatch();

  const createNewGame = (gameType: GAME_TYPES, opt?: Partial<IVoteSession>) => {
    const newVoteId = generateShortId();
    const vote: IVoteSession = {
      channel,
      id: newVoteId,
      items: [],
      rule: VoteRules(gameType),
      voters: {},
      created_date: Date.now(),
      type: gameType,
      ...opt,
    };
    dispatch(Actions.Votes.Create({ vote }));
  };

  const handleClick_SimpleGame = useCallback(() => {
    createNewGame('SIMPLE_GAME', { items: [{ id: generateShortId(), title: 'simple' }] });
  }, []);

  const handleClick_NumberGame = useCallback(() => {
    createNewGame('NUMBER_GAME');
  }, []);

  const { t } = useTranslation();

  return (
    <div className={`${style.wrapper} ${props.className || ''}`}>
      <ul className={style.gameList}>
        <li>
          <StyledButton
            borderColor={Config.style.defaultTheme["color-theme"]}
            backColor={Config.style.defaultTheme["color-back-1"]}
            foreColor={Config.style.defaultTheme["color-theme"]}
            hoverEffect="invert"
            onClick={handleClick_SimpleGame}
          >
            <span className={style.btn}><span className="icon-gift"></span><span className={style.btnText}>{t('mode_simpleGame')}</span></span>
          </StyledButton>
        </li>
        <li>
          <StyledButton
            borderColor={Config.style.defaultTheme["color-theme"]}
            backColor={Config.style.defaultTheme["color-back-1"]}
            foreColor={Config.style.defaultTheme["color-theme"]}
            hoverEffect="invert"
            onClick={handleClick_NumberGame}
          >
            <span className={style.btn}><span className="icon-number"></span><span className={style.btnText}>{t('mode_numberGame')}</span></span>
          </StyledButton>
        </li>
      </ul>
      <ul className={style.desc}>
        <li>
          <h3 className={style.descTitle}>
            {t('mode_simpleGame')}
          </h3>
          <p className={style.descText}>
            {t('mode_desc_simpleGame')}
          </p>
        </li>
        <li>
          <h3 className={style.descTitle}>
            {t('mode_numberGame')}
          </h3>
          {
            t('mode_desc_numberGame').split('\n').map(str => <p className={style.descText}>{str}</p>)
          }
          <p className={style.descText}>
            <code>{t('voteKeyword')}</code>
          </p>
        </li>
      </ul>
    </div>
  );
}