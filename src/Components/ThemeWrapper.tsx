import React, { useLayoutEffect, useState } from "react";
import Config from "../config";

const defaultTheme = { ...Config.style.defaultTheme };

function useTheme() {
  const [theme, setTheme] = useState<Record<string, string>>(defaultTheme);

  useLayoutEffect(() => {
    for (const key in theme) {
      document.documentElement.style.setProperty(`--global-${key}`, theme[key]);
    }
  }, [theme]);

  return [theme, setTheme];
}

interface Props {
  className?: string;
  rootFontSize?: number;
  children?: React.ReactElement;
}
export default function ThemeWrapper(props: Props) {

  // TODO:
  const [theme, setTheme] = useTheme();

  document.documentElement.style.setProperty('font-size', `${props.rootFontSize || Config.style.defaultRootFontSize}px`);

  return (
    <div className={props.className}>{props.children || null}</div>
  );
}