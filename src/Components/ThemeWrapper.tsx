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
  fontSize?: number;
  children: React.ReactElement;
}
export default function ThemeWrapper(props: Props) {

  const [theme, setTheme] = useTheme();

  document.documentElement.style.setProperty('font-size', `${props.fontSize || Config.style.defaultRootFontSize}px`);

  return (
    <div className={props.className}>{props.children}</div>
  );
}