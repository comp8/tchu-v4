import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';

import style from './style.css';

interface Theme {
  '--color-border': string;
  '--color-back': string;
  '--color-shadow': string;
  '--shadow-height': string;
  '--border-width': string;
  '--border-radius': string,
}

const defaultTheme: Theme = {
  '--color-border': '#9c27b0',
  '--color-back': '#ffeb3b',
  '--color-shadow': 'black',
  '--shadow-height': '0.3em',
  '--border-width': '0.2em',
  '--border-radius': 'auto',
};

function useCSSSelector(hoverState: boolean, pressState: boolean, effectOff: boolean) {
  const [cssNames, setCSSNames] = useState<string[]>([]);

  useLayoutEffect(() => {
    const list = [style.outer];
    if (!effectOff) {
      hoverState && list.push(style.hovering);
      pressState && list.push(style.pressing);
    }
    setCSSNames(list);
  }, [hoverState, pressState, effectOff]);

  return cssNames;
}

interface Props {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  Link?: { to: string; } & NavigateOptions;
  disabled?: boolean;
  style?: Record<string, string>;
  theme?: {
    backColor: string;
    borderColor?: string;
    borderWidth?: string;
    borderRadius?: string;
    shadowColor?: string;
  };
  effectOff?: true;
  inline?: true;
}

export default function StyledButton(props: Props) {

  const title = props.title || (typeof props.children === 'string' ? props.children : null);
  const additionalStyle: Record<string, string> = props.style || {};

  const theme: Record<string, string> = { ...defaultTheme };
  if (props.theme) {
    const { theme: o } = props;
    theme['--border-width'] = o.borderWidth || defaultTheme['--border-width'];
    theme['--color-back'] = o.backColor;
    theme['--color-border'] = o.borderColor || defaultTheme['--color-border'];
    theme['--color-shadow'] = o.shadowColor || defaultTheme['--color-shadow'];
    theme['--shadow-height'] = o.shadowColor ? defaultTheme['--shadow-height'] : '0';
    theme['--border-radius'] = o.borderRadius || defaultTheme['--border-radius'];
  }
  if (props.inline) {
    additionalStyle['display'] = 'inline-flex';
  }

  const [hoverState, setHoverState] = useState<boolean>(false);
  const [pressState, setPressState] = useState<boolean>(false);

  const navigate = useNavigate();

  const events = {
    onMouseEnter: (evt: React.MouseEvent) => {
      if (props.disabled === true) {
        evt.preventDefault();
        return;
      }
      setHoverState(true);
    },
    onMouseLeave: (evt: React.MouseEvent) => {
      setHoverState(false);
    },
    onMouseDown: (evt: React.MouseEvent) => {
      if (props.disabled === true) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }
      setPressState(true);
    },
    onMouseUp: (evt: React.MouseEvent) => {
      if (!pressState) {
        evt.preventDefault();
        evt.stopPropagation();
      }
      setPressState(false);
    },
    onClick: (evt: React.MouseEvent) => {
      evt.preventDefault();
      evt.stopPropagation();

      if (props.disabled || evt.nativeEvent.button !== 0) return;

      if (props.onClick) {
        props.onClick();
      }
      else if (props.Link) {
        const { to, ...options } = props.Link;
        navigate(to, options);
      }
      else if (process.env.NODE_ENV === 'development') {
        console.log(title, 'clicked');
      }
    },
  };

  useEffect(() => {
    const listener = (evt: MouseEvent) => {
      setHoverState(false);
      setPressState(false);
    };
    window.addEventListener('mouseup', listener);
    return () => window.removeEventListener('mouseup', listener);
  }, []);

  const cssList = useCSSSelector(hoverState, pressState, props.effectOff);

  return (
    <button
      style={{ ...additionalStyle, ...theme }}
      className={[props.className, ...cssList].join(' ').trim()}
      role="button"
      title={title}
      {...events}
    >
      <span className={style.inner}>
        <span className={style.wrapper}>
          {
            props.children || null
          }
        </span>
      </span>
    </button>
  );
};