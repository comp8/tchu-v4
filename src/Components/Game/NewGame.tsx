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
            <span className={style.btn}><span className="icon-gift"></span><span className={style.btnText}>간편 추첨</span></span>
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
            <span className={style.btn}><span className="icon-number"></span><span className={style.btnText}>숫자 투표</span></span>
          </StyledButton>
        </li>
      </ul>
      <ul className={style.desc}>
        <li>
          <h3 className={style.descTitle}>
            {'간편 추첨'}
          </h3>
          <p className={style.descText}>
            {'채팅에 참여하는 모든 시청자를 대상으로 추첨합니다.'}
          </p>
        </li>
        <li>
          <h3 className={style.descTitle}>
            {'숫자 투표'}
          </h3>
          <p className={style.descText}>
            {'채팅을 통해 투표를 진행합니다.'}
          </p>
          <p className={style.descText}>
            {'특정 선택지를 고른 시청자들을 대상으로 추첨할 수 있습니다.'}
          </p>
          <p className={style.descText}>
            {'시청자 참여방법: 채팅창에 '}
            <code>{'!투표 (숫자)'}</code>
          </p>
        </li>
      </ul>
    </div>
  );
}