import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAnimTime01 } from "../../hooks/useAnimTime01";
import { useFSM } from "../../hooks/useFSM";
import { useTwitchViewer } from "../../hooks/useTwitchViewer";
import Dialog from "../Dialog";
import Conversation from "./Conversation";
import Header from "./Header";

import style from './style.css';

import { IWinnerInfo } from './Header';
export { IWinnerInfo } from './Header';

interface Props {
  winnerInfo: IWinnerInfo;
  onClosed: () => void;
}

export function WinnerDialog(props: Props) {

  const viewerInfo = useTwitchViewer(props?.winnerInfo?.userId);

  const { t } = useAnimTime01({ duration: 1000 });

  const [isClosing, setCloseThis] = useState<boolean>(false);

  const { current, requestNext } = useFSM('rollStart', {
    rollStart: [{ to: 'rollEnded', test: () => t > 0.5 }],
    rollEnded: [{ to: 'idle', test: () => t >= 1 }],
    idle: [{ to: 'closing', test: () => isClosing }],
    closing: [{ to: 'closed', test: () => true }],
    closed: [],
  });

  useLayoutEffect(() => { requestNext(); });

  const handleClose = () => {
    if (current === 'idle') {
      setCloseThis(true);
    }
  }

  return (
    current !== 'closed' ? (
      <Dialog className={style.dialog}>
        <div>{current}</div>
        <button onClick={handleClose}>X</button>
        <Header {...props} />
        <Conversation profileImage={viewerInfo?.profileImage} userId={viewerInfo?.userId} />
      </Dialog>
    ) : null
  )
}