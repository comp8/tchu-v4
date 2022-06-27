import { createContext } from "react";
import { BadgeSets } from "../TwitchApi";

const BadgeContext = createContext<BadgeSets>({});

export default BadgeContext;