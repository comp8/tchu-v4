import React, { useLayoutEffect, useRef } from 'react';

import style from './StyledButton.css';

interface Props {
  children?: React.ReactElement;
  className?: string;
  onClick?: () => void;
  disabled?: true;
  foreColor: string;
  backColor: string;
  borderColor: string;
  hoverEffect?: 'invert' | 'normal' | 'zoom' | 'pulse';
  style?: Record<string, string>;
}
export default function StyledButton(props: Props) {

  const ref = useRef<HTMLDivElement>();
  const { backColor, foreColor, borderColor } = props;
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--fore-color', foreColor);
      ref.current.style.setProperty('--back-color', backColor);
      ref.current.style.setProperty('--border-color', borderColor);
      for (const key in props.style) {
        ref.current.style.setProperty(key, props.style[key]);
      }
    }
  }, [ref.current, backColor, foreColor, borderColor, props.style]);

  const handleClick: React.MouseEventHandler = evt => {
    evt.preventDefault();
    if (!props.disabled) {
      props.onClick?.();
    }
  };

  const hoverEffect =
    props.hoverEffect === 'invert' ? style.hoverInvert :
      props.hoverEffect === 'normal' ? style.hoverNormal :
        props.hoverEffect === 'pulse' ? style.hoverPulse :
          props.hoverEffect === 'zoom' ? style.hoverZoom : '';

  return (
    <div
      className={`${style.wrapper} ${hoverEffect} ${props.className || ''} ${props.disabled ? 'disabled' : ''}`}
      ref={ref}
      onClick={handleClick}>
      <div className={style.inner}>
        {
          props.children
        }
      </div>
    </div>
  );
}