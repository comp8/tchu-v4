import React, {  } from 'react';
import style from './style.css';

interface Props {
  backdropBlur?: true;
  cancellable?: true;
  onClose?: () => void;
  children?: React.ReactElement[];
  className?: string;
  style?: Record<string, string>;
  backdropStyle?: Record<string, string>;
}

export default function Dialog(props: Props) {

  const handleClickOutside = props.cancellable ? props.onClose : null;

  const backdropCss = [style.backdrop, props.backdropBlur ? style.backdropBlur : null].filter(e => e).join(' ');
  const dialogCss = [style.dialog, props.className || null].filter(e => e).join(' ');

  return (
    <>
      <div className={backdropCss} onClick={handleClickOutside} style={props.backdropStyle || {}} />
      <dialog open className={dialogCss} style={props.style || {}}>
        {
          props.children ? props.children : null
        }
      </dialog>
    </>
  )
}